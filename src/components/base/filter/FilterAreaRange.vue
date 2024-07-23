<template>
    <a-popover placement="bottomLeft" trigger="click" class="flex">
        <template #title>
                <div>Chọn khu vực</div>
</template>

<template #content>
    <div class="flex mt-3 w-[300px]">
        <a-input-number v-model:value="area[0]" :step="5" :formatter="
                            (value) =>
                                value
                                    ? `${value}`.replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          ','
                                      )
                                    : 0
                        " :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" class="w-80 col-5" />
        <div class="col-2 flex align-items-center justify-center">
            <ArrowRightOutlined />
        </div>
        <a-input-number v-model:value="area[1]" :min="min" :max="max" :step="5" :formatter="
                            (value) =>
                                value
                                    ? `${value}`.replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          ','
                                      )
                                    : 0
                        " :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" class="w-80 col-5" />
    </div>
    <div>
        <a-slider range :min="0" :max="1000" :step="5" v-model:value="area">
        </a-slider>
    </div>
    <div class="filter-list">
        <a-button class="filter-list-item" v-for="item in filterList">
            <div class="w-100" @click="setArea(item.min, item.max)">
                {{ item.min }} - {{ item.max }} m&sup2
            </div>
        </a-button>
    </div>
    <a-divider />
    <div class="flex justify-between">
        <a-button @click="setArea(0, 1000)">Đặt lại</a-button>
        <a-button type="primary">
            <div @click="setArea(area[0], area[1])">Tìm kiếm</div>
        </a-button>
    </div>
</template>
        <div class="filter-item-content">
            <div class="flex align-items-center text-black justify-between">
                <div>Diện tích</div>
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
                <div v-text="computedRangeArea"></div>
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

// Filter Area
const filterRangeStore = filterRange();
let [min, max] = filterRangeStore.getAreaRange;
const area = ref([min, max]);

const rangeArea = (min, max) => {
    return "dien-tich-tu-" + min + "m2-den-" + max + "m2";
};

const setArea = (min, max) => {
    filterRangeStore.setAreaRange(min, max);
    area.value[0] = min;
    area.value[1] = max;
    if (props.type === "admin") {
        router.push({
            name: "admin-post-list",
            query: {
                ...router.currentRoute.value.query,
                rangeArea: rangeArea(min, max),
            },
        });
    } else {
        router.push({
            name: "post-list",
            query: {
                ...router.currentRoute.value.query,
                rangeArea: rangeArea(min, max),
            },
        });
    }
};

const filterList = [
    { min: 0, max: 30 },
    { min: 30, max: 50 },
    { min: 50, max: 80 },
    { min: 80, max: 100 },
    { min: 100, max: 150 },
    { min: 150, max: 200 },
    { min: 200, max: 250 },
    { min: 250, max: 300 },
    { min: 300, max: 500 },
    { min: 500, max: 1000 },
];
watch(
    area,
    (newArea, oldArea) => {
        filterRangeStore.setAreaRange(newArea[0], newArea[1]);
    }, { deep: true }
);
const computedRangeArea = computed(() => {
    const { getMinArea, getMaxArea } = filterRangeStore;
    const minArea = getMinArea;
    const maxArea = getMaxArea;
    const isMinAreaZero = minArea === 0;
    const isMaxAreaMax = maxArea === 1000;

    if (isMinAreaZero && isMaxAreaMax) {
        return "";
    }

    const formatArea = (area) => `${area} m²`;

    if (isMinAreaZero) {
        return `Dưới ${formatArea(area.value[1])}`;
    }

    return `${area.value[0]} - ${formatArea(area.value[1])}`;
});
</script>

<script>
export default {};
</script>

<style>

</style>
