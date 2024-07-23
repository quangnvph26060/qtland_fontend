<template>
    <!-- begin::Content -->
    <div class="bg-slate-50">
        <!-- begin::Content Container -->
        <div class="app-container pt-[40px]">
            <!-- begin::Content Wrapper -->
            <div class="flex ml-auto mr-auto w-full xl:w-4/5">
                <router-view></router-view>
            </div>
            <!-- end::Content Wrapper -->
        </div>
        <!-- end::Content Container -->
    </div>
    <!-- end::Content -->
</template>

<script>
import ThePageHeader from "../ThePageHeader.vue";

export default {
    components: {
        ThePageHeader,
    },
};
</script>

<style scoped>

</style>
