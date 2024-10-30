<template>
  <div>
    <a-modal
      title="Chọn Diện Tích"
      v-model:visible="isModalVisible"
      @ok="handleOk"
      footer= ''
      @cancel="handleCancel"
    >
      <div class="flex mt-3 w-[300px]">
        <a-input-number
          v-model:value="area[0]"
          :step="5"
          :formatter="formatArea"
          :parser="parseArea"
          class="w-80 col-5"
        />
        <div class="col-2 flex align-items-center justify-center">
          <ArrowRightOutlined />
        </div>
        <a-input-number
          v-model:value="area[1]"
          :min="min"
          :max="max"
          :step="5"
          :formatter="formatArea"
          :parser="parseArea"
          class="w-80 col-5"
        />
      </div>
      <div>
        <a-slider range :min="0" :max="1000" :step="5" v-model:value="area" />
      </div>
      <div class="filter-list">
        <a-button
          class="filter-list-item"
          v-for="item in filterList"
          :key="item.min"
          @click="setArea(item.min, item.max)"
        >
          <div class="w-100">
            <span v-if="item.max === null"> Trên {{ item.min }} m&sup2; </span>
            <span v-else> {{ item.min }} - {{ item.max }} m&sup2; </span>
          </div>
        </a-button>
      </div>
      <a-divider />
      <div class="flex justify-between">
        <a-button @click="resetArea">Đặt lại</a-button>
        <a-button type="primary" @click="searchArea">Tìm kiếm</a-button>
      </div>
    </a-modal>

    <div class="filter-item-content" @click="isModalVisible = true" style="margin-top: 18px">
      <div class="flex justify-between">
        <div>Diện tích</div>
        <div class="mr-2 flex align-items-center" v-if="props.type === 'user'">
          <DownOutlined />
        </div>
      </div>
      <div
        class="list-search-selected w-100 flex mt-2"
        v-if="props.type === 'user'"
      >
        <div v-text="computedRangeArea"></div>
      </div>
    </div>
  </div>
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
const isModalVisible = ref(false); // Biến để kiểm soát hiển thị modal

// Filter Area
const filterRangeStore = filterRange();
let [min, max] = filterRangeStore.getAreaRange;
const area = ref([min, max]);

const rangeArea = (min, max) => {
  return "dien-tich-tu-" + min + "m2-den-" + max + "m2";
};

const showModal = () => {
  isModalVisible.value = true; // Mở modal
};

const handleOk = () => {
  setArea(area[0], area[1]); // Xử lý khi nhấn OK
  isModalVisible.value = false; // Đóng modal
};

const handleCancel = () => {
  isModalVisible.value = false; // Đóng modal
};

const setArea = (min, max) => {
  filterRangeStore.setAreaRange(min, max);
  area.value[0] = min;
  area.value[1] = max;
  router.push({
    name: props.type === "admin" ? "admin-post-list" : "post-list",
    query: {
      ...router.currentRoute.value.query,
      rangeArea: rangeArea(min, max),
    },
  });
  isModalVisible.value = false;
};

// Hàm đặt lại giá trị và đóng modal
const resetArea = () => {
  setArea(0, 1000); // Đặt lại về khoảng giá trị mặc định
  isModalVisible.value = false; // Đóng modal
};

// Hàm tìm kiếm và đóng modal
const searchArea = () => {
  setArea(area.value[0], area.value[1]); // Thiết lập lại giá trị hiện tại
  isModalVisible.value = false; // Đóng modal
};

const filterList = [
  { min: 0, max: 30 },
  { min: 30, max: 50 },
  { min: 50, max: 80 },
  { min: 80, max: 100 },
  { min: 100, max: 150 },
  { min: 150, max: 200 },
  { min: 200, max: 500 },
  { min: 500, max: null },
];

watch(
  area,
  (newArea) => {
    filterRangeStore.setAreaRange(newArea[0], newArea[1]);
  },
  { deep: true }
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

  if (maxArea == 9007199254740991) {
    return `Trên ${formatArea(minArea)}`;
  }

  if (isMinAreaZero) {
    return `Dưới ${formatArea(maxArea)}`;
  }

  return `${formatArea(minArea)} - ${formatArea(maxArea)}`;
});

// Formatter and parser for input numbers
const formatArea = (value) =>
  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
const parseArea = (value) => value.replace(/\$\s?|(,*)/g, "");
</script>

<script>
export default {};
</script>

<style>
</style>
