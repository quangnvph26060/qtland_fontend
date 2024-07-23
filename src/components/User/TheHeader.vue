<template>
	<!-- begin::Header -->
	<div class="app-header">
		<!-- begin::Header Container -->
		<div class="app-container fixed-top z-10 bg-primary-white-color mr-auto ml-auto">
			<!-- begin::Header Wrapper -->
			<div class="flex justify-between w-[80%] h-[100px] mr-auto ml-auto">
				<!-- begin::Logo -->
				<div class="app-header-logo flex align-items-center justify-center gap-2 ml-[150px] w-100">
					<div @click="handleLogoClick" class="cursor-pointer">
						<!-- begin::Logo Image -->
						<img src="../../assets/logo/logo-2.png" alt="Logo" class="app-header-logo-image w-[100px] h-[64px]" />
						<!-- end::Logo Image -->
					</div>
					<!-- end::Logo -->
				</div>
				<!-- end:: Menu Wrapper -->
				<!-- begin::Control Menu -->
				<div class="app-header-control-menu flex align-items-center">
					<!-- begin::Control Menu Item -->
					<div class="app-control-menu-item">
						<!-- begin::Authenticated -->
						<div class="flex align-items-center divide-x" v-if="store.token">
							<!-- begin::Drawer -->
							<div class="n:px-2 md:px-4 block sm:hidden" v-if="store.user.role_id == 1">
								<TheMenu />
							</div>
	
							<!-- end::Drawer -->
							<!-- begin::Notification -->
							<!-- <div class="n:pl-4 md:px-4">
										<a-popover
											placement="bottomRight"
											trigger="click"
											class="flex"
										>
											<template #content>
												<div
													class="max-h-[440px] max-w-[580px]"
												>
													<div
														class="flex align-items-center cursor-pointer p-2 hover:bg-slate-100"
													>
														<div class="type me-3">
															<UserOutlined
																:style="{
																	fontSize: '16px',
																}"
															/>
														</div>
														<div
															class="flex flex-col content"
														>
															<div class="detail">
																Đăng ký tham dự miễn phí
																Báo cáo thị trường BĐS
																Quý 1/2024
															</div>
															<div class="day">
																20/10/2024
															</div>
														</div>
													</div>
													<div
														class="flex align-items-center cursor-pointer p-2 hover:bg-slate-100"
													>
														<div class="type me-3">
															<ClockCircleOutlined
																:style="{
																	fontSize: '16px',
																}"
															/>
														</div>
														<div
															class="flex flex-col content"
														>
															<div class="detail">
																Số điện thoại 0373388843
																đã được thêm vào danh
																sách liên lạc của bạn.
																Xem chi tiết tại đây.
															</div>
															<div class="day">
																20/10/2024
															</div>
														</div>
													</div>
												</div>
</template>

<template #title>
	<h2>
		Thông báo</h2>
</template>
									<a-badge>
										<a-button
											class="flex justify-center align-items-center w-16"
										>
											<NotificationOutlined />
										</a-button>
										<span
											class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-75 right-[7px] top-[-3px]"
										></span>
										<span
											class="relative inline-flex rounded-full h-3 w-3 bg-sky-500 right-[5px] top-[-5px]"
										></span>
									</a-badge>
								</a-popover>
							</div> -->
							<!-- end::Notification -->
							<!-- begin::User Feature -->
							<div class="n:px-2 md:px-4 hidden sm:block">
								<a-dropdown
									:placement="'bottomLeft'"
									trigger="click"
								>
<template #overlay>
	<a-menu>
		<a-menu-item key="1" v-if="
															store.user.role_id == 2 ||
															store.user.role_id == 5
														" class="py-2">
			<div class="inline-flex items-center mr-3">
				<BarChartOutlined />
			</div>
			<div class="inline-flex">
				Quản lý tin đăng
			</div>
			<router-link :to="{
																name: 'post-manage',
															}"></router-link>
		</a-menu-item>
		<a-menu-item key="2">
			<div class="inline-flex items-center mr-3">
				<InfoOutlined />
			</div>
			<div class="inline-flex">
				Thay đổi thông tin cá nhân
			</div>
		</a-menu-item>
		<a-menu-item key="3" @click="onLogout" class="">
			<div class="inline-flex items-center mr-3">
				<LogoutOutlined />
			</div>
			<div class="inline-flex">
				Đăng xuất
			</div>
		</a-menu-item>
	</a-menu>
