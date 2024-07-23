<template>
    <div class="card p-4">
        <!-- begin::Card Header -->
        <div class="mb-3">
            <!-- begin::Card Title -->
            <span class="text-lg">{{ title }}</span>
            <!-- end::Card Title -->
        </div>
        <!-- end::Card Header -->
        <!-- begin::Card Body -->
        <div class="">
            <slot name="content"> </slot>
        </div>
        <!-- end::Card Body -->
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    title: String,
});

const valueSelected = ref(props.valueSelected);
</script>

<script>
export default {};
</script>
<style></style>
