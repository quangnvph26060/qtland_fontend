<template>
	<!-- begin::Statistic -->
	<Card title="Thống kê lượt xem">
		<template #content>
			<!-- begin:Statistic views -->
			<a-col class="col-12">
				<a-statistic
					title="Lượt xem tháng hiện tại:"
					:value="viewCounts.monthly_views"
				/>
			</a-col>
			<a-col class="col-12">
				<a-statistic
					title="Tổng lượt xem:"
					:value="viewCounts.all_time_views"
				/>
			</a-col>
			<!-- end::Statistic views -->
		</template>
	</Card>
	<!-- end::Statistic -->
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import getPostAPI from "../../../api/posts/getDetails";
import { message } from "ant-design-vue";
import viewedPostsAPI from "../../../api/posts/viewed/index";
import auth from "../../../stores/auth";

const route = useRoute();
const authStore = auth();
const userId = ref(authStore.getUser.id);
watch(
	() => authStore.getUser,
	() => {
		userId.value = authStore.getUser.id;
	}
);

const postId = route.params.id;
const viewCounts = ref({ all_time_views: 0, monthly_views: 0 });
if (postId) {
	const fetchViewCounts = async () => {
		const counts = await viewedPostsAPI.getViewCounts(postId);
		viewCounts.value = counts;
	};

	onMounted(async () => {
		const authStore = auth();
		const userId = ref(authStore.getUser.id);
		watch(
			() => authStore.getUser,
			async () => {
				userId.value = authStore.getUser.id;
				await viewedPostsAPI.recordView(postId, userId.value);
				await fetchViewCounts();
			}
		);
	});
}

// const selectedPost = ref(false);
// const post = reactive({
//     title: "",
//     description: "",
//     area: "",
//     price: "",
//     unit: "",
//     sold_status: "",
//     status: "",
//     status_id: "",
//     user: "",
// });
// if (route.params.id) {
//     selectedPost.value = true;
//     const fetchPostById = async (id) => {
//         const getPost = await getPostAPI.getById(id);
//         Object.keys(post).forEach((key) => {
//             post[key] = getPost[key];
//         });
//     };
//     fetchPostById(route.params.id);
// }
</script>

<script>
import InputSelect from "../../../components/base/input/InputSelect.vue";
import Card from "../../../components/base/card/Card.vue";
export default {
	components: {
		InputSelect,
		Card,
	},
};
</script>
<style>
.avatar-uploader .ant-upload-select-picture-card {
	width: 100% !important;
	height: 256px !important;
}

.ant-upload-select-picture-card i {
	font-size: 32px;
	color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
	margin-top: 8px;
	color: #666;
}
</style>
