const admin = [
	{
		path: "/admin",
		component: () => import("../layouts/admin.vue"),
		name: "admin",
		redirect: "/admin/user",
		children: [
			{
				path: "user",
				name: "manage-user",
				component: () => import("../views/admin/user/UserList.vue"),
			},
			{
				path: "post",
				name: "admin-post-list",
				component: () => import("../views/admin/post/PostList.vue"),
				props: (route) => ({
					rangeArea: route.query.rangeArea,
					rangePrice: route.query.rangePrice,
					dirs: route.query.dirs,
					address: route.query.address,
					sold_status: route.query.sold_status,
					priority_status: route.query.priority_status,
				}),
			},
			{
				path: "post-create",
				name: "admin-post-create",
				component: () => import("../views/admin/post/PostDetail.vue"),
			},
			{
				path: "edit/post_id=:id(\\d+)?",
				name: "admin-post-detail",
				component: () => import("../views/admin/post/PostDetail.vue"),
			},
			{
				path: "post_id=:id(\\d+)?",
				name: "admin-post-by-id",
				component: () => import("../views/admin/post/PostById.vue"),
			},
			{
				path: "browse",
				name: "admin-post-browse",
				component: () => import("../views/admin/post/PostBrowse.vue"),
			},
		],
		beforeEnter(to, from, next) {
			// ...
			if (!isAuthenticated()) {
				next({ name: "login" });
			} else {
				if (localStorage.getItem("role") !== "admin") {
					next({ name: "post-list" });
				} else {
					next();
				}
			}
		},
	},
];

function isAuthenticated() {
	return localStorage.getItem("token");
}

export default admin;
