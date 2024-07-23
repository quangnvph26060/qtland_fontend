<template>
    <div class="w-100">
        <!-- begin::Form -->
        <div class="flex flex-col xl:flex-row w-100">
            <!-- begin::Main Column -->
            <div
                class="flex flex-col col-12 col-xl-4 gap-3 gap-lg-5"
                style="background-color: white"
            >
                <TheMainColumn />
            </div>
            <!-- end::Main Column -->

            <!-- begin::Detail Column -->
            <div
                class="flex flex-col col-12 col-xl-8 gap-7 gap-lg-10 px-4"
                style="background-color: white"
            >
                <TheDetailColumn />
            </div>
            <!-- end::Detail Column -->
        </div>
        <!-- end::Form -->
    </div>
</template>

<script setup>
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
import Comment from "../../../components/base/comment/Comment.vue";
import InputBasic from "../../../components/base/input/InputBasic.vue";
import InputSelect from "../../../components/base/input/InputSelect.vue";
import Card from "../../../components/base/card/Card.vue";
import TheMainColumn from "../../../components/layout/column/TheMainColumn.vue";
import TheDetailColumn from "../../../components/layout/column/TheDetailColumn.vue";

export default {
    components: {
        ThePageHeader,
        Comment,
        InputBasic,
        InputSelect,
        Card,
        TheMainColumn,
        TheDetailColumn,
    },
};
</script>
<style></style>