</template>
									<div
										class="flex justify-center align-items-center cursor-pointer"
									>
										<a-avatar
											size="large"
											class="me-2"
											:style="{
												backgroundColor: '#ADC178',
												verticalAlign: 'middle',
											}"
										>
											<span>
												{{ store.user.name[0] }}
											</span>
										</a-avatar>
										<div class="d-none d-sm-block">
											{{ store.user.name }}
										</div>
										<div class="mx-2">
											<DownOutlined />
										</div>
									</div>
								</a-dropdown>
							</div>
							<!-- end::User Feature -->
							<!-- begin::Create Post -->
							<div
								class="n:px-2 md:px-4 hidden sm:block"
								v-if="
									store.user.role_id == 2 ||
									store.user.role_id == 5
								"
							>
								<router-link :to="{ name: 'post-create' }">
									<a-button class=""> Đăng tin </a-button>
								</router-link>
							</div>
							<div class="n:px-2 md:px-4 " :class="store.user.role_id == 1 ? 'hidden' : 'sm:hidden'">
								<a-button
									@click="showDrawer"
									:icon="h(PicCenterOutlined)"
									size="large"
									class="flex justify-center align-items-center border-none"
								></a-button>
								<a-drawer
									placement="right"
									:closable="false"
									:open="open"
									:width="240"
									@close="onClose"
								>
									<div class="flex flex-col space-y-4 p-4">
										<div
											class="flex align-items-center cursor-pointer"
										>
											<a-avatar
												size="large"
												class="me-2"
												:style="{
													backgroundColor: '#ADC178',
													verticalAlign: 'middle',
												}"
											>
												<span>
													{{ store.user.name[0] }}
												</span>
											</a-avatar>
											<div>
												{{ store.user.name }}
											</div>
										</div>
										<div
											v-if="
												store.user.role_id == 2 ||
												store.user.role_id == 5
											"
										>
											<router-link
												:to="{ name: 'post-create' }"
											>
												<a-button
													class="w-100 h-[40px]"
													type="primary"
													@click="onClose"
												>
													Đăng tin
												</a-button>
											</router-link>
										</div>
										<div class="">
											<router-link
												:to="{
													name:
														store.user.role_id === 1
															? 'admin-post-list'
															: 'post-manage',
												}"
											>
												<a-button
													class="h-[36px] w-100 flex align-items-center border-none"
													:icon="h(ScheduleOutlined)"
													@click="onClose"
													>Danh sách tin
												</a-button>
											</router-link>

											<a-button
												class="h-[36px] w-100 flex align-items-center border-none"
												:icon="h(AccountBookOutlined)"
												@click="showChildrenDrawer"
												>Thông tin tài khoản</a-button
											>
											<a-drawer
												v-model:open="childrenDrawer"
												title="Thông tin tài khoản"
												:closable="false"
												width="280"
											>
												<div class="px-3">
													<a-row>
														<a-col :span="24">
															<a-descriptions
																title="Thông tin cá nhân"
															>
																<a-descriptions-item
																	label="Tên"
																>
																	{{
																		store
																			.user
																			.name
																	}}</a-descriptions-item
																>
																<a-descriptions-item
																	label="Email"
																>
																	{{
																		store
																			.user
																			.email
																	}}</a-descriptions-item
																>
																<a-descriptions-item
																	label="Chức vụ"
																>
																	{{
																		store
																			.user
																			.role_id ===
																		1
																			? "Quản trị viên"
																			: store
																						.user
																						.role_id ===
																				  2
																				? "Đầu chủ"
																				: store
																							.user
																							.role_id ===
																					  3
																					? "Sale"
																					: store
																								.user
																								.role_id ===
																						  4
																						? "Sale VIP"
																						: "Đầu chủ VIP"
																	}}</a-descriptions-item
																>
															</a-descriptions>
														</a-col>
													</a-row>
												</div>
											</a-drawer>
										</div>
										<a-button
											class="h-[36px] w-100 flex align-items-center border-none"
											@click="onLogout"
											>Đăng xuất</a-button
										>
									</div>
								</a-drawer>
							</div>
							<!-- end::Create Post -->
						</div>
						<!-- end::Authenticated -->
					</div>
					<!-- end::Control Menu Item -->
				</div>
				<!-- end::Control Menu -->
			</div>
			<!-- end::Header Wrapper -->
		</div>
		<!-- end::Header Container -->
	</div>
	<!-- end::Header -->
</template>

<script setup>
import { ref, h } from "vue";
import {
	NotificationOutlined,
	DownOutlined,
	UserOutlined,
	LogoutOutlined,
	BarChartOutlined,
	InfoOutlined,
	ScheduleOutlined,
	AccountBookOutlined,
	MenuFoldOutlined,
	PicCenterOutlined,
} from "@ant-design/icons-vue";
import router from "../../router";
import auth from "../../stores/auth";
import filterRange from "../../stores/filterRange";
import logout from "../../api/auth/logout";

const store = auth();
const filterStore = filterRange();
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

const handleLogoClick = () => {
	filterStore.resetFilters();
	router.push({ name: "home" });
};
const open = ref(false);
const showDrawer = () => {
	open.value = true;
};
const onClose = () => {
	open.value = false;
};

const childrenDrawer = ref(false);
const showChildrenDrawer = () => {
	childrenDrawer.value = true;
};
</script>

<script>
import TheMenu from "../TheMenu.vue";
export default {};
</script>

<style>

</style>
