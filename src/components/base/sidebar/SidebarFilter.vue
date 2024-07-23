<template>
	<div class="flex flex-col d-none d-xl-flex" :class="columnClass">
		<!-- begin::Sidebar Box -->
		<div class="flex-col mb-3 sidebar-box">
			<!-- begin::Author -->
			<slot name="author"></slot>
			<!-- end::Author -->
		</div>
		<!-- end::Sidebar Box -->

		<!-- begin::Sidebar Box -->
		<div class="p-3 mb-3 border-1 sidebar-box">
			<!-- begin::Sidebar Box Title -->
			<div class="mb-3">
				<h2>Lọc theo giá</h2>
			</div>
			<!-- end::Sidebar Box Title -->

			<!-- begin::Sidebar Box Content -->
			<div class="filter-list">
				<a-button
					class="filter-list-item px-0"
					v-for="item in filterPriceList"
				>
					<div class="w-100" @click="setPrice(item.min, item.max)">
						{{
							item.min < 1000
								? item.max < 1000
									? `${item.min}`
									: `${item.min} triệu`
								: `${item.min / 1000}`
						}}
						-
						{{
							item.max < 1000
								? ` ${item.max} triệu`
								: `${item.max / 1000} tỷ`
						}}
					</div>
				</a-button>
			</div>
			<!-- end::Sidebar Box Content -->
		</div>
		<!-- end::Sidebar Box -->

		<!-- begin::Sidebar Box -->
		<div class="p-3 border-1 sidebar-box">
			<!-- begin::Sidebar Box Title -->
			<div class="mb-3">
				<h2>Lọc theo diện tích</h2>
			</div>
			<!-- end::Sidebar Box Title -->

			<!-- begin::Sidebar Box Content -->
			<div class="filter-list">
				<a-button
					class="filter-list-item px-0"
					v-for="item in filterAreaList"
				>
					<div class="w-100" @click="setArea(item.min, item.max)">
						{{ item.min }} - {{ item.max }} m&sup2
					</div>
				</a-button>
			</div>
			<!-- end::Sidebar Box Content -->
		</div>
		<!-- end::Sidebar Box -->
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { filterRange } from "../../../stores/filterRange";

const router = useRouter();
const filterRangeStore = filterRange();

// Filter Area
const filterAreaList = [
	{ min: 0, max: 30 },
	{ min: 30, max: 50 },
	{ min: 50, max: 80 },
	{ min: 80, max: 100 },
	{ min: 100, max: 150 },
	{ min: 150, max: 200 },
	{ min: 200, max: 500 },
];

const { getMinArea, getMaxArea } = filterRangeStore;

const area = ref([getMinArea, getMaxArea]);

const rangeArea = (min, max) => {
	return "dien-tich-tu-" + min + "m2-den-" + max + "m2";
};

const setArea = (min, max) => {
	filterRangeStore.setAreaRange(min, max);
	router.push({
		name: "post-list",
		query: {
			...router.currentRoute.value.query,
			rangeArea: rangeArea(min, max),
		},
	});
};

// Filter Price
const filterPriceList = [
	{ min: 0, max: 500 },
	{ min: 500, max: 800 },
	{ min: 800, max: 1000 },
	{ min: 1000, max: 2000 },
	{ min: 2000, max: 3000 },
	{ min: 3000, max: 5000 },
	{ min: 5000, max: 10000 },
];

const { getMinPrice, getMaxPrice } = filterRangeStore;
const price = ref([getMinPrice, getMaxPrice]);

const calculateRangePrice = (value) => {
	return value < 1000 ? `${value}-trieu` : `${value / 1000}-ty`;
};

const rangePrice = (min, max) => {
	return (
		"gia-tu-" +
		calculateRangePrice(min) +
		"-den-" +
		calculateRangePrice(max)
	);
};

const setPrice = (min, max) => {
	filterRangeStore.setPriceRange(min, max);
	price.value[0] = min;
	price.value[1] = max;
	router.push({
		name: "post-list",
		query: {
			...router.currentRoute.value.query,
			rangePrice: rangePrice(min, max),
		},
	});
};
const columnClass = computed(() => {
      return router.currentRoute.value.fullPath === '/post' ? '' : 'col-lg-2';
});
</script>

<script>
export default {};
</script>

<style scoped>

</style>
