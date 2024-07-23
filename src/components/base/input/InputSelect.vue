<template>
	<!-- begin::Label -->
	<div class="form-label">{{ title }}</div>
	<!-- end::Label -->

	<!-- begin::Select -->
	<a-select
		class="mb-2 w-100 flex justify-between align-items-center"
		:options="options"
		v-model:value="valueSelect"
		@change="() => emits('update:selected', valueSelect)"
		allowClear
		:placeholder="props.placeholder"
	></a-select>
	<!-- end::Select -->
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
	title: String,
	valueSelected: {
		type: String,
		default: null,
	},
	options: Array,
	placeholder: String,
});

const emits = defineEmits(["update:selected"]);

const valueSelect = ref(
	props.valueSelected !== "" ? props.valueSelected : null
);

watch(
	() => props.valueSelected,
	(newValue, oldValue) => {
		if (newValue) {
			valueSelect.value = newValue;
		}
	}
);
</script>

<style></style>
