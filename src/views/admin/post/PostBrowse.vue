<template>
  <div class="card border-x-0">
    <!-- begin::Card Header -->
    <div class="card-header flex flex-row-reverse justify-between mb-3 md:mb-0">
      <!-- begin::Card Toolbar -->
      <div class="card-toolbar flex justify-start md:justify-end"></div>
    </div>
    <div class="card-body">
      <!-- begin::Table -->
      <div>
        <div style="margin-bottom: 16px">
          <a-button
            type="primary"
            class="w-[120px]"
            :disabled="!hasSelected"
            :loading="state.loading"
            @click="start"
          >
            Xác nhận tin
          </a-button>      

           <a-button
            type="primary"
            class="w-[120px] mx-3"
            :disabled="!hasSelected"
            :loading="state.loadingkd"
            @click="end"
          >
            Không duyệt
          </a-button>

          <div style="padding-top: 15px">
            <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `Đã chọn ${state.selectedRowKeys.length} tin` }}
            </template>
          </span>
          </div>
          
        </div>
        <a-table
          :row-selection="{
            selectedRowKeys: state.selectedRowKeys,
            onChange: onSelectChange,
          }"
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1500 }"
          :pagination="pagination"
          id="duyettin"
        >
          <template
            #customFilterDropdown="{
              setSelectedKeys,
              selectedKeys,
              confirm,
              clearFilters,
              column,
            }"
          >
            <div style="padding: 8px">
              <a-input
                ref="searchInput"
                :placeholder="`Search ${column.dataIndex}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="
                  (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
                "
                @pressEnter="
                  handleSearch(selectedKeys, confirm, column.dataIndex)
                "
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
              >
                <template #icon><SearchOutlined /></template>
                Tìm
              </a-button>
              <a-button
                size="small"
                style="width: 90px"
                @click="handleReset(clearFilters)"
              >
                Đặt lại
              </a-button>
            </div>
          </template>
          <template #customFilterIcon="{ filtered }">
            <search-outlined
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
          </template>
          <template #bodyCell="{ text, column, record }">
            <template v-if="column.key === 'detail'">
              <div>
                <a-dropdown trigger="click">
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1">
                        <router-link
                          :to="{
                            name: 'admin-post-detail',
                            params: {
                              id: record.id,
                            },
                          }"
                        >
                        </router-link>
                        Sửa
                      </a-menu-item>
                      <a-menu-item key="2">
                        <div @click="showConfirmDelete(record.id)">Xoá</div>
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <a-button>
                    Chức năng
                    <DownOutlined />
                  </a-button>
                </a-dropdown>
              </div>
            </template>
            <template v-else-if="column.dataIndex === 'name'">
              {{ record.name }}
            </template>
            <template v-else-if="column.dataIndex === 'title'">
              <a @click="showPostDetail(record.id)">{{ record.title }}</a>
            </template>
            <template v-else-if="column.dataIndex === 'address'">
              {{ record.address }}
            </template>
            <template v-else-if="column.dataIndex === 'price'">
              {{ formatPrice(record.price) }} {{ getUnitLabel(record.unit) }}
            </template>
            <template v-else-if="column.dataIndex === 'area'">
              {{ record.area }} m<sup>2</sup>
            </template>
            <template v-else-if="column.dataIndex === 'sold_status'">
              <a-tag
                :color="
                  record.sold_status === 1
                    ? '#87d068'
                    : record.sold_status === 0
                    ? '#f50'
                    : ''
                "
              >
                {{ record.sold_status == 1 ? "đã bán" : "chưa bán" }}</a-tag
              >
            </template>
            <template v-else-if="column.dataIndex === 'status_id'">
              <div>
                <a-tag color="processing">
                  chờ duyệt
                  <template #icon>
                    <sync-outlined :spin="true" />
                  </template>
                </a-tag>
              </div>
            </template>
            <span
              v-else
              @click="
                () =>
                  router.push({
                    name: 'admin-post-by-id',
                    params: { id: record.id },
                  })
              "
              class="cursor-pointer"
            >
            </span>
          </template>
        </a-table>
        <a-modal
          v-model:visible="isModalVisible"
          title="Chi tiết bài viết"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <p><strong>Tiêu đề:</strong> {{ postDetail.title }}</p>
          <p><strong>Địa chỉ:</strong> {{ postDetail.address }}</p>
          <p>
            <strong>Hướng nhà:</strong> Hướng
            {{ getDirectionLabel(postDetail.direction) }}
          </p>
          <p>
            <strong>Hướng ban công:</strong> Hướng
            {{ getDirectionLabel(postDetail.directionBalcony) }}
          </p>
          <p><strong>Số tầng:</strong> {{ postDetail.floors }}</p>
          <p><strong>Số phòng:</strong> {{ postDetail.rooms }}</p>
          <p><strong>Số nhà vệ sinh:</strong> {{ postDetail.bathrooms }}</p>
          <p>
            <strong>Giá:</strong> {{ formatPrice(postDetail.price) }}
            {{ getUnitLabel(postDetail.unit) }}
          </p>
          <p>
            <strong>Phí dịch vụ:</strong>
            {{ formatPrice(postDetail.priceservice) }}
            {{ getUnitLabel(postDetail.unit1) }}
          </p>
          <p>
            <strong>Giá điện:</strong>
            {{ formatPrice(postDetail.priceElectricity) }}
            {{ getUnitLabel(postDetail.unit2) }}
          </p>
          <p>
            <strong>Giá nước:</strong> {{ formatPrice(postDetail.pricewater) }}
            {{ getUnitLabel(postDetail.unit3) }}
          </p>
          <p><strong>Diện tích:</strong> {{ postDetail.area }} m<sup>2</sup></p>
        </a-modal>
      </div>
      <!-- end::Table -->
    </div>
  </div>
