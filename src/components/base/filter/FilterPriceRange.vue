<template>
    <a-popover placement="bottomLeft" trigger="click" class="flex">
        <template #title>
            <div>Chọn mức giá</div>
        </template>
        <template #content>
            <div class="flex mt-3 w-[300px]">
                <a-input-number
                    :formatter="
                        (value) =>
                            value
                                ? `${value}`.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ','
                                  )
                                : 0
                    "
                    v-model:value="price[0]"
                    :min="min"
                    :max="max"
                    :step="100"
                    class="w-80 col-5"
                />
                <div class="col-2 flex align-items-center justify-center">
                    <ArrowRightOutlined />
                </div>
                <a-input-number
                    :formatter="
                        (value) =>
                            value
                                ? `${value}`.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ','
                                  )
                                : 0
                    "
                    v-model:value="price[1]"
                    :min="0"
                    :max="60000"
                    :step="100"
                    class="w-80 col-5"
                />
            </div>
            <div>
                <a-slider
                    v-model:value="price"
                    range
                    :min="0"
                    :max="60000"
                    :step="100"
                >
                </a-slider>
            </div>
            <div class="filter-list">
                <a-button class="filter-list-item" v-for="item in filterList">
                    <div class="w-100" @click="setPrice(item.min, item.max)">
                        {{
                            item.min < 1000
                                ? item.max < 1000
                                    ? `${item.min}`
                                    : `${item.min} triệu`
                                : `${item.min / 1000}`
                        }}
                        -
                        {{
                            item.max < 1000
                                ? ` ${item.max} triệu`
                                : `${item.max / 1000} tỷ`
                        }}
                    </div>
                </a-button>
            </div>
            <a-divider />
            <div class="flex justify-between">
                <a-button @click="setPrice(0, 60000)">Đặt lại</a-button>
                <a-button type="primary"
                    ><div @click="setPrice(price[0], price[1])">
                        Tìm kiếm
                    </div></a-button
                >
            </div>
        </template>
        <div
            class="filter-item-content"
            @click="setModalPriceRangeVisible(true)"
        >
            <div class="flex justify-between">
                <div>Mức giá</div>
                <div
                    class="mr-2 flex align-items-center"
                    v-if="props.type === 'user'"
                >
                    <DownOutlined />
                </div>
            </div>

            <div
                class="list-search-selected w-100 flex mt-2"
                v-if="props.type === 'user'"
            >
                <div v-text="computedRangePrice"></div>
            </div>
        </div>
    </a-popover>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { DownOutlined, ArrowRightOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { filterRange } from "../../../stores/filterRange";

const props = defineProps({
    type: {
        type: String,
        default: "user",
    },
});

const router = useRouter();

const modalPriceRangeVisible = ref(false);
const setModalPriceRangeVisible = (open) => {
    modalPriceRangeVisible.value = open;
};

// Filter Pirce
const filterRangeStore = filterRange();
var [min, max] = filterRangeStore.getPriceRange;

const price = ref([min, max]);

const calculateRangePrice = (value) => {
    return value < 1000 ? `${value}-trieu` : `${value / 1000}-ty`;
};

const rangePrice = (min, max) => {
    return (
        "gia-tu-" +
        calculateRangePrice(min) +
        "-den-" +
        calculateRangePrice(max)
    );
};

const setPrice = (min, max) => {
    filterRangeStore.setPriceRange(min, max);
    price.value[0] = min;
    price.value[1] = max;
    if (props.type === "admin") {
        router.push({
            name: "admin-post-list",
            query: {
                ...router.currentRoute.value.query,
                rangePrice: rangePrice(min, max),
            },
        });
    } else {
        router.push({
            name: "post-list",
            query: {
                ...router.currentRoute.value.query,
                rangePrice: rangePrice(min, max),
            },
        });
    }
};

const filterList = [
    { min: 0, max: 500 },
    { min: 500, max: 800 },
    { min: 800, max: 1000 },
    { min: 1000, max: 2000 },
    { min: 2000, max: 3000 },
    { min: 3000, max: 5000 },
    { min: 5000, max: 10000 },
];

watch(
    price,
    (newPrice, oldPrice) => {
        filterRangeStore.setPriceRange(newPrice[0], newPrice[1]);
    },
    { deep: true }
);

const computedRangePrice = computed(() => {
    const { getMinPrice, getMaxPrice } = filterRangeStore;
    const minPrice = getMinPrice;
    const maxPrice = getMaxPrice;
    const isMinPriceZero = minPrice === 0;
    const isMaxPriceMax = maxPrice === 60000;

    if (isMinPriceZero && isMaxPriceMax) {
        return "";
    }

    const formatPrice = (price) => {
        return price < 1000 ? `${price} triệu` : `${price / 1000} tỷ`;
    };

    if (price.value[0] < 1000 && price.value[1] < 1000) {
        return `${price.value[0]}-${price.value[1]} triệu`;
    }

    if (isMinPriceZero) {
        return `Dưới ${formatPrice(price.value[1])}`;
    }

    return `${formatPrice(price.value[0])} - ${formatPrice(price.value[1])}`;
});
</script>

<script>
export default {};
</script>
<style></style>
