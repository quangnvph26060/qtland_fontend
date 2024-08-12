<template>
	<a-tooltip placement="bottom">
		<template #title>
			<span>Lọc thêm</span>
		</template>
		<div
			class="filter-item-content align-items-center"
			@click.prevent
			@click="setModalOptions(true)"
		>
			<FilterOutlined v-if="type !== 'admin'" />
			<div v-else>Trạng thái</div>
		</div>
	</a-tooltip>

	<a-modal
		v-model:open="modalOptions"
		okText="Tìm kiếm"
		cancelText="Đặt lại"
		class="top-1/5"
		title="Lọc thêm"
		@ok="handleSearchStatus"
		@cancel="resetFilters"
	>
		<div class="mt-3 w-50">
			<div class="flex flex-col">
				<div class="text-md font-semibold mb-3">Trạng thái thuê</div>
				<div class="flex flex-wrap">
					<label
						class="custom-checkbox me-2 mt-2"
						v-for="item in filterList"
						:key="item.value"
					>
						<input
							type="checkbox"
							:value="item.value"
							v-model="item.isChecked"
						/>
						<span>{{ item.name }}</span>
					</label>
				</div>
			</div>
		</div>

		<div class="mt-3 w-100">
			<div class="flex flex-col">
				<div class="text-md font-semibold mb-3">Độ ưu tiên</div>
				<div class="flex flex-wrap">
					<label
						class="custom-checkbox me-2 mt-2"
						v-for="item in priorityList"
						:key="item.value"
					>
						<input
							type="checkbox"
							:value="item.value"
							v-model="item.isChecked"
						/>
						<span>{{ item.name }}</span>
					</label>
				</div>
			</div>
		</div>
	</a-modal>
</template>

<script setup>
import { ref, reactive } from "vue";
import { FilterOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { filterRange } from "../../../stores/filterRange";

const props = defineProps({
	type: {
		type: String,
		default: "user",
	},
});

const router = useRouter();
const modalOptions = ref(false);
const setModalOptions = (open) => {
	modalOptions.value = open;
};

const filterRangeStore = filterRange();
const filterList = reactive([
	{
		value: 0,
		name: "Chưa thuê",
		isChecked: false,
	},
	{
		value: 1,
		name: "Đã thuê",
		isChecked: false,
	},
]);

const priorityList = reactive([
	{
		value: "tăng chào",
		name: "Tăng chào",
		isChecked: false,
	},
	{
		value: "giảm chào",
		name: "Giảm chào",
		isChecked: false,
	},
	{
		value: "hot",
		name: "Hot",
		isChecked: false,
	},
	{
		value: "không yêu cầu",
		name: "Không yêu cầu",
		isChecked: false,
	},
]);
const priorityrank = reactive([
	{
		value: 1,
		name: "văn phòng hạng A",
		
	},
	{
		value:2,
		name: "văn phòng hạng B",
		
	},
	{
		value: 3,
		name: "văn phòng hạng C",
		
	},
	{
		value: 4,
		name: "văn phòng hạng Coworking",
		
	},
]);

const collectFilterValues = (list) => {
	return list.filter((item) => item.isChecked).map((item) => item.value);
};
const collectFilterValuesRank = (list) => {
	return list.map(item => item.value);
};
const handleSearchStatus = () => {
	const soldStatus = collectFilterValues(filterList);
	const priorityStatus = collectFilterValues(priorityList);
	const classrank = collectFilterValuesRank(priorityrank);
	filterRangeStore.setClassRank(classrank);
	filterRangeStore.setSoldStatus(soldStatus);
	filterRangeStore.setPriorityStatus(priorityStatus);

	const query = {
		...router.currentRoute.value.query,
		sold_status: soldStatus,
		priority_status: priorityStatus,
		// classrank: classrank,
	};

	const routeName = props.type === "admin" ? "admin-post-list" : "post-list";
	router.push({
		name: routeName,
		query: query,
	});

	modalOptions.value = false;
};

const resetFilters = () => {
	filterList.forEach((item) => (item.isChecked = false));
	priorityList.forEach((item) => (item.isChecked = false));
	priorityrank.forEach((item) => (item.value = ''));
	filterRangeStore.setSoldStatus(null);
	filterRangeStore.setPriorityStatus(null);
	filterRangeStore.setClassRank(null);
	const query = {
		...router.currentRoute.value.query,
		sold_status: null,
		priority_status: null,
		classrank : null
	};

	const routeName = props.type === "admin" ? "admin-post-list" : "post-list";
	router.push({
		name: routeName,
		query: query,
	});
};
</script>

<style scoped>
.custom-checkbox {
	display: inline-block;
	position: relative;
	min-width: 40px;
	height: 40px;
}

.custom-checkbox input[type="checkbox"] {
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
}

.custom-checkbox span {
	display: block;
	height: 40px;
	padding: 0 10px;
	border-radius: 10%;
	border: 1px solid #ccc;
	text-align: center;
	line-height: 40px;
	font-weight: normal;
	cursor: pointer;
	color: #2c2c2c;
}

.custom-checkbox input[type="checkbox"]:checked ~ span {
	background-color: #ffeceb;
	color: #74150f;
	height: 40px;
}
</style>
