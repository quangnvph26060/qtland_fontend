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
                    {{
                      record.sold_status === 1
                        ? "Chờ hiển thị"
                        : getStatusId(record.status_id)
                    }}
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
          <template v-if="column.key === 'detail'">
            <div style="display: flex; align-items: center">
              <router-link
                :to="{
                  name: 'post-edit',
                  params: { id: record.id },
                }"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </router-link>

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
              <div>
                <div class="flex flex-col checkbox_sold">
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="record.sold_status"
                      :true-value="1"
                      :false-value="0"
                      @change="
                        handleCheckboxChange(record.id, record.sold_status)
                      "
                    />
                    <span class="slider"></span>
                  </label>
                  <p style="font-weight: 600">
                    {{ record?.sold_status === 1 ? "Đã thuê" : "Chưa thuê" }}
                  </p>
                </div>
              </div>
              <a-tag
                :color="getColorPriorityStatus(record.priority_status)"
                style="height: 22px"
              >
                {{ record.priority_status }}
                {{
                  record.priority_status == "trả phòng"
                    ? formatDate(record.traphong)
                    : ""
                }}
              </a-tag>
              <a-tag
                style="height: 22px"
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
import { Modal, message } from "ant-design-vue";
import formatMoney from "../../../utils/formatMoney";
import FilterAddress from "../../../components/base/filter/FilterAddress.vue";
import FilterPriceRange from "../../../components/base/filter/FilterPriceRange.vue";
import FilterAreaRange from "../../../components/base/filter/FilterAreaRange.vue";
import FilterOptions from "../../../components/base/filter/FilterOptions.vue";
import FilterStatus from "../../../components/base/filter/FilterStatus.vue";
import filterRange from "../../../stores/filterRange";
import getTimeSincePostCreation from "../../../utils/getTimeSincePostCreation";
import router from "../../../router";
import formatDate from "../../../scripts/formatDate";
import updatePostAPI from "../../../api/posts/update";

const getStatusLabel = (statusId) => {
  switch (statusId) {
    case 3:
      return "Chờ duyệt";
    case 4:
      return "Đang hiển thị";
    default:
      return "Không duyệt";
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

const user_id = localStorage.getItem("user_id");

const handleCheckboxChange = async (id, sold_status) => {
  let status;
  if (sold_status == 0) {
    status = 3;
  } else {
    status = 1;
  }
  const response = await updatePostAPI.updateSoldStatus(
    id,
    sold_status,
    user_id,
    status
  );
  fetchPostsList();
  if (response && response.status == 200) {
    message.success("Cập nhật trạng thái cho thuê thành công");
    // record.status_id = status;
    // record.sold_status = sold_status;
    // Vue.set(record, 'status_id', status);
    //  Vue.set(record, 'sold_status', sold_status);
  }
};

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
    "traphong",
  ];

  // Sort the search conditions based on the desired order
  updatedConditions.sort((a, b) => {
    return desiredOrder.indexOf(a.column) - desiredOrder.indexOf(b.column);
  });

  // Update the search conditions
  state.searchConditions = updatedConditions;

  // Call the fetchPostsList function with updated conditions
  fetchPostsList({
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

  fetchPostsList({
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
  fetchPostsList({
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
  fetchPostsList({
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
    width: 160,
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
  {
    title: "Trạng thái",
    dataIndex: "sold_status",
    key: "sold_status",
    width: 150,
    class: "sold_status-width",
  },
  {
    title: "Ngày đăng",
    dataIndex: "created_at",
    key: "created_at",
    width: 100,
    // sorter: (a, b) => a.views_count - b.views_count,
    // class: "views_count_width",
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
const userid = localStorage.getItem("user_id");
const fetchPostsList = async (filter, page = 1, pageSize = 10) => {
  data.value = [];

  let res;
  res = await listPostsAPI.getPostsByUser({
    ...filter,
    page: pageFilter.value,
    pageSize: pageSizeFilter.value,
    user_id: userid,
  });

  let listPosts = res.data;
  console.log(listPosts);
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
    user_id: "",
    traphong: "",
  });

  if (listPosts.length === 0) return;

  for (let i = 0; i < listPosts.length; i++) {
    const post = listPosts[i];

    // Kiểm tra nếu user_id của post bằng với userid
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

// fetchPostsList({
//   ...filter,
//   searchConditions: state.searchConditions,
// });
onMounted(() => {
  fetchPostsList();
});

const getColorPriorityStatus = (priority_status) => {
  switch (priority_status) {
    case "khách nhượng":
      return "volcano";
    case "trả phòng":
      return "cyan";
    case "khong yêu cầu":
      return "kyc";
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
    fetchPostsList({
      page: page,
      pageSize: pageSize,
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
        fetchPostsList({
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
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
import user from "../../../router/user";
// import { useRouter } from 'vue-router';
// const router = useRouter();
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
<style>
.card-header {
  display: none;
}
</style>
