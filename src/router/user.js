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
					classrank: route.query.classrank
				}),
			},
			{
				path: "post-detail/:id(\\d+)?",
				name: "post-detail",
				component: () => import("../views/user/post/PostDetail.vue"),
				props: true,
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
			{
				path: "client-report",
				name: "client-report",
				component: () => import("../views/user/report/ClientReport.vue"),
			},
			{
				path: "client-report-create/:id(\\d+)?",
				name: "client-report-post-create-postId",
				component: () => import("../views/user/report/ReportDetailPost.vue"),
			},
			{
				path: "client-report-create",
				name: "client-report-post-create",
				component: () => import("../views/user/report/ReportDetail.vue"),
			},
			{
				path: "edit/report_id=:id(\\d+)?",
				name: "client-report-detail",
				component: () => import("../views/user/report/ReportDetail.vue"),
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
