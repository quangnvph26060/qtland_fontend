<template>
  <a-modal
    v-model:visible="modalPriceRangeVisible" 
    title="Chọn mức giá"
    :footer="null"
  >
    <div class="flex mt-3 w-[300px]">
      <a-input-number
        :formatter="(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0"
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
        :formatter="(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0"
        v-model:value="price[1]"
        :min="0"
        :max="1000"
        :step="100"
        class="w-80 col-5"
      />
    </div>
    <div>
      <a-slider v-model:value="price" range :min="0" :max="1000" :step="100" />
    </div>
    <div class="filter-list">
     <a-button class="filter-list-item" v-for="item in filterList" :key="item.min">
  <div class="w-100" @click="() => { setPrice(item.min, item.max); setModalPriceRangeVisible(false); }">
    {{
      item.min < 1000
        ? item.max !== null
          ? item.max < 1000
            ? `${item.min}`
            : `${item.min} triệu`
          : ` Trên ${item.min} triệu `
        : item.max !== null
        ? item.max < 1000
          ? `${item.min / 1000} triệu`
          : `${item.min / 1000} triệu`
        : ` Trên ${item.min / 1000} triệu`
    }}
    {{
      item.max !== null
        ? ` - ${
            item.max < 1000
              ? `${item.max} triệu`
              : `${item.max / 1000} triệu`
          }`
        : ""
    }}
  </div>
</a-button>

    </div>
    <a-divider />
    <div class="flex justify-between">
      <a-button @click="() => { setPrice(0, 1000); setModalPriceRangeVisible(false); }">
        Đặt lại
      </a-button>
      <a-button type="primary" @click="() => { setPrice(price[0], price[1]); setModalPriceRangeVisible(false); }">
        Tìm kiếm
      </a-button>
    </div>
  </a-modal>

  <div class="filter-item-content" @click="modalPriceRangeVisible = true">
    <div class="flex justify-between">
      <div>Mức giá</div>
      <div class="mr-2 flex align-items-center" v-if="props.type === 'user'">
        <DownOutlined />
      </div>
    </div>

    <div class="list-search-selected w-100 flex mt-2" v-if="props.type === 'user'">
      <div v-text="computedRangePrice"></div>
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
    "gia-tu-" + calculateRangePrice(min) + "-den-" + calculateRangePrice(max)
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
  { min: 0, max: 5 },
  { min: 5, max: 8 },
  { min: 8, max: 10 },
  { min: 10, max: 30 },
  { min: 30, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: null },
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
  const isMaxPriceMax = maxPrice === 1000;  // Sử dụng giá trị tối đa nếu có

  if (isMinPriceZero && isMaxPriceMax) {
    return "";
  }

  const formatPrice = (price) => {
    return price < 1000 ? `${price} triệu` : `${price / 1000} tỷ`;
  };

  // Trường hợp min = 100 và max = null
  if (isMinPriceZero && maxPrice !== null) {
    return `Dưới ${formatPrice(maxPrice)}`;
  }

  if (maxPrice === null) {
    return `Trên ${formatPrice(minPrice)}`;
  }

  if (minPrice < 1000 && maxPrice < 1000) {
    return `${minPrice}-${maxPrice} triệu`;
  }

  // if (isMinPriceZero) {
  //   return "";
  // }

  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
});

</script>

<script>
export default {};
</script>
<style>
.ant-modal-content{
    max-width: 400px !important;
}
</style>
