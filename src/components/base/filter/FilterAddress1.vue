<template>
	<!-- begin::Filter Item Content -->
	<a-popover placement="bottomLeft" trigger="click" class="flex">
		<template #title>
			<div>Chọn khu vực</div>
		</template>
		<template #content>
			<SelectorAddress
				class="mt-3"
				@update:selectedProvince="updateSelected('province', $event)"
				@update:selectedDistrict="updateSelected('district', $event)"
				@update:selectedWard="updateSelected('ward', $event)"
				:onResetFilter="resetFilter"
			/>
			<a-divider />
			<div class="w-[250px] flex justify-between">
				<a-button type="default" @click="resetFilter = true"
					>Đặt lại</a-button
				>

				<a-button type="primary" @click="onSubmit">Tìm kiếm</a-button>
			</div>
		</template>
		<div class="filter-item-content" @click="setModalAddressVisible(true)">
			<div class="flex text-black justify-between">
				<div>Khu vực 123</div>
				<div
					class="mr-2 flex align-items-center"
					v-if="props.type === 'user'"
				>
					<DownOutlined />
				</div>
			</div>

			<div
				class="list-search-selected w-100 text-black flex mt-2"
				v-if="props.type === 'user'"
			>
				<div v-text="computedAddress"></div>
			</div>
		</div>
	</a-popover>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { filterRange } from "../../../stores/filterRange";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
	type: {
		type: String,
		default: "user",
	},
});
const modalAddressVisible = ref(false);
const setModalAddressVisible = (open) => {
	modalAddressVisible.value = open;
};

const filterRangeStore = filterRange();

const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);
const resetFilter = ref(false);

const updateSelected = (type, value) => {
	selectedProvince.value =
		type === "province" ? value : selectedProvince.value;
	selectedDistrict.value =
		type === "district" ? value : selectedDistrict.value;
	selectedWard.value = type === "ward" ? value : selectedWard.value;
};

const computedAddress = computed(() => {
	filterRangeStore.setAddress(
		selectedWard.value !== null && selectedWard.value !== undefined
			? `${selectedWard.value}, ${selectedDistrict.value}, ${selectedProvince.value}`
			: selectedDistrict.value !== null &&
				  selectedDistrict.value !== undefined
				? `${selectedDistrict.value}, ${selectedProvince.value}`
				: selectedProvince.value !== null &&
					  selectedProvince.value !== undefined
					? `${selectedProvince.value}`
					: ""
	);

	const strAddress =
		selectedWard.value !== null
			? selectedWard.value
			: selectedDistrict.value !== null
				? selectedDistrict.value
				: selectedProvince.value !== null
					? selectedProvince.value
					: "";

	return strAddress;
});

watch(
	computedAddress,
	(newAddress, oldAddress) => {
		filterRangeStore.setAddress(newAddress);
	},
	{ deep: true }
);
watch(
	() => resetFilter.value,
	(newVal) => {
		if (newVal) {
			selectedProvince.value = null;
			selectedDistrict.value = null;
			selectedWard.value = null;
			filterRangeStore.setAddress("");
			onSubmit();
		}
	}
);

const onSubmit = () => {
	const strAddress =
		selectedWard.value !== null && selectedWard.value !== undefined
			? `${selectedWard.value}, ${selectedDistrict.value}, ${selectedProvince.value}`
			: selectedDistrict.value !== null &&
				  selectedDistrict.value !== undefined
				? `${selectedDistrict.value}, ${selectedProvince.value}`
				: selectedProvince.value !== null &&
					  selectedProvince.value !== undefined
					? `${selectedProvince.value}`
					: "";

	filterRangeStore.setAddress(strAddress);

	if (props.type === "admin") {
		router.push({
			name: "admin-post-list",
			query: {
				...router.currentRoute.value.query,
				address: strAddress,
			},
		});
	} else {
		router.push({
			name: "post-list",
			query: {
				...router.currentRoute.value.query,
				address: strAddress,
			},
		});
	}
};
</script>

<script>
import SelectorAddress from "../selector/SelectorAddress.vue";
export default {};
</script>
<style></style>
