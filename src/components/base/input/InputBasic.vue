<template>
    <div class="mb-3">
        <!-- begin::Label -->
        <div class="required form-label">
            {{ title }}
        </div>
        <!-- end::Label -->

        <!-- begin::Input -->
        <a-input
            v-if="inputType === 'text'"
            @input="() => emits('input', valueText)"
            :placeholder="placeholder"
            v-model:value="valueText"
        />
        <a-input-number
            class="w-100"
            v-if="inputType === 'number'"
            @input="() => emits('input', valueText)"
            :formatter="
                (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            :placeholder="placeholder"
            v-model:value="valueText"
        />
        <!-- end::Input -->
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    title: String,
    placeholder: String,
    value: {
        type: String,
        default: "",
    },
    inputType: {
        type: String,
        default: "text",
    },
    required: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(["input"]);

const valueText = ref(props.value);
watch(
    () => props.value,
    (newValue, oldValue) => {
        if (newValue) {
            valueText.value = newValue;
        }
    }
);
</script>

<script>
</script>
<style></style>
