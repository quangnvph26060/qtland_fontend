<template >
    <div class="flex flex-col-reverse lg:flex-row w-screen h-screen">
        <!-- begin::Body -->
        <div class="flex bg-white lg:w-1/2 h-100 p-10">
            <!-- begin::Form -->
            <div
                class="d-flex n:mt-0 lg:mt-auto lg:mb-auto justify-center w-100"
            >
                <!-- begin::Wrapper -->
                <div class="w-[500px] p-10">
                    <!-- begin::Heading -->
                    <div class="mb-11">
                        <h1
                            class="text-gray-900 mb-3 font-bold text-center text-3xl"
                        >
                            {{ loginState ? "Đăng ký" : "Đăng nhập" }}
                        </h1>
                    </div>
                    <!-- end::Heading -->

                    <a-form
                        :model="formState"
                        name="normal_login"
                        class="login-form ml-auto mr-auto mt-4"
                        @finish="onFinish"
                        @finishFailed="onFinishFailed"
                        v-if="!loginState"
                    >
                        <a-form-item
                            name="username"
                            :rules="[
                                {
                                    required: true,
                                    message: 'Hãy nhập email!',
                                },
                                {
                                    min: 6,
                                    message: 'Email phải có ít nhất 6 ký tự!',
                                },
                                {
                                    max: 50,
                                    message: 'Email không được quá 50 ký tự!',
                                },
                                {
                                    pattern:
                                        /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                                    message: 'Email không hợp lệ!',
                                },
                            ]"
                        >
                            <a-input
                                v-model:value="formState.username"
                                placeholder="Email"
                                class="h-[40px]"
                            >
                            </a-input>
                        </a-form-item>

                        <a-form-item
                            name="password"
                            :rules="[
                                {
                                    required: true,
                                    message: 'Hãy nhập mật khẩu!',
                                },
                            ]"
                        >
                            <a-input-password
                                v-model:value="formState.password"
                                placeholder="Mật khẩu"
                                class="h-[40px]"
                            >
                            </a-input-password>
                            <p
                                class="m-0 text-[#ff4d4f] text-sm"
                                v-if="authInfo"
                            >
                                Thông tin đăng nhập không chính xác
                            </p>
                        </a-form-item>

                        <a-form-item>
                            <a
                                class="login-form-forgot text-[#0891b2] hover:text-[#22d3ee]"
                                href=""
                                >Quên mật khẩu</a
                            >
                        </a-form-item>

                        <a-form-item>
                            <a-button
                                :disabled="disabledLogin"
                                html-type="submit"
                                class="login-form-button mb-3 h-[40px] bg-[#8b3035]"
                                :class="
                                    disabledLogin ? 'text-black' : 'text-white'
                                "
                                @click="onLogin"
                            >
                                Đăng nhập
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
                <!-- end::Wrapper -->
            </div>
            <!-- end::Form -->
        </div>
        <!-- end::Body -->
        <div
            class="flex bg-[#8b3035] justify-center align-items-center grow n:h-[100px] lg:h-screen"
        >
            <img
                src="../assets/background/login_background.jpg"
                alt="Logo"
                class="app-header-logo-image lg:w-100 lg:h-[100vh] xs:w-[100px] xs:h-100"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import auth from "../stores/auth";
import login from "../api/auth/login";
import createUserAPI from "../api/users/createUser";

import router from "../router";
import { message } from "ant-design-vue";

const loginState = ref(false);
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
            if (loginUser.data.role_id == 1) {
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

function capitalizeFirstLetter(name) {
    if (!name || name.length === 0) return name;
    return name
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

const disabledLogin = computed(() => {
    return !(formState.username && formState.password);
});
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
</style>