<template>
	<div>
		<a-drawer
			title="Menu"
			:placement="placement"
			:closable="false"
			:open="openSidebar"
			@close="onCloseSidebar"
			:width="220"
		>
			<a-menu
				v-model:selectedKeys="siderSelectedKeys"
				v-model:openKeys="siderOpenKeys"
				theme="light"
				mode="inline"
				triggerSubMenuAction="click"
			>
				<a-menu-item key="1" @click="onCloseSidebar">
					<router-link to="/admin/user">
						<div class="flex align-items-center">
							<PieChartOutlined />
							<span>Danh sách nhân viên</span>
						</div>
					</router-link>
				</a-menu-item>
				<a-sub-menu key="sub1">
					<template #title>
						<div class="flex align-items-center">
							<ReconciliationOutlined />
							<span>Bài viết</span>
						</div>
					</template>
					<a-menu-item key="2" @click="onCloseSidebar">
						<router-link :to="{ name: 'admin-post-create' }">
							<div>Bài viết mới</div>
						</router-link>
					</a-menu-item>
					<a-menu-item key="3" @click="onCloseSidebar">
						<router-link :to="{ name: 'admin-post-list' }">
							<div>Danh sách bài viết</div>
						</router-link>
					</a-menu-item>
					<a-menu-item key="4" @click="onCloseSidebar">
						<router-link :to="{ name: 'admin-post-browse' }">
							<div>Duyệt tin</div>
						</router-link>
					</a-menu-item>
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
					<div class="flex align-items-center" @click="onLogout">
						<span>Đăng xuất</span>
					</div>
				</a-menu-item>
			</a-menu>
		</a-drawer>

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

		<a-button
			class="flex justify-center align-items-center border-none"
			@click="showSidebar"
			:icon="h(PicCenterOutlined)"
		>
		</a-button>
	</div>
</template>

<script setup>
import { ref, h } from "vue";
import {
	ReconciliationOutlined,
	PieChartOutlined,
	AntDesignOutlined,
	AccountBookOutlined,
    PicCenterOutlined
} from "@ant-design/icons-vue";
import router from "../router";
import auth from "../stores/auth";
import logout from "../api/auth/logout";

const placement = ref("left");
const openSidebar = ref(false);
const showSidebar = () => {
	openSidebar.value = true;
};
const onCloseSidebar = () => {
	openSidebar.value = false;
};

const siderSelectedKeys = ref();
const siderOpenKeys = ref();

const store = auth();

const childrenDrawer = ref(false);
const showChildrenDrawer = () => {
	childrenDrawer.value = true;
};

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

const onClose = () => {
	childrenDrawer.value = false;
};
</script>

<script>
export default {};
</script>
<style>
.ant-drawer .ant-drawer-body {
	padding: 0 !important;
}
</style>
