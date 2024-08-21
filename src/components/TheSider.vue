<template>
  <div id="sider-container" style="margin-top: 40px">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      id="sider-component"
      class="relative"
      :trigger="null"
      style="background: #fff; padding: 0"
    >
      <div class="logo hidden sm:block"></div>

      <a-menu
        v-model:selectedKeys="siderSelectedKeys"
        v-model:openKeys="siderOpenKeys"
        theme="light"
        mode="inline"
        triggerSubMenuAction="click"
        class="fixed z-2 max-w-[210px] h-100"
      >
        <a-menu-item
          class="trigger mb-3 border-b-[1px]"
          @click="() => (collapsed = !collapsed)"
        >
          <div class="flex align-items-center">
            <MenuFoldOutlined />
            <span class="">Menu</span>
          </div>
        </a-menu-item>
        <a-menu-item key="1">
          <div class="flex align-items-center">
            <router-link :to="{ name: 'manage-user' }"> </router-link>
            <PieChartOutlined />
            <span>Quản lý tài khoản</span>
          </div>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <div class="flex align-items-center">
              <FormOutlined />

              <span>Quản lý tin đăng</span>
            </div>
          </template>
          <a-menu-item key="2" class="hover-text">
            <router-link :to="{ name: 'admin-post-create' }"> </router-link>
            Đăng mới</a-menu-item
          >
          <a-menu-item key="3" class="hover-text">
            <router-link :to="{ name: 'admin-post-list' }"> </router-link>
            Danh sách tin</a-menu-item
          >
          <a-menu-item key="4" class="hover-text">
            <router-link :to="{ name: 'admin-post-browse' }"> </router-link>
            Duyệt tin</a-menu-item
          >
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <div class="flex align-items-center">
              <UserOutlined />
              <span>Quản lý khách hàng</span>
            </div>
          </template>
          <!-- <a-menu-item key="7" class="hover-text">
						<router-link :to="{ name: 'admin-client-create' }">
						</router-link>
						Thêm mới</a-menu-item
					> -->

          <a-menu-item key="8" class="hover-text">
            <router-link :to="{ name: 'admin-client-list' }"> </router-link>
            Danh sách khách hàng</a-menu-item
          >
        </a-sub-menu>
        <a-menu-item key="10">
          <div class="flex align-items-center">
            <router-link :to="{ name: 'admin-client-report' }"> </router-link>
            <FileSearchOutlined />
            <span>Báo cáo dẫn khách </span>
          </div>
        </a-menu-item>
        <a-menu-item v-if="store.user.role_id == 1" key="9">
          <div class="flex align-items-center">
            <router-link :to="{ name: 'admin-config' }"> </router-link>
            <SettingOutlined />
            <span>Cấu hình</span>
          </div>
        </a-menu-item>
        <a-menu-item key="5">
          <div class="flex align-items-center" @click="showChildrenDrawer">
            <AccountBookOutlined />
            <span>Thông tin tài khoản</span>
          </div>
        </a-menu-item>
        <a-menu-item key="6">
          <div class="flex align-items-center" @click="onLogout">
            <LogoutOutlined />
            <span>Đăng xuất</span>
          </div>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-drawer
      :open="childrenDrawer"
      title="Thông tin tài khoản"
      @close="onClose"
      :closable="false"
      placement="right"
      width="280"
    >
      <div class="px-3">
        <a-row>
          <a-col :span="24">
            <a-descriptions :column="1">
              <a-descriptions-item label="Tên">
                {{ store.user.name }}
              </a-descriptions-item>
              <a-descriptions-item label="Email">
                {{ store.user.email }}
              </a-descriptions-item>
              <a-descriptions-item label="Số điện thoại">
                {{ store.user.phone }}
              </a-descriptions-item>
              <a-descriptions-item label="Đơn vị công tác">
                {{ store.user.workunit }}
              </a-descriptions-item>
              <a-descriptions-item label="Mật khẩu" class="description-item">
                <span class="password-mask">********</span>
                <span class="change-password" @click="handleFormToggle"
                  >Thay đổi</span
                >
              </a-descriptions-item>
              <a-descriptions-item v-if="isFlag">
                <div class="">
                  <p v-html="error" class="alert alert-success"></p>
                  <form action="" @submit.prevent="submitFormPassWord">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Mật khẩu hiện tại"
                      v-model="currentPassword"
                    />
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Mật khẩu mới"
                      v-model="newPassword"
                    />
                    <button type="submit" class="main-btn">Lưu</button>
                  </form>
                </div>
              </a-descriptions-item>
              <a-descriptions-item label="Chức vụ">
                {{
                  store.user.role_id === 1
                    ? "Quản trị viên"
                    : store.user.role_id === 2
                    ? "Đầu chủ"
                    : store.user.role_id === 3
                    ? "Sale"
                    : store.user.role_id === 4
                    ? "Sale VIP"
                    : store.user.role_id === 5
                    ? "Đầu chủ VIP"
                    : "Quản trị viên thường"
                }}
              </a-descriptions-item>
              
            </a-descriptions>
          </a-col>
        </a-row>
      </div>
    </a-drawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import auth from "../stores/auth";
