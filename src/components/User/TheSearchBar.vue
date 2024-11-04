<template>
  <!-- begin::Search Bar -->
  <div class="h-[64px]" id="user_sliderbar">
    <!-- begin::Search Bar Container-->
    <div
      class="app-container fixed-top min-h-[50px] mt-[100px] bg-primary-white-color w-100"
    >
      <!-- begin::Search Bar Wrapper -->
      <div
        class="flex flex-wrap align-items-center border-t-[1px] ml-auto mr-auto w-[100%]"
      >
        <!-- begin::Search Bar Item Wrapper -->
        <div
          class="search-box col-12 col-md-8 col-xl-3 xl:pe-3 search-address-post"
        >
          <a-input-search
            v-model:value="value"
            placeholder="Đường Nguyễn Thị Minh Khai"
            class="w-100 custom-input mb-2"
            enterButton
            @search="onSearch"
            :style="{ height: '40px' }"
          />
        </div>
        <!-- end::Search Bar Item Wrapper -->

        <!-- begin::Filter Item Wrapper -->
        <div class="flex align-items-center col-12 h-14 col-xl-9 overflow-auto" style=" overflow-y: hidden !important;">
          <!-- begin::Filter Item -->
          <div class="filter-item col-4 col-xl-2">
            <FilterAddress />
          </div>
          <!-- end::Filter Item -->

          <!-- begin::Filter Item -->
          <div class="filter-item col-4 col-sm-3 col-xl-2">
            <FilterPriceRange />
          </div>
          <!-- end::Filter Item -->

          <!-- begin::Filter Item -->
          <div class="filter-item col-4 col-sm-3 col-xl-2">
            <FilterAreaRange />
          </div>
          <!-- end::Filter Item -->

          <!-- begin::Filter Item -->
          <div class="filter-item col-4 col-sm-3 col-xl-2">
            <FilterOptions />
          </div>
          <!-- <div
            class="filter-item col-4 col-sm-3 col-xl-2"
           
            v-if="store.user.role_id == 3 || store.user.role_id == 4"
          >
            <FilterRank />
          </div> -->
          <!-- <div
            class="filter-item col-4 col-sm-3 col-xl-2" 
            v-if="store.user.role_id == 3 || store.user.role_id == 4"
          >
            <FilterFront />
          </div> -->
          <!-- end::Filter Item -->

          <!-- begin::Filter Item -->
          <div class="filter-item col-sm-2">
            <a-tooltip placement="bottom">
              <!-- <template #title>
                <span>Đặt lại</span>
              </template> -->
              <div
                class="filter-item-content align-items-center"
                @click="handResetFilter"
              >
                <ReloadOutlined class="" />
              </div>
            </a-tooltip>
          </div>
          <!-- end::Filter Item -->
        </div>
        <!-- end::Filter Item Wrapper-->
      </div>
      <!-- end::Search Bar Wrapper -->
    </div>
    <!-- end::Search Bar Container-->
  </div>
  <!-- end::Search bar -->
</template>

<script setup>
import { ref } from "vue";
import { ReloadOutlined } from "@ant-design/icons-vue";
import filterRange from "../../stores/filterRange";
import router from "../../router";

const value = ref("");
const filterRangeStore = filterRange();

const onSearch = (searchValue) => {
  filterRangeStore.setAddress(searchValue);
  router.push({
    name: "post-list",
    query: {
      ...router.currentRoute.value.query,
      address: searchValue,
    },
  });
};

const handResetFilter = () => {
  filterRangeStore.resetFilters();
  router.push({ name: "home" });
};
</script>

<script>
import axios from "axios";
import FilterAddress from "../base/filter/FilterAddress.vue";
import FilterPriceRange from "../base/filter/FilterPriceRange.vue";
import FilterAreaRange from "../base/filter/FilterAreaRange.vue";
import FilterOptions from "../base/filter/FilterOptions.vue";
import FilterRank from "../base/filter/FilterRank.vue";
import FilterFront from "../base/filter/FilterFront.vue";
import auth from "../../stores/auth";
const store = auth();
export default {
  components: {
    FilterAddress,
    FilterPriceRange,
    FilterAreaRange,
    FilterOptions,
    FilterRank,
  },

  created() {},

  beforeMount() {
    //Có thể truy cập data, event, method ở đây
    //Chưa có DOM
    //Chỉ chạy 1 lần
  },
  mounted() {},
  beforeUpdate() {
    //thay đổi style -> update dữ liệu -> render lại DOM
    //*Nên dùng để update dữ liệu vào DOM */
  },
  updated() {
    //update dữ liệu -> thay đổi state -> render lại DOM
    //Cũng có thể dùng để update dữ liệu vào DOM
  },
  beforeUnmount() {
    //Chưa bị hủy
  },
  unmounted() {
    //Đã bị hủy, không thể truy cập data, event, method ở đây
    //Ít khi dùng
  },

  methods: {},
};
</script>

<style scoped>
.ant-input-search {
  height: 40px !important;
}

.custom-input >>> .ant-input,
.custom-input >>> .ant-input-search-button {
  height: 40px !important;
}
</style>
