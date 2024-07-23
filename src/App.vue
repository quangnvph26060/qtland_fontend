<template>
    <a-config-provider
        :theme="{
            token: {
                colorPrimary: data.colorPrimary,
                borderRadius: `${data.borderRadius}px`,
                fontFamily: 'system-ui',
            },
        }"
    >
        <div id="app">
            <router-view></router-view>
        </div>
    </a-config-provider>

    <!-- begin::Back to top -->
    <div class="back-to-top">
        <a-back-top :style="{ right: '6px' }">
            <template #icon>
                <ArrowUpOutlined />
            </template>
        </a-back-top>
    </div>
    <!-- end::Back to top -->
</template>


<script setup>
import { ArrowUpOutlined } from "@ant-design/icons-vue";
import getUserAPI from "./api/users/getUser";
import { ref } from "vue";
import { theme } from "ant-design-vue";
import auth from "./stores/auth";
import router from "./router";

// color theme
const defaultData = {
    borderRadius: 6,
    colorPrimary: "#DCA8AB",
};
const data = ref(defaultData);
const { token } = theme.useToken();

// auth
const store = auth();
const initializeApp = async () => {
    if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const user = await getUserAPI.getByToken(token);
        if (user) {
            store.login(token, user);
        } else {
            store.logout();
            router.push({ name: "login" });
        }
    } else {
        store.logout();
        router.push({ name: "login" });
    }
};

initializeApp();
</script>

<script>
export default {};
</script>

<style>
</style>
