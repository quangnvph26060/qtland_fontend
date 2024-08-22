<template>
  <div class="card border-x-0">
    <!-- begin::Card Header -->
    <div class="card-body">
      <!-- begin::Table -->
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
              <!-- <router-link
                :to="{
                  name: 'admin-post-detail',
                  params: { id: record.id },
                }"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </router-link> -->
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
      <!-- end::Table -->
    </div>
    <!-- end::Card Body -->

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
import FilterAddress from "../filter/FilterAddress.vue";
import FilterPriceRange from "../filter/FilterPriceRange.vue";
import FilterAreaRange from "../filter/FilterAreaRange.vue";
import FilterOptions from "../filter/FilterOptions.vue";
import FilterStatus from "../filter/FilterStatus.vue";
import filterRange from "../../../stores/filterRange";
import getTimeSincePostCreation from "../../../utils/getTimeSincePostCreation";
import CardinforDetailByUser from "./CardnforDetailByUser.vue";
import { useRoute } from "vue-router";
import getUserAPI from "../../../api/users/getUser";
import router from "../../../router";
import { defineProps } from 'vue';

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
  // {
  //   title: "Người đăng",
  //   dataIndex: "name",
  //   key: "name",
  //   width: 120,
  //   customFilterDropdown: true,
  //   onFilter: (value, record) =>
  //     record.name.toString().toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownOpenChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => {
  //         searchInput.value.focus();
  //       }, 100);
  //     }
  //   },
  //    className: 'hide-on-mobile',
  // },
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

  res = await listPostsAPI.getPostByFilterstatus2ByUserID(userid, {
    ...filter,
    page: pageFilter.value,
    pageSize: pageSizeFilter.value,
  });
  console.log(res);
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
});
const comments = ref([]);

const fetchUserById = async (id) => {
  const users = await getUserAPI.getById(id);
  console.log(user);
  Object.keys(user).forEach((key) => {
    user[key] = users[key];
  });

  // comments.value.push(...post.comment);
};

fetchUserById(userid);
</script>

<script>
import ThePageHeader from "../../ThePageHeader.vue";
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
</style>

