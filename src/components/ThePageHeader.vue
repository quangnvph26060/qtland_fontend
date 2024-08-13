<template>
    <div class="toolbar">
        <!-- begin::Toolbar Wrapper -->
        <div class="app-toolbar-wrapper">
            <!-- begin::Page Title -->
            <div class="page-title">
                <router-link v-for="(breadcrumb, index) in routes" :key="index" :to="breadcrumb.path">
            {{ breadcrumb.breadcrumbName }} /
           
            </router-link>
            </div>
            <!-- end::Page Title -->
        </div>
        <!-- end::Toolbar Wrapper -->
    </div>
    <hr>
</template>

<script setup>
const props = defineProps(
    {
        title: String,
        default: "Page Title",
    },
    {
        breadcrumb: String,
        default: "Breadcrumb",
    }
);

const routes = [
    {
        path: "/",
        breadcrumbName: "Home",
    },
    {
        path: "#",
        breadcrumbName: "Chi tiết",
    },
];
</script>
<style >
.toolbar{
    margin-bottom: 20px !important;
}
</style>


