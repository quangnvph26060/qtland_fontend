<template>
	<div class="flex flex-col col-12 col-xl-10 xl:pr-[30px]">
		<div class="w-full">
			<ThePageHeader />
		</div>

		<!-- begin::Main Content -->
		<div class="">
			<a-tabs v-model:activeKey="activeKey">
				<a-tab-pane key="1" force-render class="space-y-5">
					<template #tab> Tất cả ({{ totalLand }}) </template>
					<!-- begin::Post Items -->
					<div
						class="flex n:flex-col sm:flex-row border-[1px] cursor-pointer"
						v-for="item in data"
						@click="redirectPostDetail(item.id)"
					>
						<div
							class="relative flex align-items-center justify-center col-sm-3 w-full"
						>
							<div
								v-if="item.priority_status !== 'không yêu cầu'"
								class="absolute z-2 top-1 sm:top-4 w-auto px-2 h-6 leading-6 -left-1 text-white text-center rounded"
								:class="
									getColorTagByPriorityStatus(
										item.priority_status
									)
								"
							>
								{{ item.priority_status }}
							</div>
							<a-image
								:src="item.post_image?.[0]?.image_path"
								class="object-cover"
								:preview="false"
								:height="150"
								:width="300"
							/>
						</div>
						<div class="col-sm-9">
							<Card :title="item.title">
								<template #content>
									<span class="text-sm">
										{{ item.description }}
									</span>
									<CardInfor type="manage" :post="item" />
								</template>
							</Card>
						</div>
					</div>
					<!-- end::Post Items -->
				</a-tab-pane>
				<a-tab-pane key="2" class="space-y-5">
					<template #tab> Đang hiển thị ({{ totalLand }}) </template>
					<!-- begin::Post Items -->
					<div
						class="flex n:flex-col sm:flex-row border-[1px] cursor-pointer"
						v-for="item in data"
						@click="redirectPostDetail(item.id)"
					>
						<div
							class="relative flex align-items-center justify-center col-sm-3 w-full"
						>
							<div
								v-if="item.priority_status !== 'không yêu cầu'"
								class="absolute z-2 top-1 sm:top-4 w-auto px-2 h-6 leading-6 -left-1 text-white text-center rounded"
								:class="
									getColorTagByPriorityStatus(
										item.priority_status
									)
								"
							>
								{{ item.priority_status }}
							</div>
							<a-image
								:src="item.post_image?.[0]?.image_path"
								class="object-cover"
								:preview="false"
								:height="150"
								:width="300"
							/>
						</div>
						<div class="col-sm-9">
							<Card :title="item.title">
								<template #content>
									<span class="text-sm">
										{{ item.description }}
									</span>
									<CardInfor type="manage" :post="item" />
								</template>
							</Card>
						</div>
					</div>
					<!-- end::Post Items -->
				</a-tab-pane>
				<a-tab-pane key="3" class="space-y-5">
					<template #tab> Chờ duyệt ({{ totalLand }}) </template>
				</a-tab-pane>
			</a-tabs>
		</div>
		<!-- end::Main Content -->

		<!-- begin::Pagination -->
		<div class="my-5 ml-auto mr-auto">
			<a-pagination :total="10" show-less-items> </a-pagination>
		</div>
		<!-- end::Pagination -->
	</div>
	<!-- begin::Sidebar -->
	<SidebarFilter />
	<!-- end::Sidebar -->
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import router from "../../../router";
import messageAnt from "../../../scripts/message";
import auth from "../../../stores/auth";
import listPostsAPI from "../../../api/posts/index";
import getTimeSincePostCreation from "../../../utils/getTimeSincePostCreation";

const authStore = auth();
const userId = ref(authStore.getUser.id);
watch(
	() => authStore.getUser,
	() => {
		fetchPostByUser(authStore.getUser.id);
	}
);

const redirectPostDetail = (postId) => {
	router.push({ name: "post-edit", params: { id: postId } });
};

const activeKey = ref("1");

const totalLand = ref(0);

// confirm modal
const showConfirmDelete = () => {
	Modal.confirm({
		title: "Cảnh báo",
		icon: createVNode(ExclamationCircleOutlined),
		class: "top-[24%]",
		content: createVNode(
			"div",
			{
				style: "color:red;",
			},
			"Bạn chắc chắn muốn xoá người dùng này ?"
		),
		okText: "Xoá",
		cancelText: "Huỷ",
		onOk() {
			() => {
				messageAnt.success();
			};
		},
		onCancel() {},
		class: "test",
	});
};

const data = ref([]);
const fetchPostByUser = async (userId) => {
	// isLoading.value = true;
	data.value = [];

	const listPosts = await listPostsAPI.getPostByUser(userId);
	const ans = reactive({
		id: "",
		title: "",
		description: "",
		price: "",
		direction: "",
		area: "",
		address: "",
		created_at: "",
		view: 1000,
		sold_status: "",
		status_id: "",
		priority_status: "",
		user: "",
		comment: [],
		post_image: [],
	});
	const posts = [];

	for (let i = 0; i < listPosts.length; i++) {
		const post = listPosts[i];
		Object.keys(ans).forEach((key) => {
			ans[key] = post[key];
		});
		posts.push({ ...ans });
	}

	data.value = posts;
	totalLand.value = posts.length;
};

const getColorTagByPriorityStatus = (priority_status) => {
	switch (priority_status) {
		case "hot":
			return "hot-priority";
		case "tăng chào":
			return "high-priority";
		case "giảm chào":
			return "low-priority";
		case "quy hoạch":
			return "medium-priority";
		default:
			return "";
	}
};

if (userId.value) fetchPostByUser(userId.value);
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
import Card from "../../../components/base/card/Card.vue";
import CardInfor from "../../../components/base/card/CardInfor.vue";
import SidebarFilter from "../../../components/base/sidebar/SidebarFilter.vue";

export default {
	components: {
		ThePageHeader,
		Card,
	},
};
</script>
<style>
.sidebar-box-item {
	margin-bottom: 12px;
	font-weight: normal;
}
</style>
