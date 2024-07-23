import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin.js";
import user from "./user.js";

const routes = [
	...admin,
	...user,
	{
		path: "/login",
		name: "login",
		component: () => import("../layouts/login.vue"),
		beforeEnter: (to, from, next) => {
			if (isAuthenticated()) {
				next({ name: "post-list" });
			} else {
				next();
			}
		},
	},
];

function isAuthenticated() {
	return localStorage.getItem("token");
}

const router = createRouter({
	history: createWebHistory(),
	routes,
	strict: true,
});

export default router;
