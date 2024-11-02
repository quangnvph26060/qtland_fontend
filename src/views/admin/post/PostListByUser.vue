<template>
  <div class="card border-x-0">
    <!-- begin::Card Header -->
    <div
      class="card-header flex flex-row-reverse justify-between mb-3 md:mb-0 mt-5"
    >
      <!-- begin::Card Toolbar -->
      <div class="card-toolbar flex justify-start md:justify-end">
        <a-modal
          v-model:open="openModalExport"
          title="Xuất file"
          cancelText="Huỷ"
          okText="Xuất file"
          class="top-[20%]"
          :onOk="
            () => {
              handleOkModalExport();
              messageAnt.success();
            }
          "
        >
          <a-form layout="horizontal" style="max-width: 600px">
            <a-form-item label="Loại file">
              <a-select>
                <a-select-option value="excel">Excel</a-select-option>
                <a-select-option value="admin">PDF</a-select-option>
                <a-select-option value="admin">Zip</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Khoảng thời gian">
              <a-range-picker />
            </a-form-item>
          </a-form>
        </a-modal>
        <!-- end::Export -->
      </div>
      <!-- end::Card Toolbar -->
    </div>
    <div style="display: flex; align-items: center" id="user_info_by_id">
      <div class="avatar-user">
        <img
          :src="
            user.avatar ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5NFFUU-0Yz1JkeqbyFgqOHvoPeBMmsdD0ks05B9wMWGF9glDlkVVvd65bWmJ6fIweT2k&usqp=CAU'
          "
          alt="User Avatar"
        />
      </div>
      <div class="user-info-container">
        <div class="user-info-item">
          <span class="label">Họ tên:</span>
          <span class="value">{{ user.name }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Email:</span>
          <span class="value">{{ user.email }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">CCCD:</span>
          <span class="value">{{ user.cccd }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Ngày sinh:</span>
          <span class="value">{{ user.birthday }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Giới tính :</span>
          <span class="value">{{ user.gender }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Đơn vị công tác:</span>
          <span class="value">{{ user.workunit }}</span>
        </div>
      </div>
      <div class="user-info-container">
        <div class="user-info-item">
          <span class="label">Trạng thái:</span>
          <span class="value">{{
            user.is_active == 1 ? "Hoạt đông" : "Không hoạt động"
          }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Số điện thoại:</span>
          <span class="value">{{ user.phone }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Quyền:</span>
          <span class="value">{{
            user.role_id == 1
              ? "supper admin"
              : user.role_id == 2
              ? "đầu chủ"
              : user.role_id == 3
              ? "sale"
              : user.role_id == 4
              ? "sale vip"
              : user.role_id == 5
              ? "đầu chủ vip"
              : user.role_id == 6
              ? "admin"
              : ""
          }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Quyền truy cập :</span>
          <span class="value">
            <div>
              <div>
                {{
                  user.permissions[0]?.access_permission_1 == 1
                    ? "Văn phòng hàng A"
                    : ""
                }}
              </div>
              <div>
                {{
                  user.permissions[0]?.access_permission_2 == 2
                    ? "Văn phòng hàng B"
                    : ""
                }}
              </div>
              <div>
                {{
                  user.permissions[0]?.access_permission_3 == 3
                    ? "Văn phòng hàng C"
                    : ""
                }}
              </div>
              <div>
                {{
                  user.permissions[0]?.access_permission_4 == 4
                    ? "Văn phòng hạng D"
                    : ""
                }}
              </div>
              <div>
                {{
                  user.permissions[0]?.access_permission_5 == 5
                    ? "Mặt bằng kinh doanh"
                    : ""
                }}
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <!-- end::Card Header -->

    <!-- begin::Card Body -->
    <!-- <div class="card-body">
      <a-table
        :data-source="data"
        :columns="columns"
        :scroll="{ x: 800 }"
        :pagination="pagination"
        :expand-column-width="20"
        id="main-table"
        :expand-icon-column-props="{ class: 'hide-on-mobile' }"
      >
        <template #expandColumnTitle>
          <span class="hide-on-mobile" style="color: red">More</span>
        </template>
        <template #expandedRowRender="{ record }">
          <p style="margin: 0; padding: 0px">
            <a-descriptions title="Thông tin chi tiết" :column="1">
              <a-descriptions-item label="Địa chỉ">{{
                record.address
              }}</a-descriptions-item>
              <a-descriptions-item label="Giá">{{
                formatMoney(record.price)
              }}</a-descriptions-item>
              <a-descriptions-item label="Diện tích"
                >{{ record.area }} m<sup>2</sup></a-descriptions-item
              ><a-descriptions-item
                label="Hướng nhà"
                v-if="record.direction !== 0"
                >{{ getDirectionLabel(record.direction) }}</a-descriptions-item
              >
              <a-descriptions-item label="Trạng thái bài viết">
                <div>
                  <a-tag
                    :bordered="false"
                    :color="statusColor(record.status_id)"
                  >
                    <template #icon>
                      <check-circle-outlined v-if="record.status_id === 4" />
                      <close-circle-outlined
                        v-else-if="record.status_id === 5"
                      />
                    </template>
                    {{ statusLabel(record.status_id) }}
                  </a-tag>
                </div></a-descriptions-item
              >
              <a-descriptions-item label="Ngày đăng">{{
                record.created_at
              }}</a-descriptions-item>
            </a-descriptions>
          </p>
        </template>
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
              @click="handleReset(clearFilters, column.dataIndex)"
            >
              Đặt lại
            </a-button>
          </div>
        </template>
        <template #customFilterIcon="{ filtered }">
          <search-outlined
            :style="{
              color: filtered ? '#108ee9' : undefined,
            }"
          />
        </template>
        <template #bodyCell="{ text, column, record }">
          <span
            v-if="state.searchText && state.searchedColumn === column.dataIndex"
          >
            <template
              v-for="(fragment, i) in text
                .toString()
                .split(
                  new RegExp(
                    `(?<=${state.searchText})|(?=${state.searchText})`,
                    'i'
                  )
                )"
            >
              <mark
                v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
                :key="i"
                class="highlight"
              >
                {{ fragment }}
              </mark>
              <template v-else>{{ fragment }}</template>
            </template>
          </span>
          <template v-if="column.dataIndex === 'title'">
            <router-link
              :to="{
                name: 'admin-pending-post-detail',
                params: { id: record.id },
              }"
            >
              {{ text }}
            </router-link>
          </template>
          <template v-if="column.key === 'detail'">
            <div style="display: flex; align-items: center">
              
              <div
                style="text-align: center; display: flex; margin-left: 15px"
                @click="showConfirmDelete(record.id)"
              >
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'sold_status'">
            <div class="flex">
              <a-tag
                :color="
                  record.sold_status === 1
                    ? '#87d068'
                    : record.sold_status === 0
                    ? '#f50'
                    : ''
                "
              >
                {{ record.sold_status == 1 ? "Đã thuê" : "Chưa thuê" }}
              </a-tag>
              <a-tag :color="getColorPriorityStatus(record.priority_status)">
                {{ record.priority_status }}
              </a-tag>
              <a-tag
                :color="
                  record.sold_status === 1
                    ? '#0033FF'
                    : record.status_id === 2
                    ? '#FF0000'
                    : record.status_id === 3
                    ? '#FF9900'
                    : record.status_id === 4
                    ? '#87d068'
                    : ''
                "
              >
                <span>{{
                  record.sold_status === 1
                    ? "Chờ hiển thị"
                    : getStatusId(record.status_id)
                }}</span>
              </a-tag>
            </div>
          </template>
        </template>
      </a-table>
    </div> -->

    <div v-if="user.is_active !== 2" class="" style="padding: 20px">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" force-render class="space-y-5">
          <template #tab> Tất cả ({{ totalpost }})</template>
          <div>
            <CardinforDetailByUser />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" class="space-y-5">
          <template #tab> Đang hiển thị ({{ totalpostht }}) </template>
          <!-- begin::Post Items -->
          <div>
            <CardinforDetailByUserStatus4 />
          </div>
          <!-- end::Post Items -->
        </a-tab-pane>

        <a-tab-pane key="3" class="space-y-5">
          <template #tab> Chờ hiển thị ({{ totalpostcht }}) </template>
          <!-- begin::Post Items -->
          <div>
            <CardinforDetailByUserSold />
          </div>
          <!-- end::Post Items -->
        </a-tab-pane>

        <a-tab-pane key="4" class="space-y-5">
          <template #tab> Chờ duyệt ({{ totalpostcd }}) </template>
          <!-- begin::Post Items -->
          <div>
            <CardinforDetailByUserStatus3 />
          </div>
          <!-- end::Post Items -->
        </a-tab-pane>

        <a-tab-pane key="5" class="space-y-5">
          <template #tab> Không duyệt ({{ totalpostkd }}) </template>
          <!-- begin::Post Items -->
          <div>
            <CardinforDetailByUserStatus2 />
          </div>
          <!-- end::Post Items -->
        </a-tab-pane>
      </a-tabs>
    </div>
    <div v-if="user.is_active == 2" style="padding: 20px">
      <div class="row">
        <!-- Tiêu đề CCCD Trước -->
        <div class="col-md-6 col-12">
          <div class="row">
            <div class="col-12 mb-3">
            <h5>Ảnh CCCD Trước</h5>
          </div>
          <!-- Ảnh CCCD Trước -->
          <div class="col-12 mb-4">
            <img
              :src="user.cccd_trc"
              alt="Ảnh CCCD Trước"
              class=" rounded border cccd-image"
            />
          </div>
          </div>
        </div>

        <!-- Tiêu đề CCCD Sau -->
        <div  class="col-md-6 col-12">
          <div class="row">
            <div class="col-12 mb-3">
            <h5>Ảnh CCCD Sau</h5>
          </div>
          <!-- Ảnh CCCD Sau -->
          <div class="col-12 mb-4">
            <img
              :src="user.cccd_sau"
              alt="Ảnh CCCD Sau"
              class="img-fluid rounded border cccd-image"
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  FilterOutlined,
  ExportOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import {
  createVNode,
  reactive,
  ref,
  watch,
  onBeforeUnmount,
  onMounted,
} from "vue";
import messageAnt from "../../../scripts/message";
import listPostsAPI from "../../../api/posts/index";
import deletePostAPI from "../../../api/posts/delete";
import viewedPostsAPI from "../../../api/posts/viewed/index";
import { Modal } from "ant-design-vue";
import formatMoney from "../../../utils/formatMoney";
import FilterAddress from "../../../components/base/filter/FilterAddress.vue";
import FilterPriceRange from "../../../components/base/filter/FilterPriceRange.vue";
import FilterAreaRange from "../../../components/base/filter/FilterAreaRange.vue";
import FilterOptions from "../../../components/base/filter/FilterOptions.vue";
import FilterStatus from "../../../components/base/filter/FilterStatus.vue";
import filterRange from "../../../stores/filterRange";
import getTimeSincePostCreation from "../../../utils/getTimeSincePostCreation";
import CardinforDetailByUser from "../../../components/base/card/CardnforDetailByUser.vue";
import CardinforDetailByUserStatus4 from "../../../components/base/card/CardnforDetailByUserStatus4.vue";
import CardinforDetailByUserStatus3 from "../../../components/base/card/CardnforDetailByUserStatus3.vue";
import CardinforDetailByUserStatus2 from "../../../components/base/card/CardnforDetailByUserStatus2.vue";
import CardinforDetailByUserSold from "../../../components/base/card/CardnforDetailByUserSold.vue";

import { useRoute } from "vue-router";
import getUserAPI from "../../../api/users/getUser";
import router from "../../../router";

const route = useRoute();
const searchInput = ref();
const state = reactive({
  searchConditions: [],
});

const splitText = (text, searchText) => {
  return text.split(new RegExp(`(${searchText})`, "i"));
};
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  const searchText = selectedKeys[0];

  // Clone the search conditions to ensure reactivity
  const updatedConditions = [...state.searchConditions];

  // Remove any existing condition for the same column
  const conditionIndex = updatedConditions.findIndex(
    (condition) => condition.column === dataIndex
  );
  if (conditionIndex !== -1) {
    updatedConditions.splice(conditionIndex, 1);
  }

  // Push the new condition
  updatedConditions.push({
    column: dataIndex,
    text: searchText,
  });

  // Define the desired order
  const desiredOrder = [
    "name",
    "title",
    "address",
    "address_detail",
    "price",
    "area",
    "views_count",
    "sold_status",
    "priority_status",
    "status_id",
  ];

  // Sort the search conditions based on the desired order
  updatedConditions.sort((a, b) => {
    return desiredOrder.indexOf(a.column) - desiredOrder.indexOf(b.column);
  });

  // Update the search conditions
  state.searchConditions = updatedConditions;

  // Call the fetchPostsListByID function with updated conditions
  fetchPostsListByID({
    ...filterStore.getAll,
    searchConditions: updatedConditions,
  });
};

const handleReset = (clearFilters, dataIndex) => {
  clearFilters({
    confirm: true,
  });

  state.searchConditions = state.searchConditions.filter(
    (condition) => condition.column !== dataIndex
  );

  fetchPostsListByID({
    ...filterStore.getAll,
    searchConditions: state.searchConditions,
  });

  // router.push({ name: "admin-post-list" });
};
const filterStore = filterRange();

let filter = filterStore.getAll;

onBeforeUnmount(() => {
  filterStore.resetFilters();
});

onMounted(() => {
  filterStore.resetFilters();
});

const handResetFilter = () => {
  filterStore.resetFilters();
  fetchPostsListByID({
    ...filterStore.getAll,
    searchConditions: state.searchConditions,
  });
};

const handaddpost = () => {
  router.push({ name: "admin-post-create" });
};

const props = defineProps({
  rangeArea: String,
  rangePrice: String,
  dirs: Array,
  address: String,
  sold_status: Array,
  priority_status: Array,
});

const data = ref([]);
const pageFilter = ref(1);
const pageSizeFilter = ref(10);
const currentPage = ref(1);
const total = ref(0);

watch(props, (newVal) => {
  filter = {
    ...filter,
    rangeArea: newVal.rangeArea,
    rangePrice: newVal.rangePrice,
    dirs: newVal.dirs,
    address: newVal.address,
    sold_status: newVal.sold_status,
    priority_status: newVal.priority_status,
  };
  fetchPostsListByID({
    ...filter,
    searchConditions: state.searchConditions,
  });
});

// modal export
const openModalExport = ref(false);
const showModalExport = () => {
  openModalExport.value = true;
};
const handleOkModalExport = (e) => {
  openModalExport.value = false;
};

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

// table
const columns = [
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
    width: 240,
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
    class: "title_width",
  },

  // {
  //   title: "Lượt xem",
  //   dataIndex: "views_count",
  //   key: "views_count",
  //   width: 100,
  //   sorter: (a, b) => a.views_count - b.views_count,
  //   class: 'views_count_width',
  // },
  {
    title: "Trạng thái",
    dataIndex: "sold_status",
    key: "sold_status",
    width: 150,
    class: "sold_status-width",
  },
  {
    title: "Chi tiết",
    key: "detail",
    width: 90,
    class: "detail-width",
  },
];

/**
 * Hàm lấy danh sách bài viết đã duyệt
 * @param
 * CreatedBy: youngbachhh (29/03/2024)
 */
const userid = route.params.id;
const fetchPostsListByID = async (filter, page = 1, pageSize = 10) => {
  data.value = [];

  let res;

  res = await listPostsAPI.getPostByFilterByUserID(userid, {
    ...filter,
    page: pageFilter.value,
    pageSize: pageSizeFilter.value,
  });
  // console.log(res);
  let listPosts = res.data;
  total.value = res.total;
  const posts = [];
  const ans = reactive({
    id: "",
    key: "",
    title: "",
    name: "",
    description: "",
    price: "",
    direction: "",
    area: "",
    address: "",
    created_at: "",
    views_count: 0,
    sold_status: "",
    priority_status: "",
    status_id: "",
    user: "",
    comment: [],
    post_image: [],
    user_info: "",
    cccd_trc: "",
    cccd_sau: "",
    gender: "",
  });
  if (listPosts.length === 0) return;
  for (let i = 0; i < listPosts.length; i++) {
    const post = listPosts[i];
    Object.keys(ans).forEach((key) => {
      ans[key] = post[key];
    });

    ans.created_at = getTimeSincePostCreation(post.created_at, true);
    ans.name = post.user_info.name;
    ans.key = i + 1;
    posts.push({ ...ans });
  }

  data.value = posts;
};

fetchPostsListByID({
  ...filter,
  searchConditions: state.searchConditions,
});

const getColorPriorityStatus = (priority_status) => {
  switch (priority_status) {
    case "khách nhượng":
      return "volcano";
    case "quy hoạch":
      return "cyan";
    case "khong yêu cầu":
      return "kyc";
    default:
      return "";
  }
};

const getStatusId = (status_id) => {
  switch (status_id) {
    case 1:
      return "Chờ hiển thị";
    case 2:
      return "Không duyệt";
    case 3:
      return "Chờ duyệt";
    case 4:
      return "Đã duyệt";
    default:
      return "";
  }
};

const pagination = reactive({
  showSizeChanger: true,
  responsive: true,
  current: currentPage.value,
  showLessItems: true,
  total: total.value,
  onChange: (page, pageSize) => {
    pageFilter.value = page;
    pageSizeFilter.value = pageSize;
    fetchPostsListByID({
      ...filter,
      page: page,
      pageSize: pageSize,
      searchConditions: state.searchConditions,
    });
    scrollToTop();
  },
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

watch(total, (newVal) => {
  pagination.total = newVal;
  total.value = newVal;
});

watch(pageFilter, (newVal) => {
  pagination.current = newVal;
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
        fetchPostsListByID({
          ...filter,
          searchConditions: state.searchConditions,
        });
        messageAnt.success("Xóa bài viết thành công");
      };
      deletePost();
    },
    onCancel() {},
    maskClosable: true,
  });
};

const user = reactive({
  name: "",
  email: "",
  password: "",
  cccd: "",
  role_id: "",
  is_active: "",
  cccd: "",
  phone: "",
  address: "",
  workunit: "",
  birthday: "",
  avatar: "",
  permissions: "",
  gender: "",
  cccd_trc: "",
  cccd_sau: "",
});
const comments = ref([]);

const totalpost = ref(0);
const totalpostht = ref(0);
const totalpostcht = ref(0);
const totalpostcd = ref(0);
const totalpostkd = ref(0);

const fetchUserById = async (id) => {
  const users = await getUserAPI.getById(id);
  const listpost = await listPostsAPI.getPostByUser(id); //all
  totalpost.value = listpost.length;
  const listpostht = await listPostsAPI.getPostByUserHT(id); // HT
  totalpostht.value = listpostht.length;
  const listpostcht = await listPostsAPI.getPostSoldByUser(id); // CHT
  totalpostcht.value = listpostcht.length;
  const listpostcd = await listPostsAPI.getPostStatus3ByUser(id); // CD
  totalpostcd.value = listpostcd.length;
  const listpostkd = await listPostsAPI.getPostStatus2ByUser(id); // KD
  totalpostkd.value = listpostkd.length;

  Object.keys(user).forEach((key) => {
    user[key] = users[key];
  });

  // comments.value.push(...post.comment);
};

fetchUserById(userid);
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
import listReportAPI from "../../../api/report";
export default {
  components: {
    ThePageHeader,
  },
  methods: {
    statusColor(status_id) {
      if (status_id === 4) {
        return "success";
      } else if (status_id === 5) {
        return "error";
      }
      return "";
    },
    statusLabel(status_id) {
      if (status_id === 4) {
        return "công khai";
      } else if (status_id === 5) {
        return "không công khai";
      }
      return "chờ xử lý";
    },
  },
};
</script>
<style scoped>
.user-info-container {
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  border: 1px solid #ddd;
  /* border-radius: 8px; */
  padding: 16px;
  max-width: 600px;
  margin: 10px 60px;
  flex: 2;
}

.user-info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.user-info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  color: #555;
}
.avatar-user {
  max-width: 255px;
  max-height: 255px;
  margin-left: 50px;
}
.avatar-user img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.cccd-image {
  width: 300px  !important; /* Giới hạn chiều rộng tối đa */
  height: 170px !important; /* Giới hạn chiều cao tối đa */
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>

