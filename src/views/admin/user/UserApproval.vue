<template>
  <div class="card border-x-0">
    <!-- begin::Card Header -->
    <div
      class="card-header flex flex-col md:flex-row justify-between mb-3 md:mb-0 mt-5"
    >
      <!-- begin::Card Toolbar -->
      <div class="card-toolbar">
        <div class="flex justify-start md:justify-end">
          <!-- begin::Add New -->
          <!-- <a-button type="primary" @click="showModalAdd" class="w-[120px]">
            Thêm mới
          </a-button> -->
          <!-- end::Add New -->
        </div>
      </div>
      <!-- end::Card Toolbar -->
    </div>
    <!-- end::Card Header -->

    <!-- begin::Card Body -->
    <div class="card-body">
      <div class="flex justify-start my-3">
        <!-- begin::Add New -->
        <a-button type="primary" @click="showModalAdd" class="w-[120px]">
          Thêm mới
        </a-button>
        <!-- end::Add New -->
      </div>
      <!-- begin::Table -->
      <div>
        <a-table
          :data-source="data"
          :columns="columns"
          :dataSource="data"
          :scroll="{ x: 600 }"
          :expand-column-width="50"
          :pagination="pagination"
          :expand-icon-column-props="{ class: 'hide-on-mobile' }"
        >
          <template #expandColumnTitle>
            <span class="hide-on-mobile" style="color: red">More</span>
          </template>
          <template #expandedRowRender="{ record }">
            <p style="margin: 0">
              <a-descriptions title="Thông tin chi tiết" :column="1">
                <a-descriptions-item label="Ngày tham gia">{{
                  record.created_at
                }}</a-descriptions-item>
                <a-descriptions-item label="Ngày cập nhật">{{
                  record.created_at
                }}</a-descriptions-item
                ><a-descriptions-item label="Trạng thái"
                  ><a-tag
                    :bordered="false"
                    :color="
                      record.is_active == 1
                        ? 'success'
                        : record.is_active == 0
                        ? 'error'
                        : ''
                    "
                  >
                    {{
                      record.is_active == 1 ? "hoạt động" : "không hoạt động"
                    }}</a-tag
                  ></a-descriptions-item
                >
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
                Search
              </a-button>
              <a-button
                size="small"
                style="width: 90px"
                @click="handleReset(clearFilters)"
              >
                Reset
              </a-button>
            </div>
          </template>
          <template #customFilterIcon="{ filtered }">
            <search-outlined
              :style="{ color: filtered ? '#108ee9' : undefined }"
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
            <template v-if="column.key === 'operation'">
              <div style="display: flex; align-items: center">
                <!-- <div style="text-align: center">
                  <div @click="showModalUpdate(record)">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </div>
                </div> -->
                <div
                  style="text-align: center; margin-left: 15px"
                  @click="showConfirmDelete(record.id)"
                >
                  <i class="fa-solid fa-trash"></i>
                </div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'name'">
              <router-link
                  :to="{
                    name: 'approval-detail',
                    params: { id: record.id },
                  }"
                >
                  {{ text }}
                </router-link>
            </template>
            <!-- tag for role user -->
            <template v-if="column.dataIndex === 'role_id'">
              <a-tag
                :color="
                  record.role_id == 1 || record.role_id == 6
                    ? '#87d068'
                    : record.role_id == 2 || record.role_id == 5
                    ? '#2db7f5'
                    : record.role_id == 3 || record.role_id == 4
                    ? '#8b5cf6'
                    : ''
                "
              >
                {{
                  record.role_id == 1
                    ? "supper admin"
                    : record.role_id == 2
                    ? "đầu chủ"
                    : record.role_id == 3
                    ? "sale"
                    : record.role_id == 4
                    ? "sale vip"
                    : record.role_id == 5
                    ? "đầu chủ vip"
                    : record.role_id == 6
                    ? "admin"
                    : ""
                }}
              </a-tag>
            </template>
            <template v-else-if="column.dataIndex === 'is_active'">
              <a-tag
                :bordered="false"
                :color="
                  record.is_active == 1
                    ? 'success'
                    : record.is_active == 0
                    ? 'error'
                    : ''
                "
              >
                {{
                  record.is_active == 1 ? "hoạt động" : "không hoạt động"
                }}</a-tag
              >
            </template>
          </template>
        </a-table>
      </div>

      <!-- end::Table -->
    </div>
  </div>

  <UserDetail
    v-model:open="isShowDetail"
    @isShowDetail="showDetail"
    @updateUserList="fetchUsersList"
    :title="title"
    :userSelected="userSelected"
  />
</template>

