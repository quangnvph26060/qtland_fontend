<template>
	<div id="sider-container">
		<a-layout-sider
			v-model:collapsed="collapsed"
			collapsible
			id="sider-component"
			class="relative"
			:trigger="null"
			style="background: #fff; padding: 0"
		>
			<div class="logo hidden sm:block"></div>

			<a-menu
				v-model:selectedKeys="siderSelectedKeys"
				v-model:openKeys="siderOpenKeys"
                theme="light"
				mode="inline"
				triggerSubMenuAction="click"
				class="fixed z-2 max-w-[210px] h-100"
			>
				<a-menu-item
					class="trigger mb-3 border-b-[1px]"
					@click="() => (collapsed = !collapsed)"
				>
					<div class="flex align-items-center">
						<MenuFoldOutlined />
						<span class="">Menu</span>
					</div>
				</a-menu-item>
				<a-menu-item key="1">
					<div class="flex align-items-center">
						<router-link :to="{ name: 'admin' }"> </router-link>
						<PieChartOutlined />
						<span>Quản lý tài khoản</span>
					</div>
				</a-menu-item>
				<a-sub-menu key="sub1">
					<template #title>
						<div class="flex align-items-center">
							<svg style="margin-right : 5px" font-size="17px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 6C5.32843 6 6 5.32843 6 4.5C6 3.67157 5.32843 3 4.5 3C3.67157 3 3 3.67157 3 4.5C3 5.32843 3.67157 6 4.5 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 13C5.32843 13 6 12.3284 6 11.5C6 10.6716 5.32843 10 4.5 10C3.67157 10 3 10.6716 3 11.5C3 12.3284 3.67157 13 4.5 13Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 20C5.32843 20 6 19.3284 6 18.5C6 17.6716 5.32843 17 4.5 17C3.67157 17 3 17.6716 3 18.5C3 19.3284 3.67157 20 4.5 20Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 4.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 11.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 18.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

							<span>Quản lý tin đăng</span>
						</div>
					</template>
					<a-menu-item key="2" class="hover-text">
						<router-link :to="{ name: 'admin-post-create' }">
						</router-link>
						Đăng mới</a-menu-item
					>
					<a-menu-item key="3" class="hover-text">
						<router-link :to="{ name: 'admin-post-list' }">
						</router-link>
						Danh sách tin</a-menu-item
					>
					<!-- <a-menu-item key="4" class="hover-text">
						<router-link :to="{ name: 'admin-post-browse' }">
						</router-link>
						Duyệt tin</a-menu-item
					> -->
				</a-sub-menu>	
				<a-sub-menu key="sub2">
					<template #title>
						<div class="flex align-items-center">
							<svg style="margin-right : 5px" font-size="17px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 6C5.32843 6 6 5.32843 6 4.5C6 3.67157 5.32843 3 4.5 3C3.67157 3 3 3.67157 3 4.5C3 5.32843 3.67157 6 4.5 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 13C5.32843 13 6 12.3284 6 11.5C6 10.6716 5.32843 10 4.5 10C3.67157 10 3 10.6716 3 11.5C3 12.3284 3.67157 13 4.5 13Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.5 20C5.32843 20 6 19.3284 6 18.5C6 17.6716 5.32843 17 4.5 17C3.67157 17 3 17.6716 3 18.5C3 19.3284 3.67157 20 4.5 20Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 4.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 11.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 18.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

							<span>Quản lý khách hàng</span>
						</div>
					</template>
					<!-- <a-menu-item key="7" class="hover-text">
						<router-link :to="{ name: 'admin-client-create' }">
						</router-link>
						Thêm mới</a-menu-item
					> -->
					<a-menu-item key="8" class="hover-text">
						<router-link :to="{ name: 'admin-client-list' }">
						</router-link>
						Danh sách khách hàng</a-menu-item
					>					
				</a-sub-menu>
				<a-menu-item key="10">
					<div class="flex align-items-center">
						<router-link :to="{ name: 'admin-client-report' }"> </router-link>
						<PieChartOutlined />
						<span>Báo cáo dẫn khách</span>
					</div>
				</a-menu-item>
				<a-menu-item key="9">
					<div class="flex align-items-center">
						<router-link :to="{ name: 'admin-config' }"> </router-link>
						<PieChartOutlined />
						<span>Cấu hình</span>
					</div>
				</a-menu-item>			
				<a-menu-item key="5">
					<div
						class="flex align-items-center"
						@click="showChildrenDrawer"
					>
						<AccountBookOutlined />
						<span>Thông tin tài khoản</span>
					</div>
				</a-menu-item>
				<a-menu-item key="6">
					<div
						class="flex align-items-center "
						@click="onLogout"
					>
						<span>Đăng xuất</span>
					</div>
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-drawer
			:open="childrenDrawer"
			title="Thông tin tài khoản"
			@close="onClose"
			:closable="false"
			placement="right"
			width="280"
		>
			<div class="px-3">
				<a-row>
					<a-col :span="24">
						<a-descriptions title="Thông tin cá nhân" :column="1">
							<a-descriptions-item label="Tên">
								{{ store.user.name }}
							</a-descriptions-item>
							<a-descriptions-item label="Email">
								{{ store.user.email }}
							</a-descriptions-item>
							<a-descriptions-item label="Chức vụ">
								{{
									store.user.role_id === 1
										? "Quản trị viên"
										: store.user.role_id === 2
											? "Đầu chủ"
											: store.user.role_id === 3
												? "Sale"
												: store.user.role_id === 4
													? "Sale VIP"
													: "Đầu chủ VIP"
								}}
							</a-descriptions-item>
						</a-descriptions>
					</a-col>
				</a-row>
			</div>
		</a-drawer>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import auth from "../stores/auth";
