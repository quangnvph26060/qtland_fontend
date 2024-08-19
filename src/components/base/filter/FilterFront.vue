<template>
  <a-popover placement="bottomLeft" trigger="click" class="flex">
    <template #title>
      <div>Chọn mặt tiền</div>
    </template>
    <template #content>
      <div class="flex mt-3 w-[300px]">
        <a-input-number
          :formatter="
            (value) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0
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
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0
          "
          v-model:value="price[1]"
          :min="0"
          :max="100"
          :step="100"
          class="w-80 col-5"
        />
      </div>
      <div>
        <a-slider v-model:value="price" range :min="0" :max="100" :step="10">
        </a-slider>
      </div>
      <div class="filter-list">
        <a-button class="filter-list-item" v-for="item in filterList">
          <div class="w-100" @click="setFront(item.min, item.max)">
            {{
              item.min < 100
                ? item.max !== null
                  ? item.max < 100
                    ? `${item.min}`
                    : `${item.min} m`
                  : ` Trên ${item.min} m `
                : item.max !== null
                ? item.max < 100
                  ? `${item.min / 100} m`
                  : `${item.min / 100} m`
                : ` Trên ${item.min / 100} m`
            }}
            {{
              item.max !== null
                ? ` - ${
                    item.max < 100
                      ? `${item.max} m`
                      : `${item.max / 100} m`
                  }`
                : ""
            }}
          </div>
        </a-button>
      </div>
      <a-divider />
      <div class="flex justify-between">
        <a-button @click="setFront(0, 100)">Đặt lại</a-button>
        <a-button type="primary"
          ><div @click="setFront(price[0], price[1])">Tìm kiếm</div></a-button
        >
      </div>
    </template>
    <div class="filter-item-content" @click="setModalPriceRangeVisible(true)">
      <div class="flex justify-between">
        <div>Mặt tiền</div>
        <div class="mr-2 flex align-items-center" v-if="props.type === 'user'">
          <DownOutlined />
        </div>
      </div>

      <div
        class="list-search-selected w-100 flex mt-2"
        v-if="props.type === 'user'"
      >
        <!-- <div v-text="computedRangePrice"></div> -->
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
  return `${value}-m` ;
};

const rangePrice = (min, max) => {
  return (
    "do-rong-tu-" + calculateRangePrice(min) + "-den-" + calculateRangePrice(max)
  );
};

const setFront = (min, max) => {
  filterRangeStore.setFrontRange(min, max);
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
  { min: 10, max: 20 },
  { min: 20, max: null },
];

watch(
  price,
  (newPrice, oldPrice) => {
    filterRangeStore.setFrontRange(newPrice[0], newPrice[1]);
  },
  { deep: true }
);

const computedRangePrice = computed(() => {
  const { getMinFront, getMaxFront } = filterRangeStore;
  const minFront = getMinFront;
  const maxFront = getMaxFront;
  const isMinFrontZero = minFront === 0;
  const isMaxFrontMax = maxFront === 100;

  if (isMinFrontZero && isMaxFrontMax) {
    return "";
  }

  const formatPrice = (price) => {
    return  `${price} m` ;
  };

  if (price.value[0] < 100 && price.value[1] < 100) {
    return `${price.value[0]}-${price.value[1]} m`;
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
