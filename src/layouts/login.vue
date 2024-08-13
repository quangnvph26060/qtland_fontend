<template>
  <div
    class="flex flex-col-reverse lg:flex-row w-screen h-screen layout_main_mobi"
  >
    <!-- begin::Body -->
    <div class="flex bg-white lg:w-1/2 h-100">
      <!-- begin::Form -->
      <div class="d-flex n:mt-0 lg:mt-auto lg:mb-auto justify-center w-100">
        <!-- begin::Wrapper -->
        <div class="w-[500px] p-10">
          <!-- begin::Heading -->
          <div class="mb-11">
            <h1 class="text-gray-900 mb-3 font-bold text-center text-3xl">
              {{
                forgotPassword
                  ? "Quên mật khẩu"
                  : loginState
                  ? "Đăng ký"
                  : "Đăng nhập"
              }}
            </h1>
          </div>
          <!-- end::Heading -->

          <a-form
            v-if="!forgotPassword && !loginState"
            :model="formState"
            name="normal_login"
            class="login-form ml-auto mr-auto mt-4"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item
              name="username"
              :rules="[
                { required: true, message: 'Hãy nhập email!' },
                { min: 6, message: 'Email phải có ít nhất 6 ký tự!' },
                { max: 50, message: 'Email không được quá 50 ký tự!' },
                {
                  pattern: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                  message: 'Email không hợp lệ!',
                },
              ]"
            >
              <a-input
                v-model:value="formState.username"
                placeholder="Email"
                class="h-[40px]"
              />
            </a-form-item>

            <a-form-item
              name="password"
              :rules="[{ required: true, message: 'Hãy nhập mật khẩu!' }]"
            >
              <a-input
                v-model:value="formState.password"
                type="password"
                placeholder="Mật khẩu"
                class="h-[40px]"
              />
              <p class="m-0 text-[#ff4d4f] text-sm" v-if="authInfo">
                Thông tin đăng nhập không chính xác
              </p>
            </a-form-item>

            <a-form-item>
              <a
                class="login-form-forgot text-[#0891b2] hover:text-[#22d3ee]"
                href="#"
                @click.prevent="showForgotPassword"
              >
                Quên mật khẩu
              </a>
            </a-form-item>

            <a-form-item>
              <a-button
                :disabled="disabledLogin"
                html-type="submit"
                class="login-form-button mb-3 h-[40px] bg-[#8b3035]"
                :class="disabledLogin ? 'text-black' : 'text-white'"
                @click="onLogin"
              >
                Đăng nhập
              </a-button>
            </a-form-item>
          </a-form>

          <a-form
            v-if="forgotPassword"
            @finish="onForgotPassword"
            class="login-form ml-auto mr-auto mt-4"
          >
            <a-form
              :model="forgotPasswordState"
              name="forgot_password"
              class="forgot-password-form ml-auto mr-auto mt-0"
              @finish="onFinishForgotPassword"
              @finishFailed="onFinishFailedForgotPassword"
            >
              <a-form-item
                name="email"
                :rules="[
                  {
                    required: true,
                    message: 'Hãy nhập email!',
                  },
                  {
                    pattern:
                      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                    message: 'Email không hợp lệ!',
                  },
                ]"
              >
                <a-input
                  v-model:value="forgotPasswordState.email"
                  placeholder="Email"
                  class="h-[40px]"
                >
                </a-input>
              </a-form-item>

              <a-form-item style="margin: 0px !important" class="submit">
                <a-button
                  html-type="submit"
                  class="forgot-password-form-button h-[40px] bg-[#8b3035] text-white"
                >
                  Gửi yêu cầu
                </a-button>
              </a-form-item>
            </a-form>

            <a-form-item>
              <a
                class="login-form-forgot text-[#0891b2] hover:text-[#22d3ee]"
                href="#"
                @click.prevent="showLoginForm"
              >
                Quay lại đăng nhập
              </a>
            </a-form-item>
          </a-form>
        </div>
        <!-- end::Wrapper -->
      </div>
      <!-- end::Form -->
    </div>
    <!-- end::Body -->
    <div
      id="banner-1"
      class="flex justify-center align-items-center grow n:h-[100px] lg:h-screen"
    >
      <img
        src="../assets/background/login_background.jpg"
        alt="Logo"
        class="app-header-logo-image lg:w-100 lg:h-[100vh] xs:w-[100px] xs:h-100"
        width="100%"
      />
    </div>
    <div
      id="banner-2"
      class="flex justify-center align-items-center grow n:h-[140px] lg:h-screen"
    >
      <img
        src="../assets/background/login_background.jpg"
        alt="Logo"
        class="app-header-logo-image lg:w-100 lg:h-[100vh] xs:w-[100px] xs:h-120"
        width="100%"
        style="height: 120px; padding: 20px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import auth from "../stores/auth";
