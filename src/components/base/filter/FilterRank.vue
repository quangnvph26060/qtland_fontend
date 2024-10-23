<template>
  <a-popover placement="bottomLeft" trigger="click" class="flex">
    <template #title>
      <div>Chọn hạng văn phòng</div>
    </template>
    <template #content>
      <div class="flex flex-col w-[300px]">
        <div class="flex flex-col">
          <a-button
            v-for="item in priorityrank.filter(
              (item) =>
                store.user.role_id == 4 ||
                (store.user.role_id == 3 &&
                  (item.value === 3 || item.value === 4))
            )"
            :key="item.value"
            :class="{ selected: selectedPriority === item.value }"
            @click="selectClassRank(item.value)"
            type="text"
            class="w-full text-left"
          >
            {{ item.name }}
          </a-button>
        </div>
        <a-divider style="margin: 5px 0px" />
        <div class="flex justify-between mt-2">
          <a-button @click="resetSelection">Đặt lại</a-button>
          <!-- <a-button type="primary" @click="applySelection">Áp dụng</a-button> -->
        </div>
      </div>
    </template>
    <div class="filter-item-content filterrank">
      <div
        class="flex justify-between filterrank"
        style="padding: 0px; padding-left: 5px"
      >
        <div>Văn phòng</div>
        <div class="mr-2 flex align-items-center">
          <span role="img" aria-label="down" class="anticon anticon-down"
            ><svg
              focusable="false"
              data-icon="down"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <path
                d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
              ></path></svg
            ><!----></span
          >
        </div>
      </div>
    </div>
  </a-popover>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { filterRange } from "../../../stores/filterRange";
import auth from "../../../stores/auth";
const store = auth();
// Dữ liệu các hạng văn phòng
const priorityrank = [
  { value: 1, name: "Văn phòng hạng A" },
  { value: 2, name: "Văn phòng hạng B" },
  { value: 3, name: "Văn phòng hạng C" },
  { value: 4, name: "Văn phòng hạng D" },
  { value: 5, name: "Mặt bằng kinh doanh" },
];

// Biến lưu trữ hạng văn phòng đã chọn
const selectedPriority = ref(null);

const router = useRouter();
const storeclass = filterRange();

// Hàm chọn hạng văn phòng và điều hướng
const selectClassRank = (classrank) => {
  storeclass.setClassRank(classrank);
  selectedPriority.value = classrank;
  router.push({
    name: "post-list",
    query: {
      ...router.currentRoute.value.query,
      classrank: classrank,
    },
  });
};

// Hàm đặt lại lựa chọn
const resetSelection = () => {
  storeclass.setClassRank(null);
  selectedPriority.value = null;
  router.push({
    name: "post-list",
  });
};

// Hàm áp dụng lựa chọn hiện tại
const applySelection = () => {
  if (selectedPriority.value !== null) {
    router.push({
      name: "post-list",
      query: {
        ...router.currentRoute.value.query,
        classrank: selectedPriority.value,
      },
    });
  }
};
</script>

<style scoped>
/* CSS cho component dropdown */
.filter-item-content {
  cursor: pointer;
}

.selected {
  background-color: #f0f0f0;
  font-weight: bold;
}
</style>
