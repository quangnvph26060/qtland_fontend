<template>
    <div class="w-100">
        <!-- begin::Form -->
        <div class="flex flex-col xl:flex-row w-100">
            
            <div id="addordetailpost"
                class="flex flex-col col-12 col-xl-9 gap-7 gap-lg-10 px-4"
                style="background-color: white;margin: 0px auto ;"
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
import TheDetailColumn from "../../../components/layout/report/TheDetailReport.vue";

export default {
    components: {
        ThePageHeader,
        Comment,
        InputBasic,
        InputSelect,
        Card,
        TheDetailColumn,
    },
};
</script>
<style></style>