import login from "../api/auth/login";
import createUserAPI from "../api/users/createUser";
import Config from "../api/config/config.js";
import router from "../router";
import sendEmailPasswordAPI from "../api/users/emailpassword";
import { message } from "ant-design-vue";

async function updateTitle() {
  const { getconfig, responseConfig } = Config();
  await getconfig();
  const configData = responseConfig.data;

  const bannerImage = document.querySelector("#banner-2 img");
  if (bannerImage) {
    bannerImage.src =
      configData && configData.logo
        ? configData.logo
        : "../assets/background/login_background.jpg";
  }

  const banner = document.querySelector("#banner-1 img");
  if (banner) {
    banner.src =
      configData && configData.banner
        ? configData.banner
        : "../assets/background/login_background.jpg";
  }
}

updateTitle();
const loginState = ref(false);
const forgotPassword = ref(false);
const forgotPasswordState = reactive({
  email: "",
});

const changeForm = () => {
  loginState.value = !loginState.value;
};

const store = auth();
const authInfo = ref(false);

const formState = reactive({
  username: "",
  password: "",
});

const onFinish = (values) => {};
const onFinishFailed = (errorInfo) => {};

const onLogin = async () => {
  try {
    const loginUser = await login(formState.username, formState.password);

    if (loginUser.status == 200) {
      store.login(loginUser.data.token, loginUser.data);
      if (loginUser.data.role_id == 1 || loginUser.data.role_id == 6) {
        localStorage.setItem("role", "admin");
        await router.push({ name: "admin-post-list" });
        return;
      }
      await router.push({ name: "post-list" });
      authInfo.value = false;
    }
  } catch (error) {
    message.error("Sai tên đăng nhập hoặc mật khẩu");
    authInfo.value = true;
  }
};

const onForgotPassword = async () => {
  try {
    message.success(
      "Đã gửi yêu cầu quên mật khẩu. Vui lòng kiểm tra email của bạn."
    );
    forgotPassword.value = false;
  } catch (error) {
    message.error("Có lỗi xảy ra khi gửi yêu cầu.");
  }
};

const showForgotPassword = () => {
  forgotPassword.value = true;
};

const showLoginForm = () => {
  forgotPassword.value = false;
};

const disabledLogin = computed(() => {
  return !(formState.username && formState.password);
});

function generateRandomPassword() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

// Tạo mật khẩu và lưu trong một biến reactive
const randomPassword = ref(generateRandomPassword());

const onFinishForgotPassword = async (values) => {
  const email = values.email;

  const emailData = {
    email: email,
    password: randomPassword.value,
  };
  await sendEmailPasswordAPI(emailData);

  onForgotPassword();
};
</script>

<style scoped>
.login-form {
  max-width: 500px;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}

.register-form {
  max-width: 500px;
}

.register-form-button {
  width: 100%;
}
.ant-form-item:last-child {
  margin-top: 0px;
  margin-bottom: 0px;
}

@media (max-width: 768px) {
  .layout_main_mobi {
    padding: 20px;
    display: flex;
    align-items: stretch;
  }
}
</style>