import {
	ReconciliationOutlined,
	PieChartOutlined,
	MenuFoldOutlined,
	AccountBookOutlined,
} from "@ant-design/icons-vue";
import router from "../router";
import logout from "../api/auth/logout";

const route = useRoute();

const menu = [
	{
		key: "1",
		icon: "PieChartOutlined",
		title: "Danh sách nhân sự",
		path: "admin",
	},
	{
		key: "sub1",
		icon: "UserOutlined",
		title: "Bài viết",
		children: [
			{
				key: "2",
				title: "Bài viết mới",
				path: "admin-post-create",
			},
			{
				key: "3",
				title: "Danh sách bài viết",
				path: "admin-post-list",
			},
			{
				key: "4",
				title: "Duyệt tin",
				path: "admin-post-browse",
			},
		],
	},
	{
		key: "9",
		icon: "PieChartOutlined",
		title: "Cấu hình",
		path: "config",
	},
	{
		key: "2",
		icon: "PieChartOutlined",
		title: "Thông tin tài khoản",
		path: "admin",
	},
	// {
	// 	key: "sub2",
	// 	icon: "UserOutlined",
	// 	title: "Khách hàng",
	// 	children: [
	// 		{
	// 			key: "7",
	// 			title: "Khách hàng mới",
	// 			path: "admin-client-create",
	// 		},
	// 		{
	// 			key: "8",
	// 			title: "Danh sách khách hàng",
	// 			path: "admin-client-list",
	// 		},
			
	// 	],
	// },
];

const onLogout = async () => {
	const response = await logout();
	if (response.status === 200) {
		store.logout();
		router.push({ name: "login" });
	} else {
		if (response.status === 401) {
			console.warn(
				"Token hết hạn hoặc truy cập trái phép. Chuyển hướng đến trang đăng nhập."
			);
			store.logout();
			router.push({ name: "login" });
		} else {
			console.error("Lỗi đăng xuất:", response.data);
		}
	}
};

const siderSelectedKeys = ref();
const siderOpenKeys = ref();

const collapsed = ref(false);

const store = auth();

const childrenDrawer = ref(false);
const showChildrenDrawer = () => {
	childrenDrawer.value = true;
};

const onClose = () => {
	childrenDrawer.value = false;
};
</script>

<style scoped>
#sider-container {
	background: #fff;
}

#sider-component .logo {
	height: 32px;
	margin: 16px;
	background: rgba(255, 255, 255, 0.3);
}
.site-layout .site-layout-background {
	background: #fff;
}

[data-theme="light"] .site-layout .site-layout-background {
	background: #f2f2f2;
}

.ant-layout .ant-layout-sider-children .ant-menu.ant-menu-inline-collapsed {
	width: 80px;
}
.ant-menu{

}
</style>
