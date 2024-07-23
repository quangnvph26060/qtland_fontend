const user = [
	{
		path: "/",
		component: () => import("../layouts/user.vue"),
		name: "home",
		redirect: "/post",
		children: [
			{
				path: "post",
				name: "post-list",
				component: () => import("../views/user/post/PostList.vue"),
				props: (route) => ({
					rangeArea: route.query.rangeArea,
					rangePrice: route.query.rangePrice,
					dirs: route.query.dirs,
					address: route.query.address,
				}),
			},
			{
				path: "post-detail/:id(\\d+)?",
				name: "post-detail",
				component: () => import("../views/user/post/PostDetail.vue"),
			},
			{
				path: "post-create",
				name: "post-create",
				component: () => import("../views/admin/post/PostDetail.vue"),
			},
			{
				path: "post-edit/:id(\\d+)?",
				name: "post-edit",
				component: () => import("../views/admin/post/PostDetail.vue"),
			},
			{
				path: "post/user/:id(\\d+)?",
				name: "user-post",
				component: () => import("../views/user/post/PostByUser.vue"),
			},
			{
				path: "post-manage",
				name: "post-manage",
				component: () => import("../views/user/post/PostManage.vue"),
			},
		],
		beforeEnter(to, from, next) {
			// ...
			if (!isAuthenticated()) {
				next({ name: "login" });
			} else {
				if (localStorage.getItem("role") !== "admin") {
					next();
				} else {
					next({ name: "manage-user" });
				}
			}
		},
	},
];

function isAuthenticated() {
	return localStorage.getItem("token");
}

export default user;
