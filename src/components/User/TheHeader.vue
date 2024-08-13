<template>
  <!-- begin::Header -->
  <div class="app-header">
    <!-- begin::Header Container -->
    <div
      class="app-container fixed-top z-10 bg-primary-white-color mr-auto ml-auto"
    >
      <!-- begin::Header Wrapper -->
      <div class="flex justify-between w-[100%] h-[100px]">
        <!-- begin::Logo -->
        <div class="app-header-logo flex align-items-center gap-2 w-100">
          <div @click="handleLogoClick" class="cursor-pointer">
            <!-- begin::Logo Image -->
            <img
              style="width: 200px"
              :src="logo"
              alt="Logo"
              class="app-header-logo-image w-[100px] h-[64px]"
            />
            <!-- end::Logo Image -->
          </div>
          <div
            style="flex: 1"
            class="n:px-2 md:px-0 hidden sm:block"
            v-if="store.user.role_id == 3 || store.user.role_id == 4"
          >
            <div id="header_rank">
              <a
                v-for="(item, index) in rankroom.filter(
                  (item) =>
                    store.user.role_id == 4 ||
                    (store.user.role_id == 3 &&
                      (item.value === 3 || item.value === 4))
                )"
                :key="index"
                @click="selectClassRank(item.value)"
              >
                {{ item.label }}
              </a>
            </div>
          </div>
        </div>
        <!-- end::Logo -->
        <!-- end:: Menu Wrapper -->
        <!-- begin::Control Menu -->
        <div class="app-header-control-menu flex align-items-center">
          <!-- begin::Control Menu Item -->
          <div class="app-control-menu-item">
            <!-- begin::Authenticated -->
            <div class="flex align-items-center divide-x" v-if="store.token">
              <!-- begin::Drawer -->
              <div
                class="n:px-2 md:px-4 block sm:hidden"
                v-if="store.user.role_id == 1 || store.user.role_id == 6 "
              >
                <TheMenu />
              </div>

              <div class="n:px-2 md:px-4 hidden sm:block">
                <a-dropdown :placement="'bottomLeft'" trigger="click">
                  <template #overlay>
                    <a-menu>
                      <a-menu-item
                        key="1"
                        v-if="
                          store.user.role_id == 2 || store.user.role_id == 5
                        "
                        class="py-2"
                      >
                        <div class="inline-flex items-center mr-3">
                          <BarChartOutlined />
                        </div>
                        <div class="inline-flex">Quản lý tin đăng</div>
                        <router-link
                          :to="{ name: 'post-manage' }"
                        ></router-link>
                      </a-menu-item>
                      <a-menu-item key="4">
                        <a-button
                          class="h-[36px] w-100 flex align-items-center border-none p-0"
                          :icon="h(AccountBookOutlined)"
                          @click="showAvatarModal"
                        >
                          Thay đổi ảnh đại diện
                        </a-button>
                        <a-modal
                          v-model:open="isAvatarModalVisible"
                          title="Ảnh đại diện"
                          @ok="handleAvatarOk"
                          @cancel="handleAvatarCancel"
                        >
                          <div id="info_user" style="display: flex; j">
                            <!-- Chọn ảnh mới -->

                            <a-upload
                              style="text-align: center"
                              list-type="picture-card"
                              :show-upload-list="false"
                              :before-upload="beforeUpload"
                            >
                              <img
                                v-if="store.user.avatar"
                                :src="store.user.avatar"
                                alt="avatar"
                                style="width: 100%; height: 100%"
                              />
                            </a-upload>
                            <a-upload
                              style="text-align: center"
                              name="avatar"
                              list-type="picture-card"
                              :show-upload-list="false"
                              :before-upload="beforeUpload"
                            >
                              <img
                                v-if="avatarUrl"
                                :src="avatarUrl"
                                alt="avatar"
                                style="width: 100%; height: 100%"
                              />
                              <div v-else>
                                <a-icon
                                  :type="uploading ? 'loading' : 'plus'"
                                />
                                <div style="margin-top: 8px">Upload</div>
                              </div>
                            </a-upload>
                          </div>
                        </a-modal>
                      </a-menu-item>

                      <a-menu-item key="2">
                        <a-button
                          class="h-[36px] w-100 flex align-items-center border-none p-0"
                          :icon="h(AccountBookOutlined)"
                          @click="showAccountModal"
                        >
                          Thông tin tài khoản
                        </a-button>
                        <a-modal
                          v-model:open="isAccountModalVisible"
                          title="Thông tin người dùng"
                          @ok="handleAccountOk"
                          @cancel="handleAccountCancel"
                        >
                          <div id="info_user">
                            <p>Tên người dùng: {{ store.user.name }}</p>
                            <p>Email: {{ store.user.email }}</p>
                            <div class="d-flex justify-content-between ">
                              <p>Mật khẩu: ******** </p>
                              <span class="main_password" @click="handleFormToggle">Thay đổi mật khẩu</span>
                            </div>
                            <div v-if="isFlag">
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
                            <p>Số điện thoại: {{ store.user.phone }}</p>
                            <p>Đơn vị công tác: {{ store.user.workunit }}</p>
                            <p>
                              Chức vụ:
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
                                  ? "Đàu chỉ VIP"
                                  : "Quản trị viên thường"
                              }}
                            </p>
                          </div>
                        </a-modal>
                      </a-menu-item>
                      <a-menu-item key="3" @click="onLogout">
                        <div class="inline-flex items-center mr-3">
                          <LogoutOutlined />
                        </div>
                        <div class="inline-flex">Đăng xuất</div>
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <div
                    class="flex justify-center items-center cursor-pointer"
                    style="min-width: 300px"
                  >
                    <a-avatar
                      size="large"
                      class="me-2 avatar-container"
                      :style="{
                        backgroundColor: store.user.avatar
                          ? 'transparent'
                          : '#ADC178',
                        verticalAlign: 'middle',
                      }"
                    >
                      <!-- Hiển thị ảnh avatar nếu có -->
                      <template v-if="store.user.avatar">
                        <img
                          :src="store.user.avatar"
                          alt="avatar"
                          class="avatar-img"
                        />
                      </template>
                      <!-- Hiển thị chữ cái đầu tiên của tên người dùng nếu không có avatar -->
                      <template v-else>
                        <span class="avatar-text">{{
                          store.user.name[0]
                        }}</span>
                      </template>
                    </a-avatar>
                    <div class="d-none d-sm-block">
                      {{ store.user.name }}
                    </div>
                    <div class="mx-2">
                      <DownOutlined />
                    </div>
                  </div>
                </a-dropdown>
              </div>
              <!-- end::User Feature -->
              <!-- begin::Create Post -->
              <div
                class="n:px-2 md:px-4 hidden sm:block"
                v-if="store.user.role_id == 2 || store.user.role_id == 5"
              >
                <router-link :to="{ name: 'post-create' }">
                  <a-button class=""> Đăng tin </a-button>
                </router-link>
              </div>
              <div
                class="n:px-2 md:px-4 hidden sm:block"
                v-if="store.user.role_id == 3 || store.user.role_id == 4"
              >
                <router-link :to="{ name: 'client-report' }">
                  <a-button class=""> Báo cáo dẫn khách </a-button>
                </router-link>
              </div>
              <div
                class="n:px-2 md:px-4"
                :class="store.user.role_id == 1 || store.user.role_id == 6   ? 'hidden' : 'sm:hidden'"
              >
                <a-button
                  @click="showDrawer"
                  :icon="h(PicCenterOutlined)"
                  size="large"
                  class="flex justify-center align-items-center border-none"
                ></a-button>
                <a-drawer
                  placement="right"
                  :closable="false"
                  :open="open"
                  :width="240"
                  @close="onClose"
                >
                  <div class="flex flex-col space-y-4 p-4">
                    <div class="flex align-items-center cursor-pointer">
                      <a-avatar
                        size="large"
                        class="me-2 avatar-container"
                        :style="{
                          backgroundColor: store.user.avatar
                            ? 'transparent'
                            : '#ADC178',
                          verticalAlign: 'middle',
                        }"
                      >
                        <!-- Hiển thị ảnh avatar nếu có -->
                        <template v-if="store.user.avatar">
                          <img
                            :src="store.user.avatar"
                            alt="avatar"
                            class="avatar-img"
                          />
                        </template>
                        <!-- Hiển thị chữ cái đầu tiên của tên người dùng nếu không có avatar -->
                        <template v-else>
                          <span class="avatar-text">{{
                            store.user.name[0]
                          }}</span>
                        </template>
                      </a-avatar>
                      <div>
                        {{ store.user.name }}
                      </div>
                    </div>
                    <div
                      v-if="store.user.role_id == 2 || store.user.role_id == 5"
                    >
                      <router-link :to="{ name: 'post-create' }">
                        <a-button
                          class="w-100 h-[40px]"
                          type="primary"
                          @click="onClose"
                        >
                          Đăng tin
                        </a-button>
                      </router-link>
                    </div>
                    <div v-if="store.user.role_id == 3">
                      <router-link :to="{ name: 'client-report' }">
                        <a-button
                          class="w-100 h-[40px]"
                          type="primary"
                          @click="onClose"
                        >
                          Báo cáo dẫn khách
                        </a-button>
                      </router-link>
                    </div>
                    <div style="padding: 4px 15px">
                      <a-button
                        class="h-[36px] w-100 flex align-items-center border-none p-0"
                        :icon="h(AccountBookOutlined)"
                        @click="showAvatarModal"
                      >
                        Thay đổi ảnh đại diện
                      </a-button>
                      <a-modal
                        v-model:open="isAvatarModalVisible"
                        title="Ảnh đại diện"
                        @ok="handleAvatarOk"
                        @cancel="handleAvatarCancel"
                      >
                        <div id="info_user" style="display: flex; j">
                          <!-- Chọn ảnh mới -->

                          <a-upload
                            style="text-align: center"
                            list-type="picture-card"
                            :show-upload-list="false"
                            :before-upload="beforeUpload"
                          >
                            <img
                              v-if="store.user.avatar"
                              :src="store.user.avatar"
                              alt="avatar"
                              style="width: 100%; height: 100%"
                            />
                          </a-upload>
                          
                          <a-upload
                            style="text-align: center"
                            name="avatar"
                            list-type="picture-card"
                            :show-upload-list="false"
                            :before-upload="beforeUpload"
                          >
                            <img
                              v-if="avatarUrl"
                              :src="avatarUrl"
                              alt="avatar"
                              style="width: 100%; height: 100%"
                            />
                            <div v-else>
                              <a-icon :type="uploading ? 'loading' : 'plus'" />
                              <div style="margin-top: 8px">Upload</div>
                            </div>
                          </a-upload>
                        </div>
                      </a-modal>
                    </div>
                    <div>
                      <router-link
                        :to="{
                          name:
                            store.user.role_id === 1
                              ? 'admin-post-list'
                              : 'post-manage',
                        }"
                      >
                        <a-button
                          v-if="
                            store.user.role_id === 5 || store.user.role_id == 2
                          "
                          class="h-[36px] w-100 flex align-items-center border-none"
                          :icon="h(ScheduleOutlined)"
                          @click="onClose"
                        >
                          Danh sách tin
                        </a-button>
                      </router-link>
                      <a-button
                        class="h-[36px] w-100 flex align-items-center border-none"
                        :icon="h(AccountBookOutlined)"
                        @click="showChildrenDrawer"
                      >
                        Thông tin tài khoản
                      </a-button>
                      <a-drawer
                        v-model:open="childrenDrawer"
                        :closable="false"
                        width="280"
                      >
                        <div class="px-3" style="padding-top: 20px">
                          <a-row>
                            <a-col :span="24">
                              <a-descriptions title="Thông tin cá nhân">
                                <a-descriptions-item label="Tên">
                                  {{ store.user.name }}
                                </a-descriptions-item>
                                <a-descriptions-item label="Email">
                                  {{ store.user.email }}
                                </a-descriptions-item>
                                <a-descriptions-item label="Số điện thoại">
                                  {{ store.user.phone }}
                                </a-descriptions-item>
                                <a-descriptions-item label="Đơn vị công tac">
                                  {{ store.user.workunit }}
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

                    <a-button
                      class="h-[36px] w-100 flex align-items-center border-none"
                      @click="onLogout"
                    >
                      Đăng xuất
                    </a-button>
                  </div>
                </a-drawer>
              </div>
              <!-- end::Create Post -->
            </div>
            <!-- end::Authenticated -->
          </div>
          <!-- end::Control Menu Item -->
        </div>
        <!-- end::Control Menu -->
      </div>
      <!-- end::Header Wrapper -->
    </div>
    <!-- end::Header Container -->
  </div>
  <!-- end::Header -->
