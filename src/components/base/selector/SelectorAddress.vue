<template lang="">
    <div class="flex flex-col">
        <a-select
            class="w-100"
            placeholder="Tỉnh/Thành"
            v-model:value="selectedProvince"
            show-search
            allowClear
            :options="provinces"
            :filter-option="filterOption"
            @change="handleChange(selectedProvince, 10)"
        >
        </a-select>
        <a-select
            class="w-100 mt-3"
            placeholder="Quận/Huyện"
            v-model:value="selectedDistrict"
            show-search
            allowClear
            :options="districts"
            :filter-option="filterOption"
            @change="handleChange(selectedDistrict, 100)"
        >
        </a-select>
        <a-select
            class="w-100   mt-3"
            placeholder="Phường/Xã"
            v-model:value="selectedWard"
            show-search
            allowClear
            :options="wards"
            :filter-option="filterOption"
        >
        </a-select>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import addressAPI from "../../../api/address.js";

const props = defineProps({
    address: {
        type: String,
        default: null,
    },
    onResetFilter: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits([
    "update:selectedProvince",
    "update:selectedDistrict",
    "update:selectedWard",
]);

// Define refs for data and selected values
const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);

// Fetch provinces data on component mount
onMounted(async () => {
    if (!addressAPI) {
        console.error(
            "addressAPI prop is required and must be an object with fetching methods"
        );
        return;
    }
    if (provinces.value.length === 0) {
        const response = await addressAPI.getProvinces();
        provinces.value = response.map((province) => ({
            value: province.province_id,
            label: province.province_name,
        }));
    }
});

const setDistrict = async () => {
    if (selectedProvince.value !== null && selectedProvince.value !== "") {
        const response = await addressAPI.getDistrictsByProvinceId(
            selectedProvince.value
        );
        districts.value = response.map((district) => ({
            value: district.district_id,
            label: district.district_name,
        }));
    }
};

const setWard = async () => {
    if (selectedDistrict.value !== null && selectedDistrict.value !== "") {
        const response = await addressAPI.getWardsByDistrictId(
            selectedDistrict.value
        );
        wards.value = response.map((ward) => ({
            value: ward.ward_id,
            label: ward.ward_name,
        }));
    }
};

watch(
    () => props.onResetFilter,
    (newValue) => {
        if (newValue) {
            selectedProvince.value = null;
            selectedDistrict.value = null;
            selectedWard.value = null;

            districts.value = [];
            wards.value = [];
        }
    }
);

watch(
    () => props.address,
    async (newValue) => {
        if (newValue !== null && newValue !== "") {
            const address = newValue.split(",");
            if (provinces.value.length === 0) {
                const response = await addressAPI.getProvinces();
                provinces.value = response.map((province) => ({
                    value: province.province_id,
                    label: province.province_name,
                }));
            }
            if (address.length === 3) {
                selectedProvince.value = findIdByName(
                    provinces.value,
                    address[2].trim()
                );
                await setDistrict();
                selectedDistrict.value = findIdByName(
                    districts.value,
                    address[1].trim()
                );
                await setWard();
                selectedWard.value = findIdByName(
                    wards.value,
                    address[0].trim()
                );
            } else if (address.length === 2) {
                selectedProvince.value = findIdByName(
                    provinces.value,
                    address[1].trim()
                );
                await setDistrict();
                selectedDistrict.value = findIdByName(
                    districts.value,
                    address[0].trim()
                );
            }
        }
    }
);

// Fetch districts data when province changes
watch(selectedProvince, async (newValue, oldValue) => {
    if (!newValue || newValue === null) return;

    emits(
        "update:selectedProvince",
        findOptionByValue(provinces.value, newValue)?.label
    );
    selectedProvince.value = newValue;
    await setDistrict();
});

// Fetch wards data when district changes
watch(selectedDistrict, async (newValue, oldValue) => {
    if (!newValue) return;
    if (newValue === null) {
        // selectedWard.value = null;
        return;
    }

    selectedDistrict.value = newValue;
    emits(
        "update:selectedDistrict",
        findOptionByValue(districts.value, newValue)?.label
    );

    await setWard();
});

watch(selectedWard, (newValue, oldValue) => {
    if (!newValue) return;
    if (newValue === null) {
        return;
    }
    selectedWard.value = newValue;
    emits(
        "update:selectedWard",
        findOptionByValue(wards.value, newValue)?.label
    );
});

const handleChange = (value, number) => {
    if (number === 10) {
        selectedProvince.value = value;
        selectedDistrict.value = null;
        selectedWard.value = null;
        districts.value = [];
        wards.value = [];
        emits(
            "update:selectedProvince",
            findOptionByValue(provinces.value, value)?.label
        );
    } else if (number === 100) {
        selectedDistrict.value = value;
        selectedWard.value = null;
        wards.value = [];
        emits(
            "update:selectedDistrict",
            findOptionByValue(districts.value, value)?.label
        );
    }
};

// Tìm kiếm option theo input
const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// Map option value to option label
const findOptionByValue = (options, value) => {
    return options.find((option) => option.value === value);
};

// Find id of province, district, ward by name
const findIdByName = (options, name) => {
    return options.find((option) => option.label === name)?.value;
};
</script>
<style lang="">
</style>