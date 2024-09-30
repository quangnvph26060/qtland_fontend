<template>
  <div>
    <a-drawer
      title="Menu"
      :placement="placement"
      :closable="false"
      :open="openSidebar"
      @close="onCloseSidebar"
      :width="220"
    >
      <a-menu
        v-model:selectedKeys="siderSelectedKeys"
        v-model:openKeys="siderOpenKeys"
        theme="light"
        mode="inline"
        triggerSubMenuAction="click"
      >
        <a-menu-item key="1" @click="onCloseSidebar">
          <router-link to="/admin/user">
            <div class="flex align-items-center">
              <PieChartOutlined />
              <span>Quản lý tài khoản</span>
            </div>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <div class="flex align-items-center">
              <ReconciliationOutlined />
              <span>Quản lý tin đăng</span>
            </div>
          </template>
          <a-menu-item key="2" @click="onCloseSidebar">
            <router-link :to="{ name: 'admin-post-create' }">
              <div>Đăng mới</div>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3" @click="onCloseSidebar">
            <router-link :to="{ name: 'admin-post-list' }">
              <div>Danh sách tin</div>
            </router-link>
          </a-menu-item>
          <a-menu-item key="4" @click="onCloseSidebar">
            <router-link :to="{ name: 'admin-post-browse' }">
              <div>Duyệt tin</div>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <div class="flex align-items-center">
              <UserOutlined />
              <span>Quản lý khách hàng</span>
            </div>
          </template>
          <a-menu-item key="8" @click="onCloseSidebar">
            <router-link :to="{ name: 'admin-client-list' }"> </router-link>
            Danh sách khách hàng</a-menu-item
          >
        </a-sub-menu>
        <a-menu-item key="10">
          <div class="flex align-items-center">
            <router-link :to="{ name: 'admin-client-report' }"> </router-link>
            <FileSearchOutlined />
            <span>Báo cáo dẫn khách</span>
          </div>
        </a-menu-item>
        <a-menu-item v-if="store.user.role_id == 1" key="9">
          <div @click="onCloseSidebar">
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
    </a-drawer>

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
            <a-descriptions title="Thông tin cá nhân" :column="1">
              <a-descriptions-item label="Tên">
                {{ store.user.name }}
              </a-descriptions-item>
              <a-descriptions-item label="Email">
                {{ store.user.email }}
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
                    ? "Sale VIP"
                    : "Quản trị viên thường"
                }}
              </a-descriptions-item>
              {{ store.user }}
              <div v-if="store.user.permissions[0]">
                <p>Quyền truy cập:</p>
                <select name="" id="">
                  <option value="" class="main-option-permission">
                    {{
                      +store.user?.permissions[0].access_permission_1 === 1
                        ? "Văn phòng hạng A"
                        : ""
                    }}
                  </option>

                  <option value="" class="main-option-permission">
                    {{
                      +store.user?.permissions[0].access_permission_2 === 2
                        ? "Văn phòng hạng B"
                        : ""
                    }}
                  </option>

                  <option value="" class="main-option-permission">
                    {{
                      +store.user?.permissions[0].access_permission_3 === 3
                        ? "Văn phòng hạng C"
                        : ""
                    }}
                  </option>

                  <option value="" class="main-option-permission">
                    {{
                      +store.user?.permissions[0].access_permission_4 === 4
                        ? "Văn phòng hạng D"
                        : ""
                    }}
                  </option>

                  <option value="" class="main-option-permission">
                    {{
                      +store.user?.permissions[0].access_permission_5 === 5
                        ? "Mặt bằng kinh doanh"
                        : ""
                    }}
                  </option>
                </select>
              </div>
            </a-descriptions>
          </a-col>
        </a-row>
      </div>
    </a-drawer>

    <a-button
      class="flex justify-center align-items-center border-none"
      @click="showSidebar"
      :icon="h(PicCenterOutlined)"
    >
    </a-button>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import {
  ReconciliationOutlined,
  PieChartOutlined,
  AntDesignOutlined,
  AccountBookOutlined,
  PicCenterOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
  FormOutlined,
  FileSearchOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import router from "../router";
import auth from "../stores/auth";
import logout from "../api/auth/logout";
import changePasswordAPI from "../api/users/changePassword.js";
const placement = ref("left");
const openSidebar = ref(false);
const showSidebar = () => {
  openSidebar.value = true;
};
const onCloseSidebar = () => {
  openSidebar.value = false;
};

const siderSelectedKeys = ref();
const siderOpenKeys = ref();

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

const onClose = () => {
  childrenDrawer.value = false;
};
</script>

<script>
export default {};
</script>
<style>
.ant-drawer .ant-drawer-body {
  padding: 0 !important;
}
.description-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.password-mask {
  margin-right: 10px;
}

.change-password {
  color: #007bff;
  cursor: pointer;
  transition: color 0.2s;
}

.change-password:hover {
  color: #0056b3;
}
.alert.alert-success:empty {
  display: none;
}
</style>