</template>
  
  
  <script setup>
import { ref, h, onMounted, watch, reactive } from "vue";
import {
  NotificationOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  BarChartOutlined,
  InfoOutlined,
  ScheduleOutlined,
  AccountBookOutlined,
  MenuFoldOutlined,
  PicCenterOutlined,
} from "@ant-design/icons-vue";
// import router from "../../router";
import auth from "../../stores/auth";
import { filterRange } from "../../stores/filterRange";
import logout from "../../api/auth/logout";
import Config from "../../api/config/config.js";
import { useRouter, useRoute } from "vue-router";
import updateUserAPI from "../../api/users/avatar.js";
import changePasswordAPI from "../../api/users/changePassword.js";
const isModalVisible = ref(false);

const user = ref({
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  phone: "0123456789",
});

const isAvatarModalVisible = ref(false);
const isAccountModalVisible = ref(false);
const store = auth();
const avatarUrl = ref(store.user.avatar);
const uploading = ref(false);

const showAvatarModal = () => {
  isAvatarModalVisible.value = true;
};

// const handleAvatarOk = () => {
//   console.log("Đã chọn ảnh:", avatarUrl.value);
//   isAvatarModalVisible.value = false;
// };

// Tạo biến trạng thái
const isFlag = ref(false);


const handleFormToggle = () => {
  isFlag.value = !isFlag.value;
};


