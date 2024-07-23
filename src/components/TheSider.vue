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
				class="fixed z-2 max-w-[200px] h-100"
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
						<span>Danh sách nhân sự</span>
					</div>
				</a-menu-item>
				<a-sub-menu key="sub1">
					<template #title>
						<div class="flex align-items-center">
							<ReconciliationOutlined />
							<span>Bài viết</span>
						</div>
					</template>
					<a-menu-item key="2">
						<router-link :to="{ name: 'admin-post-create' }">
						</router-link>
						Bài viết mới</a-menu-item
					>
					<a-menu-item key="3">
						<router-link :to="{ name: 'admin-post-list' }">
						</router-link>
						Danh sách bài viết</a-menu-item
					>
					<a-menu-item key="4">
						<router-link :to="{ name: 'admin-post-browse' }">
						</router-link>
						Duyệt tin</a-menu-item
					>
				</a-sub-menu>
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
		key: "2",
		icon: "PieChartOutlined",
		title: "Thông tin tài khoản",
		path: "admin",
	},
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
</style>
