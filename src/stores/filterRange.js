import { defineStore } from "pinia";

export const filterRange = defineStore({
	id: "filterRange",
	state: () => ({
		min_price: 0,
		max_price: 60000,
		min_area: 0,
		max_area: 1000,
		dirs: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		address: "",
		sold_status: [],
		priority_status: [],
	}),

	getters: {
		getMinPrice: (state) => {
			return state.min_price;
		},
		getMaxPrice: (state) => {
			return state.max_price;
		},
		getMinArea: (state) => {
			return state.min_area;
		},
		getMaxArea: (state) => {
			return state.max_area;
		},
		getPriceRange: (state) => {
			return [state.min_price, state.max_price];
		},
		getAreaRange: (state) => {
			return [state.min_area, state.max_area];
		},
		getDirs: (state) => {
			return state.dirs;
		},
		getAddress: (state) => {
			return state.address;
		},
		getSoldStatus: (state) => {
			return state.sold_status;
		},
		getPriorityStatus: (state) => {
			return state.priority_status;
		},
		getAll: (state) => {
			return {
				min_price: state.min_price * 1000000,
				max_price: state.max_price * 1000000,
				min_area: state.min_area,
				max_area: state.max_area,
				dirs: state.dirs,
				address: state.address,
				sold_status: state.sold_status,
				priority_status: state.priority_status,
			};
		},
	},

	actions: {
		setPriceRange(min, max) {
			this.min_price = min;
			this.max_price = max;
		},
		setAreaRange(min, max) {
			this.min_area = min;
			this.max_area = max;
		},
		setDirs(arr) {
			this.dirs = arr;
		},
		setAddress(address) {
			this.address = address;
		},
		setSoldStatus(status) {
			this.sold_status = status;
		},
		setPriorityStatus(status) {
			this.priority_status = status;
		},
		resetFilters() {
			this.min_price = 0;
			this.max_price = 60000;
			this.min_area = 0;
			this.max_area = 1000;
			this.dirs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
			this.address = "";
			this.sold_status = [];
			this.priority_status = [];
		},
	},
	persist: true,
});

export default filterRange;