const currentPassword = ref('');
const newPassword = ref('');
const error = ref('');
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
       error.value = 'Mật khẩu đã được thay đổi thành công';
    } else {
      error.value = 'Đã xảy ra lỗi khi thay đổi mật khẩu';
    }
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
  }
};
const handleAvatarOk = async () => {
  if (avatarUrl.value) {
    try {
      uploading.value = true;

      // Chuyển đổi base64 thành đối tượng Blob
      const base64Data = avatarUrl.value.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });

      // Tạo FormData và thêm file vào
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("id", store.user.id);

      // Gửi dữ liệu đến server (đổi URL cho phù hợp)
      const response = await updateUserAPI.updateUser(formData);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi cập nhật ảnh:", error);
    } finally {
      uploading.value = false;
      isAvatarModalVisible.value = false;
    }
  } else {
    isAvatarModalVisible.value = false;
  }
};

// const handleAvatarCancel = () => {
//   isAvatarModalVisible.value = false;
// };
const handleAvatarCancel = () => {
  // Xóa ảnh vừa upload
  avatarUrl.value = null;
  isAvatarModalVisible.value = false;
};

const showAccountModal = () => {
  isAccountModalVisible.value = true;
};

const handleAccountOk = () => {
  console.log("Đã đóng thông tin tài khoản");
  isAccountModalVisible.value = false;
};