</template>

<script setup>
import {
  FilterOutlined,
  ExportOutlined,
  UserOutlined,
  SyncOutlined,
  DownOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { createVNode, computed, reactive } from "vue";
import messageAnt from "../../../scripts/message";
import formatDate from "../../../scripts/formatDate";
import listPostsAPI from "../../../api/posts/index";
import updatePostAPI from "../../../api/posts/update";
import deletePostAPI from "../../../api/posts/delete";
import getPostAPI from "../../../api/posts/getDetails";

import { Modal } from "ant-design-vue";

const isModalVisible = ref(false);
const postDetail = reactive({
  title: "",
  description: "",
  price: "",
  area: "",
  direction: "",
  directionBalcony: "",
  address: "",
  created_at: "",
  view: 1000,
  sold_status: "",
  classrank: "",
  user: "",
  comment: [],
  post_image: [],
  unit: "",
  unit1: "",
  unit2: "",
  unit3: "",
  rooms: "",
  bathrooms: "",
  floors: "",
  address_detail: "",
  pccc: "",
  elevator: "",
  stairs: "",
  bonus: "",
  bonusmonthly: "",
  priceservice: "",
  priceElectricity: "",
  pricewater: "",
});
const direction = [
  {
    value: 1,
    label: "Đông",
  },
  {
    value: 2,
    label: "Đông Nam",
  },
  {
    value: 3,
    label: "Nam",
  },
  {
    value: 4,
    label: "Tây Nam",
  },
  {
    value: 5,
    label: "Tây",
  },
  {
    value: 6,
    label: "Tây Bắc",
  },
  {
    value: 7,
    label: "Bắc",
  },
  {
    value: 8,
    label: "Đông Bắc",
  },
];
const getDirectionLabel = (value) => {
  const directionObj = direction.find((item) => item.value === value);
  return directionObj ? directionObj.label : "";
};

const showPostDetail = async (id) => {
  try {
    const detail = await getPostAPI.getById(id);
    postDetail.title = detail.title;
    postDetail.address = detail.address;
    postDetail.price = detail.price;
    postDetail.priceservice = detail.priceservice;
    postDetail.priceElectricity = detail.priceElectricity;
    postDetail.pricewater = detail.pricewater;
    postDetail.area = detail.area;
    postDetail.unit = detail.unit;
    postDetail.unit1 = detail.unit1;
    postDetail.unit2 = detail.unit2;
    postDetail.unit3 = detail.unit3;
    postDetail.direction = detail.direction;
    postDetail.floors = detail.floors;
    postDetail.rooms = detail.rooms;
    postDetail.bathrooms = detail.bathrooms;
    isModalVisible.value = true;
  } catch (error) {
    console.error("Failed to fetch post details:", error);
  }
};
const unit = [
  {
    value: "1",
    label: "Vnd/m2",
  },
  {
    value: "2",
    label: "Vnd/tháng",
  },
];
const unit1 = [
  {
    value: "1",
    label: "Vnd/m2",
  },
  {
    value: "2",
    label: "Thỏa thuận",
  },
];
const unit2 = [
  {
    value: "1",
    label: "Vnd/Số",
  },
  {
    value: "2",
    label: "Thỏa thuận",
  },
];

const unit3 = [
  {
    value: "1",
    label: "Vnd/Số",
  },
  {
    value: "2",
    label: "Thỏa thuận",
  },
];

const getUnitLabel = (value) => {
  const unitObj = unit.find((item) => item.value == value);
  return unitObj ? unitObj.label : "";
};
const getUnitLabel1 = (value) => {
  const unitObj = unit1.find((item) => item.value == value);
  return unitObj ? unitObj.label : "";
};
const getUnitLabel2 = (value) => {
  const unitObj = unit2.find((item) => item.value == value);
  return unitObj ? unitObj.label : "";
};
const getUnitLabel3 = (value) => {
  const unitObj = unit3.find((item) => item.value == value);
  return unitObj ? unitObj.label : "";
};

const handleOk = () => {
  isModalVisible.value = false;
};

const handleCancel = () => {
  isModalVisible.value = false;
};

function formatPrice(value) {
  // return value.toLocaleString('vi-VN');
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const state2 = reactive({
  searchText: "",
  searchedColumn: "",
});
const searchInput = ref();
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  state2.searchText = selectedKeys[0];
  state2.searchedColumn = dataIndex;
};
const handleReset = (clearFilters) => {
  clearFilters({
    confirm: true,
  });
  state2.searchText = "";
};

// modal export
const openModalExport = ref(false);
const showModalExport = () => {
  openModalExport.value = true;
};
const handleOkModalExport = (e) => {
  openModalExport.value = false;
};

// table
const columns = [
  {
    title: "Người đăng",
    dataIndex: "name",
    key: "name",
    width: 100,
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
    width: 250,
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.title.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: 200,
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.address.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "Gia thuê",
    dataIndex: "price",
    key: "price",
    width: 120,
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Diện tích",
    dataIndex: "area",
    key: "area",
    width: 100,
    sorter: (a, b) => a.area - b.area,
  },
  // {
  //     title: "Lượt xem",
  //     dataIndex: "view",
  // },
  {
    title: "Trạng thái",
    dataIndex: "sold_status",
    key: "sold_status",
    width: 100,
    // filters: [
    //   {
    //     text: "Chưa bán",
    //     value: 0,
    //   },
    //   {
    //     text: "Đã bán",
    //     value: 1,
    //   },
    // ],
    // onFilter: (value, record) => record.sold_status === value,
  },
  {
    title: "Trạng thái bài viết",
    dataIndex: "status_id",
    key: "status_id",
    width: 120,
    // filters: [
    //   {
    //     text: "Chờ xử lý",
    //     value: 3,
    //   },
    //   {
    //     text: "Công khai",
    //     value: 4,
    //   },
    //   {
    //     text: "Không công khai",
    //     value: 5,
    //   },
    // ],
    // onFilter: (value, record) => record.status_id === value,
  },
  // {
  //   title: "Chi tiết",
  //   key: "detail",
  //   fixed: "right",
  //   width: 120,
  // },
];
const data = ref([]);

/**
 * Hàm lấy danh sách bài viết chờ duyệt
 * @param
 * CreatedBy: youngbachhh (29/03/2024)
 */

const fetchPostsPendingList = async () => {
  data.value = [];

  const listPosts = await listPostsAPI.getPostPending();

  if (listPosts.length === 0) return;

  const posts = listPosts.map((post) => ({
    key: post.id,
    id: post.id,
    name: post.user.name,
    title: post.title,
    address: post.address,
    price: post.price || 0,
    area: post.area || 0,
    sold_status: post.sold_status,
    status_id: post.status.id,
    unit: post.unit,
  }));

  data.value = posts;
  console.log(data.value);
};

fetchPostsPendingList();

const state = reactive({
  selectedRowKeys: [],
  loading: false,
   loadingkd: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const start = () => {
  state.loading = true;
  const updateStatus = async () => {
    for (const id of state.selectedRowKeys) {
      await updatePostAPI.updateStatus(id);
    }
    state.loading = false;
    state.selectedRowKeys = [];
    fetchPostsPendingList();
    messageAnt.success();
  };
  updateStatus();
};


const end = () => {
  state.loadingkd = true;
  const updateStatus = async () => {
    for (const id of state.selectedRowKeys) {
      await updatePostAPI.updateStatus2(id);
    }
    state.loadingkd = false;
    state.selectedRowKeys = [];
    fetchPostsPendingList();
    messageAnt.success();
  };
  updateStatus();
};
const onSelectChange = (selectedRowKeys) => {
  state.selectedRowKeys = selectedRowKeys;
};

const pagination = reactive({
  pageSize: 10,
  showSizeChanger: true,
  responsive: true,
  showLessItems: true,
  onChange: (page, pageSize) => {},
});

const showConfirmDelete = async (id) => {
  Modal.confirm({
    title: "Cảnh báo",
    icon: createVNode(ExclamationCircleOutlined),
    class: "top-[24%]",
    content: createVNode(
      "div",
      {
        class: "text-danger",
      },
      "Bạn chắc chắn muốn xóa bài viết này ?"
    ),
    okText: "Xóa",
    cancelText: "Hủy",
    onOk() {
      const deletePost = async () => {
        await deletePostAPI(id);
        fetchPostsPendingList();
        messageAnt.success();
      };
      deletePost();
    },
    onCancel() {},
    maskClosable: true,
  });
};
</script>

<script>
import { ref } from "vue";
import ThePageHeader from "../../../components/ThePageHeader.vue";

export default {
  components: {
    ThePageHeader,
  },
};
</script>
<style>
 p {
  margin-bottom: 10px !important;
}

a-modal p strong {
  font-weight: bold;
  color: #333; /* Màu của tiêu đề */
}

a-modal p {
  color: #555; /* Màu của nội dung */
}

a-modal p sup {
  font-size: 12px;
  vertical-align: super;
}

a-modal {
  --ant-modal-header-bg: #f0f0f0; /* Màu nền header modal */
  --ant-modal-body-bg: #fff; /* Màu nền body modal */
}

a-modal .ant-modal-title {
  font-size: 18px;
  color: #000; /* Màu tiêu đề modal */
  font-weight: bold;
}
.ant-modal-header {
  background-color: #4a90e2;
  color: #ffffff;
  border-radius: 12px 12px 0 0;
  padding: 15px;
  text-align: center; 
  margin-bottom: 0px !important;

}
.ant-modal-header div{
  font-size: 20px !important;
}
</style>
