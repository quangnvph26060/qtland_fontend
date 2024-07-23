<template>
    <div class="toolbar">
        <!-- begin::Toolbar Wrapper -->
        <div class="app-toolbar-wrapper">
            <!-- begin::Page Title -->
            <div class="page-title">
                <a-page-header
                    :title="title"
                    :breadcrumb="{ routes }"
                    sub-title=""
                    class="px-0 border-y-[1px]"
                />
            </div>
            <!-- end::Page Title -->
        </div>
        <!-- end::Toolbar Wrapper -->
    </div>
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
        path: "first",
        breadcrumbName: "Chi tiết",
    },
];
</script>


