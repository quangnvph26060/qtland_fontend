<template>
    <div class="mb-3">
        <!-- begin::Label -->
        <div class="required form-label">
            {{ title }}
        </div>
        <!-- end::Label -->

        <!-- begin::Input -->
        <div>
            <a-input-group>
                <a-textarea
                    :placeholder="placeholder"
                    :rows="rows"
                    v-model:value="content"
                    :style="{
                        width:
                            type === 'comment' ? 'calc(100% - 46px)' : '100%',
                    }"
                    @input="() => emits('input', content)"
                />
                <a-button
                    class="absolute h-100 bg-[#8b3035] hover:bg-[#b3484d]"
                    :class="content.length === 0 ? 'text-black' : 'text-white'"
                    @click="onsubmit"
                    v-if="type == 'comment'"
                    :disabled="content.length === 0"
                >
                    <SendOutlined />
                </a-button>
            </a-input-group>
        </div>
        <!-- end::Input -->
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { SendOutlined } from "@ant-design/icons-vue";

const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    rows: {
        type: Number,
        default: 4,
    },
    type: {
        type: String,
        default: "input",
    },
    value: {
        type: String,
        default: "",
    },
});

const emits = defineEmits(["submitComment", "input"]);
const content = ref(props.value);
watch(
    () => props.value,
    () => (content.value = props.value)
);

const onsubmit = () => {
    emits("submitComment", content.value);
    content.value = "";
};
</script>

<script>
export default {};
</script>
<style>
</style>
