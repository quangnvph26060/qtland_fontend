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
			<FilterOutlined v-if="!type === 'admin'" />
			<div v-else>Hướng nhà</div>
		</div>
	</a-tooltip>

	<a-modal
		v-model:open="modalOptions"
		okText="Tìm kiếm"
		cancelText="Đặt lại"
		class="top-1/5"
		title="Lọc thêm"
		@ok="handleSearchDir(true)"
		@cancel="resetFilters()"
	>
		<div class="mt-3 w-50">
			<div class="flex flex-col">
				<div class="text-md font-semibold mb-3">Hướng nhà</div>
				<div class="flex flex-wrap">
					<label
						class="custom-checkbox me-2 mt-2"
						v-for="item in filterList"
					>
						<input
							type="checkbox"
							:value="item.value"
							:key="item.value"
							v-model="item.isChecked"
						/>
						<span>{{ item.name }}</span>
					</label>
				</div>
			</div>
		</div>

		<div class="mt-3 w-100">
			<div class="flex flex-col">
				<div class="text-md font-semibold mb-3">Nội dung tin có</div>
				<div class="flex flex-wrap">
					<label class="custom-checkbox me-2">
						<input type="checkbox" value="picture" />
						<span>Hình ảnh</span>
					</label>
					<label class="custom-checkbox">
						<input type="checkbox" value="Video" />
						<span>Video</span>
					</label>
				</div>
			</div>
		</div>
	</a-modal>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ArrowUpOutlined, FilterOutlined } from "@ant-design/icons-vue";
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
		value: "1",
		name: "Đông",
		isChecked: false,
	},
	{
		value: "2",
		name: "Đông Nam",
		isChecked: false,
	},
	{
		value: "3",
		name: "Nam",

		isChecked: false,
	},
	{
		value: "4",
		name: "Tây Nam",
		isChecked: false,
	},
	{
		value: "5",
		name: "Tây",
		isChecked: false,
	},
	{
		value: "6",
		name: "Tây Bắc",
		isChecked: false,
	},
	{
		value: "7",
		name: "Bắc",
		isChecked: false,
	},
	{
		value: "8",
		name: "Đông Bắc",
		isChecked: false,
	},
]);

const dirOptions = (arr) => {
	let str = "huong-nha-";
	for (let item of filterList) {
		if (item.isChecked) {
			str = str + item.value + ",";
		}
	}
	return str;
};

const handleSearchDir = (open) => {
	modalOptions.value = open;
	let arr = [];
	for (let item of filterList) {
		if (item.isChecked) {
			arr.push(item.value);
		}
	}
	filterRangeStore.setDirs(arr);
	const routeName = props.type === "admin" ? "admin-post-list" : "post-list";

	router.push({
		name: routeName,
		query: {
			...router.currentRoute.value.query,
			dirs: dirOptions(arr),
		},
	});

	modalOptions.value = false;
};

const resetFilters = () => {
	for (let item of filterList) {
		item.isChecked = false;
	}
	const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	filterRangeStore.setDirs(arr);
	// if (props.type === "admin") {
	//     router.push({
	//         name: "admin-post-list",
	//         query: {
	//             ...router.currentRoute.value.query,
	//             dirs: dirOptions(arr),
	//         },
	//     });
	// } else {
	//     router.push({
	//         name: "post-list",
	//         query: {
	//             ...router.currentRoute.value.query,
	//             dirs: dirOptions(arr),
	//         },
	//     });
	// }
};
</script>

<script>
export default {};
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
