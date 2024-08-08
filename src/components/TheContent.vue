<template>
    <!-- begin::Content -->
    <div class="bg-slate-50">
        <!-- begin::Content Container -->
        <div class="app-container" style="margin-top: 35px !important">
            <!-- begin::Content Wrapper -->
            <div class="">
                <router-view></router-view>
            </div>
            <!-- end::Content Wrapper -->
        </div>
        <!-- end::Content Container -->
    </div>
    <!-- end::Content -->
</template>
<script>
import ThePageHeader from "./ThePageHeader.vue";

export default {
    components: {
        ThePageHeader,
    },
};
</script>
<style></style>