const handleAccountCancel = () => {
  isAccountModalVisible.value = false;
};

const beforeUpload = (file) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    avatarUrl.value = reader.result;
  });
  reader.readAsDataURL(file);
  return false;
};
const route = useRoute();
const postId = ref(null);

const updatePostId = () => {
  if (route.path.startsWith("/post-detail")) {
    postId.value = route.params.id || null;
  } else {
    postId.value = null;
  }
};

onMounted(() => {
  updatePostId();
});

watch(
  () => route.path,
  () => {
    updatePostId();
  },
  { immediate: true }
);

const { getconfig, responseConfig, updateConfig } = Config();
const logo = ref(null);
onMounted(async () => {
  await getconfig();
  const configData = responseConfig.data;

  if (configData) {
    logo.value = configData.logo;
  }
});

// const store = auth();

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

const storeclass = filterRange();
const { setClassRank } = storeclass;
const router = useRouter();

const rankroom = [
  { value: 1, label: "Văn phòng hạng A" },
  { value: 2, label: "Văn phòng hạng B" },
  { value: 3, label: "Văn phòng hạng C" },
  { value: 4, label: "Văn phòng hạng Coworking" },
];

const selectClassRank = async (classrank) => {
  storeclass.setClassRank(classrank);
  router.push({
    name: "post-list",
    query: {
      ...router.currentRoute.value.query,
      classrank: classrank,
    },
  });
};

const filterStore = filterRange();
const handleLogoClick = () => {
  filterStore.resetFilters();
  const userRole = store.user.role_id;

  if (userRole == 1) {
    router.push({ name: "admin-post-list" });
  } else {
    router.push({ name: "post-list" });
  }
};
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};

const childrenDrawer = ref(false);
const showChildrenDrawer = () => {
  childrenDrawer.value = true;
};
</script>
  
  <script>
import TheMenu from "../TheMenu.vue";
export default {};
</script>
  
<style>
.form-control {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
#info_user {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  max-width: 500px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.info-item {
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 1.6;
  color: #333;
}

.info-label {
  font-weight: 600;
  color: #007bff;
}

.info-item:last-child {
  margin-bottom: 0;
}

#info_user p {
  display: flex;
  align-items: center;
  padding: 5px 0px;
}

#info_user p span {
  min-width: 150px; /* Đảm bảo các tiêu đề đồng đều về chiều rộng */
}
.avatar-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.avatar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ant-avatar-string {
  width: 59px !important;
  height: 85px !important;
}

/* Định dạng chữ cái đầu tiên */
.avatar-text {
  font-size: 24px;
  color: white;
  text-align: center;
  line-height: 64px;
}
.main_password{
  font-size: 10px;
  cursor: pointer;
}
.main-btn{
  float:right;
  background: #8b3035 ;
  color:#fff;
  font-size: 14px;
  height: 32px;
  padding: 4px 15px;
  border-radius: 6px;
}
</style>
  