<script setup>
import {
  ExclamationCircleOutlined,
  FilterOutlined,
  ExportOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { ref, reactive, onMounted, computed, watch } from "vue";

import { Modal } from "ant-design-vue";

import { createVNode } from "vue";
import { listUsersRoleAPI, listUsersAPI, listUserApprovalsAPI } from "../../../api/users/index";

import listPostsAPI from "../../../api/posts/index";
import deleteUserAPI from "../../../api/users/deleteUser";
import formatDate from "../../../scripts/formatDate";
import UserDetail from "./UserDetail.vue";
import messageAnt from "../../../scripts/message";
import auth from "../../../stores/auth";
import { RouterLink } from "vue-router";
const state = reactive({
  searchText: "",
  searchedColumn: "",
});
const searchInput = ref();

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};
const handleReset = (clearFilters) => {
  clearFilters({
    confirm: true,
  });
  state.searchText = "";
};

// table
const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    width: 120,
    class: "user_name",
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
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 150,
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.email.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  // {
  // 	title: "Ngày tham gia",
  // 	dataIndex: "created_at",
  // 	key: "created_at",
  // 	width: 150,
  // },
  // {
  // 	title: "Ngày cập nhật",
  // 	dataIndex: "updated_at",
  // 	key: "updated_at",
  // 	width: 150,
  // },
  {
    title: "Chức vụ",
    dataIndex: "role_id",
    key: "role_id",
    width: 100,
    filters: [
      {
        text: "Admin",
        value: 1,
      },
      {
        text: "Đầu chủ",
        value: 2,
      },
      {
        text: "Sale",
        value: 3,
      },
      {
        text: "Sale VIP",
        value: 4,
      },
      {
        text: "Đầu chủ VIP",
        value: 5,
      },
      {
        text: "Quản trị viên thường",
        value: 6,
      },
      {
        text: "Cộng tác viên",
        value: 7,
      },
    ],
    onFilter: (value, record) => record.role_id === value,
  },
  
  {
    title: "Chi tiết",
    key: "operation",
    width: 100,
    class: "user_detail",
  },
];

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
    fetchUsersList({
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

/**
 * Hàm lấy danh sách người dùng
 * @param
 * CreatedBy: youngbachhh (28/03/2024)
 */
const store = auth();
const value = computed(() => store.user);
// console.log(value);
onMounted(() => {
  // console.log(store.user);
});
const id = ref("");
const fetchUsersList = async (page = 1, pageSize = 10) => {
  try {
    data.value = [];
    const users = [];
    const params = {
      page: pageFilter.value,
      pageSize: pageSizeFilter.value,
    };
    // Gọi API và kiểm tra kết quả
    let response = [];
   
    response = await listUserApprovalsAPI(params);   

    const listUsers = response.data || [];

    total.value = response.total;
    for (const user of listUsers) {
      users.push({
        id: user.id,
        key: user.id,
        name: user.name,
        email: user.email,
        created_at: formatDate(user.created_at),
        updated_at: formatDate(user.updated_at),
        role_id: user.role_id,
        is_active: user.is_active,
        post_count: user.post_count,
        cccd: user.cccd,
        password: user.password,
        phone: user.phone,
        address: user.address,
        workunit: user.workunit,
        birthday: user.birthday,
        access_permission_1: user.permissions[0]?.access_permission_1,
        access_permission_2: user.permissions[0]?.access_permission_2,
        access_permission_3: user.permissions[0]?.access_permission_3,
        access_permission_4: user.permissions[0]?.access_permission_4,
        access_permission_5: user.permissions[0]?.access_permission_5,
      });
    }
    data.value = users;
  } catch (error) {
    console.error("Error fetching users list:", error);
  }
};

onMounted(() => {
  fetchUsersList();
});

// modal update/add
const title = ref("");
const isShowDetail = ref(false);
const userSelected = ref({
  name: "",
  email: "",
  password: "",
  role_id: "",
  is_active: "",
  cccd: "",
  phone: "",
  address: "",
  workunit: "",
  birthday: "",
  access_permission_1: "",
  access_permission_2: "",
  access_permission_3: "",
  access_permission_4: "",
  access_permission_5: "",
});

const showDetail = (value) => {
  isShowDetail.value = value;
};
const showModalAdd = () => {
  userSelected.value = {
    name: "",
    email: "",
    // password: "",
    role_id: "",
    is_active: "",
    cccd: "",
  };
  isShowDetail.value = true;
  title.value = "Thêm mới";
};
const showModalUpdate = async (user) => {
  title.value = "Sửa";
  userSelected.value = user;
  isShowDetail.value = true;
};

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
      "Bạn chắc chắn muốn xoá người dùng này ?"
    ),
    okText: "Xoá",
    cancelText: "Huỷ",
    onOk() {
      const fetchDeleteUser = async (id) => {
        await deleteUserAPI(id);
        fetchUsersList();
        messageAnt.success();
      };
      fetchDeleteUser(id);
    },
    onCancel() {},
  });
};
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";

export default {
  components: {
    ThePageHeader,
  },
};
</script>
<style></style>
