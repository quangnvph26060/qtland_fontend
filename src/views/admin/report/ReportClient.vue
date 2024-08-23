<template>
  <div class="flex flex-col col-12 col-xl-12 xl:pr-[30px]" id="report-client">
    <!-- <div class="w-full">
			<ThePageHeader />
		</div> -->

    <!-- begin::Main Content -->
    <div class="reportlisst">
      <a-tabs>
        <a-tab-pane class="space-y-5">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div>
              <h2 style="margin: 0; padding-left: 10px">Danh sách báo cáo</h2>
            </div>
          </div>

          <a-table
            :data-source="data"
            :columns="columns"
            :scroll="{ x: 1000 }"
            :dataSource="data"
            :rowKey="(record) => record.id"
            :pagination="pagination"
            :expand-column-width="20"
            id="main-table"
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
                    (e) =>
                      setSelectedKeys(e.target.value ? [e.target.value] : [])
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
                v-if="
                  state.searchText && state.searchedColumn === column.dataIndex
                "
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
                    v-if="
                      fragment.toLowerCase() === state.searchText.toLowerCase()
                    "
                    :key="i"
                    class="highlight"
                  >
                    {{ fragment }}
                  </mark>
                  <template v-else>{{ fragment }}</template>
                </template>
              </span>
              <template
                v-if="column.key === 'detail' && authStore.user.role_id === 1"
              >
                <div style="display: flex; align-items: center">
                  <router-link
                    :to="{
                      name: 'admin-client-report-detail',
                      params: { id: record.id },
                    }"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </router-link>
                  <div
                    style="display: flex; margin-left: 15px"
                    @click="showConfirmDelete(record.id)"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'created_at'">
                {{ new Date(text).toLocaleDateString("en-GB") }}
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
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
import { ref, reactive, onMounted, computed, watch } from "vue";
import router from "../../../router";
import { Modal } from "ant-design-vue";
import messageAnt from "../../../scripts/message";
import auth from "../../../stores/auth";
import listReportAPI from "../../../api/report/index.js";
import deleteReportAPI from "../../../api/report/delete.js";
import getTimeSincePostCreation from "../../../utils/getTimeSincePostCreation";
const searchInput = ref();
const state = reactive({
  searchConditions: [],
});
const authStore = auth();
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
};
const columns = [
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
    width: 120,
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
    title: "Điện thoại",
    dataIndex: "phone",
    key: "phone",
    width: 100,
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.phone.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "Mã tin",
    dataIndex: "post_id",
    key: "post_id",
    width: 80,
    customFilterDropdown: true,
    onFilter: (value, record) => record.post_id.toString().includes(value),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  ,
  {
    title: "Tiêu dề tin",
    dataIndex: ["post", "title"],
    key: "post.title",
    width: 150,
    customFilterDropdown: true,
    onFilter: (value, record) => record.post.title.toString().includes(value),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },

  {
    title: "Thời gian dẫn khách",
    dataIndex: "time",
    key: "time",
    width: 120,
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
    width: 120,
  },
  {
    title: "Người tạo",
    dataIndex: ["user", "name"],
    key: "user.name",
    width: 120,
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.user.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
];
if (authStore.user.role_id === 1) {
  columns.push({
    title: "Chi tiết",
    key: "detail",
    width: 20,
  });
}

const handleReset = (clearFilters, dataIndex) => {
  clearFilters({
    confirm: true,
  });

  state.searchConditions = state.searchConditions.filter(
    (condition) => condition.column !== dataIndex
  );

  fetchPostByUser(authStore.getUser.id);

  // router.push({ name: "admin-post-list" });
};
const userId = ref(authStore.getUser.id);
watch(
  () => authStore.getUser,
  () => {
    fetchPostByUser(authStore.getUser.id);
  }
);

const redirectPostDetail = (postId) => {
  router.push({ name: "post-edit", params: { id: postId } });
};

const activeKey = ref("1");

const totalLand = ref(0);

// confirm modal
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
      "Bạn chắc chắn muốn xóa báo cáo này ?"
    ),
    okText: "Xóa",
    cancelText: "Hủy",
    onOk() {
      const deleteReport = async () => {
        await deleteReportAPI(id);
        fetchPostByUser();
        messageAnt.success("Xóa thành công");
      };
      deleteReport();
    },
    onCancel() {},
    maskClosable: true,
  });
};

const data = ref([]);
const pageFilter = ref(1);
const pageSizeFilter = ref(10);
const currentPage = ref(1);
const total = ref(0);

const pagination = reactive({
  showSizeChanger: true,
  responsive: true,
  current: currentPage.value,
  showLessItems: true,
  total: total.value,
  onChange: (page, pageSize) => {
    pageFilter.value = page;
    pageSizeFilter.value = pageSize;
    fetchPostByUser({
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

const fetchPostByUser = async (page = 1, pageSize = 10) => {
  try {
    data.value = [];
    const posts = [];
    const params = {
      page: pageFilter.value,
      pageSize: pageSizeFilter.value,
    };

    // Gọi API và lấy danh sách báo cáo
    const response = await listReportAPI.getAllReport(params);
    const listPosts = response.data || [];
    total.value = response.total;

    for (const post of listPosts) {
      posts.push({
        id: post.id,
        name: post.name,
        phone: post.phone,
        cccd: post.cccd,
        address: post.address,
        birthday: post.birthday,
        time: post.time,
        description: post.description,
        created_at: post.created_at,
        post_id: post.post_id,
        user_id: post.user_id,
        user: post.user,
        post: post.post,
      });
    }

    data.value = posts;
  } catch (error) {
    console.error("Error fetching posts by user:", error);
  }
};

onMounted(() => {
  fetchPostByUser();
});
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
import Card from "../../../components/base/card/Card.vue";
import CardInfor from "../../../components/base/card/CardInfor.vue";
import SidebarFilter from "../../../components/base/sidebar/SidebarFilter.vue";

export default {
  components: {
    ThePageHeader,
    Card,
  },
};
</script>
<style>
.sidebar-box-item {
  margin-bottom: 12px;
  font-weight: normal;
}
</style>
