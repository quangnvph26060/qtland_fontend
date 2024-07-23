<template>
    <div>
        <a-layout>
            <TheSider class="hidden sm:block" />
            <a-layout class="min-h-screen">
                <a-layout-header style="background: #fff; padding: 0">
                    <TheHeader />
                </a-layout-header>
                <a-layout-content>
                    <TheContent class="" />
                </a-layout-content>

                <a-layout-footer class="text-center bg-[#]" :style="footerStyle">
                    <div class="text-white text-lg">
                        Chiến binh QTLAND
                    </div>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script setup>
import { ref, h } from "vue";

const footerStyle = {
    textAlign: "center",
    minHeight: 64,
    color: "#fff",
    backgroundColor: "#8b3035",
};
</script>

<script>
import TheSider from "../components/TheSider.vue";
import TheHeader from "../components/User/TheHeader.vue";
import TheContent from "../components/TheContent.vue";

export default {
    components: {
        TheSider,
        TheHeader,
        TheContent,
    },
};
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}
</style>
