<template>
  <div id="mobi">
    <a-modal
      v-model:visible="modalAddressVisible"
      title="Chọn khu vực"
      width="100%"
      :footer="null"
      style="margin-top:50%"
    >
      <SelectorAddress
        class="mt-3"
        @update:selectedProvince="updateSelected('province', $event)"
        @update:selectedDistrict="updateSelected('district', $event)"
        @update:selectedWard="updateSelected('ward', $event)"
        :onResetFilter="resetFilter"
      />
      <a-divider />
      <div class="w-full flex justify-between">
        <a-button type="default" @click="resetFilter = true">Đặt lại</a-button>
        <a-button type="primary" @click="onSubmit">Tìm kiếm</a-button>
      </div>
    </a-modal>

    <div class="filter-item-content" @click="setModalAddressVisible(true)">
      <div :class="['flex text-black justify-between', { 'highlighted': computedAddress === '' }]" >
        <div>Khu vực</div>
        <div class="mr-2 flex align-items-center" v-if="props.type === 'user'">
          <DownOutlined />
        </div>
      </div>

      <div class="list-search-selected w-100 text-black flex mt-2" v-if="props.type === 'user'">
        <div v-text="computedAddress"></div>
      </div>
    </div>
  </div>

  <div id="lap">
    <a-popover placement="bottomLeft" trigger="click" class="flex" @click="setModalAddressVisible(false)">
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
          <a-button type="default" @click="resetFilter = true">Đặt lại</a-button>
          <a-button type="primary" @click="onSubmit">Tìm kiếm</a-button>
        </div>
      </template>
      <div class="filter-item-content" @click="setModalAddressVisible(false)">
        <div :class="['flex text-black justify-between', { 'highlighted': computedAddress === '' }]" >
          <div>Khu vực</div>
          <div class="mr-2 flex align-items-center" v-if="props.type === 'user'">
            <DownOutlined />
          </div>
        </div>
        <div class="list-search-selected w-100 text-black flex mt-2" v-if="props.type === 'user'">
          <div v-text="computedAddress"></div>
        </div>
      </div>
    </a-popover>
  </div>
</template>



<script setup>
import { ref, computed, watch } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { filterRange } from "../../../stores/filterRange";
import { useRouter } from "vue-router";

const router = useRouter();

// Props
const props = defineProps({
  type: {
    type: String,
    default: "user",
  },
});

// Modal visibility control
const modalAddressVisible = ref(false);
const setModalAddressVisible = (open) => {
  modalAddressVisible.value = open;
  if (open) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
};

// Address selection states
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);
const resetFilter = ref(false);

// Vuex store for address filter
const filterRangeStore = filterRange();

// Update selected values for province, district, ward
const updateSelected = (type, value) => {
  selectedProvince.value = type === "province" ? value : selectedProvince.value;
  selectedDistrict.value = type === "district" ? value : selectedDistrict.value;
  selectedWard.value = type === "ward" ? value : selectedWard.value;
};

// Computed property for the full address
const computedAddress = computed(() => {
  // Combine address values
  const address =
    selectedWard.value !== null && selectedWard.value !== undefined
      ? `${selectedWard.value}, ${selectedDistrict.value}, ${selectedProvince.value}`
      : selectedDistrict.value !== null && selectedDistrict.value !== undefined
      ? `${selectedDistrict.value}, ${selectedProvince.value}`
      : selectedProvince.value !== null && selectedProvince.value !== undefined
      ? `${selectedProvince.value}`
      : "";

  // Set address in store
  filterRangeStore.setAddress(address);

  // Return only the last part of the address for display
  return address;
});

// Watch for changes in computedAddress
watch(
  computedAddress,
  (newAddress) => {
    filterRangeStore.setAddress(newAddress);
  },
  { deep: true }
);

// Watch for reset action
// watch(
//   () => resetFilter.value,
//   (newVal) => {
//     if (newVal) {
//       selectedProvince.value = null;
//       selectedDistrict.value = null;
//       selectedWard.value = null;s
//       filterRangeStore.setAddress("");
//       onSubmit();
//     }
//   }
// );

watch(
  () => resetFilter.value,
  (newVal) => {
    if (newVal) {
      selectedProvince.value = null;
      selectedDistrict.value = null;
      selectedWard.value = null;
      filterRangeStore.setAddress("");
      onSubmit();
      
      // Đặt lại resetFilter về false sau khi reset xong
      setTimeout(() => {
        resetFilter.value = false;
      }, 0);
    }
  }
);

// Submit filter results
const onSubmit = () => {
  const strAddress =
    selectedWard.value !== null && selectedWard.value !== undefined
      ? `${selectedWard.value}, ${selectedDistrict.value}, ${selectedProvince.value}`
      : selectedDistrict.value !== null && selectedDistrict.value !== undefined
      ? `${selectedDistrict.value}, ${selectedProvince.value}`
      : selectedProvince.value !== null && selectedProvince.value !== undefined
      ? `${selectedProvince.value}`
      : "";

  filterRangeStore.setAddress(strAddress);

  // Redirect to appropriate route with address in query
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

    modalAddressVisible.value = false;
    document.body.classList.remove('no-scroll');
};
</script>

<script>
import SelectorAddress from "../selector/SelectorAddress.vue";
export default {};
</script>

<style scoped>
.filter-item-content {
  cursor: pointer;
}
/* Ẩn các phần tử theo kích thước màn hình */
#mobi {
  display: none; /* Ẩn mặc định trên màn hình lớn */
}

#lap {
  display: block; /* Hiện mặc định trên màn hình lớn */
}

/* Hiện phần tử cho màn hình di động */
@media (max-width: 768px) {
  #mobi {
    display: block; /* Hiện cho màn hình di động */
  }

  #lap {
    display: none; /* Ẩn cho màn hình di động */
  }
}
.highlighted {
 
  margin-top: 15px;
}

.no-scroll {
  overflow: hidden;
}

</style>