import {
  ReconciliationOutlined,
  PieChartOutlined,
  MenuFoldOutlined,
  AccountBookOutlined,
  LogoutOutlined,
  BarChartOutlined,
  PlusOutlined,
  UserOutlined,
  FormOutlined,
  FileSearchOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import router from "../router";
import logout from "../api/auth/logout";
import changePasswordAPI from "../api/users/changePassword.js";
const route = useRoute();

const menu = [
  {
    key: "1",
    icon: "PieChartOutlined",
    title: "Danh sách nhân sự",
    path: "admin",
  },
  {
    key: "sub1",
    icon: "UserOutlined",
    title: "Bài viết",
    children: [
      {
        key: "2",
        title: "Bài viết mới",
        path: "admin-post-create",
      },
      {
        key: "3",
        title: "Danh sách bài viết",
        path: "admin-post-list",
      },
      {
        key: "4",
        title: "Duyệt tin",
        path: "admin-post-browse",
      },
    ],
  },
  {
    key: "9",
    icon: "PieChartOutlined",
    title: "Cấu hình",
    path: "config",
  },
  {
    key: "2",
    icon: "PieChartOutlined",
    title: "Thông tin tài khoản",
    path: "admin",
  },
  // {
  // 	key: "sub2",
  // 	icon: "UserOutlined",
  // 	title: "Khách hàng",
  // 	children: [
  // 		{
  // 			key: "7",
  // 			title: "Khách hàng mới",
  // 			path: "admin-client-create",
  // 		},
  // 		{
  // 			key: "8",
  // 			title: "Danh sách khách hàng",
  // 			path: "admin-client-list",
  // 		},

  // 	],
  // },
];

const onLogout = async () => {
  const response = await logout();
  if (response.status === 200) {
    store.logout();
    router.push({ name: "login" });
  } else {
    if (response.status === 401) {
      console.warn(
        "Token hết hạn hoặc truy cập trái phép. Chuyển hướng đến trang đăng nhập."
      );
      store.logout();
      router.push({ name: "login" });
    } else {
      console.error("Lỗi đăng xuất:", response.data);
    }
  }
};

const siderSelectedKeys = ref();
const siderOpenKeys = ref();

const collapsed = ref(false);

const store = auth();

const childrenDrawer = ref(false);
const showChildrenDrawer = () => {
  childrenDrawer.value = true;
};
const isFlag = ref(false);

const handleFormToggle = () => {
  isFlag.value = !isFlag.value;
};
const currentPassword = ref("");
const newPassword = ref("");
const error = ref("");
// Hàm xử lý khi người dùng nhấn nút lưu
const submitFormPassWord = async () => {
  const formData = {
    id: store.user.id,
    current_password: currentPassword.value,
    new_password: newPassword.value,
  };

  try {
    const response = await changePasswordAPI.changePassword(formData);
    if (response && response.status === 200) {
      error.value = "Mật khẩu đã được thay đổi thành công";
    } else {
      error.value = "Đã xảy ra lỗi khi thay đổi mật khẩu";
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
const onClose = () => {
  childrenDrawer.value = false;
};
</script>

<style scoped>
#sider-container {
  background: #fff;
}

#sider-component .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="light"] .site-layout .site-layout-background {
  background: #f2f2f2;
}

.ant-layout .ant-layout-sider-children .ant-menu.ant-menu-inline-collapsed {
  width: 80px;
}
.ant-menu {
}
</style>
