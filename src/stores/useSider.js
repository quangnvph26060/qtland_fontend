import { defineStore } from "pinia";

export const useSider = defineStore("sider", {
	state: () => ({
		siderSelectedKeys: ["1"],
		siderOpenKeys: [""],
	}),
	actions: {
		onSiderSelectedKeys(data) {
			this.siderSelectedKeys = data;
		},
		onSiderOpenKeys(data) {
			this.siderOpenKeys = data;
		},
	},
	persist: true,
});
