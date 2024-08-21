const admin = [
	{
		path: "/admin",
		component: () => import("../layouts/admin.vue"),
		name: "admin",
		redirect: "/admin/post",
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
				path: "admin-pending-post-detail/:id(\\d+)?",
				name: "admin-pending-post-detail",
				component: () => import("../views/admin/post/PostDetailPending.vue"),
				props: true,
			},
			{
				path: "post_id=:id(\\d+)?",
				name: "admin-post-by-id",
				component: () => import("../views/admin/post/PostById.vue"),
			},
			{
				path: "browse",
				name: "admin-post-browse",
				component: () => import("../views/admin/post/PostBrownsePhone.vue"),
			},
			{
				path: "client",
				name: "admin-client-list",
				component: () => import("../views/admin/client/ClientList.vue"),				
			},
			{
				path: "edit/client=:id(\\d+)?",
				name: "admin-client-detail",
				component: () => import("../views/admin/client/ClientDetail.vue"),
			},
			{
				path: "client-create",
				name: "admin-client-create",
				component: () => import("../views/admin/post/PostDetail.vue"),
			},
			{
				path: "config",
				name: "admin-config",
				component: () => import("../views/admin/config/ConfigDetail.vue"),
			},
			{
				path: "admmin-client-report",
				name: "admin-client-report",
				component: () => import("../views/admin/report/ReportClient.vue"),
			},
			{
				path: "admin/edit/report_id=:id(\\d+)?",
				name: "admin-client-report-detail",
				component: () => import("../views/admin/report/ReportDetail.vue"),
			},
			{
				path: "post-user/user_id=:id(\\d+)?",
				name: "admin-post-user-list",
				component: () => import("../views/admin/post/PostListByUser.vue"),
				props: (route) => ({
					rangeArea: route.query.rangeArea,
					rangePrice: route.query.rangePrice,
					dirs: route.query.dirs,
					address: route.query.address,
					sold_status: route.query.sold_status,
					priority_status: route.query.priority_status,
				}),
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
