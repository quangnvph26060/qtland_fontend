<template>
	<!-- begin::Primary Content -->
	<div class="flex flex-col" :class="
							props.type === 'admin' ? 'col-12' : 'col-12 col-xl-8 xl:pr-[30px]'
						">
		<!-- begin::Main Content -->
		<div :class="props.type === 'admin' ? 'w-4/5 mx-auto' : 'w-full'">
			<!-- begin::Breadcrumb -->
			<!-- <ThePageHeader /> -->
			<!-- end::Breadcrumb -->
	
			<!-- begin::Carousel Media -->
			<a-skeleton :active="isLoading" :avatar="false" :title="false" :paragraph="{ rows: 15 }" v-show="isLoading" />
			<div v-show="!isLoading">
				<Carousel :postId="postId" :post_image="data.post_image" @update:isLoading="handleLoading(value)" />
			</div>
			<!-- end::Carousel Media  -->
	
			<!-- begin::Detail Info -->
			<div class="detail-info mt-[50px] lg:mt-[50px] space-y-5">
				<!-- begin::Meta Info -->
				<div class="meta-info">
					<a-descriptions :title="data.title">
						<a-descriptions-item label="Địa chỉ">
							{{ data.address }}
						</a-descriptions-item>
					</a-descriptions>
				</div>
				<!-- end::Meta Info -->
				<a-divider />
				<!-- begin::Short Info -->
				<div class="short-info">
					<div class="flex flex-wrap justify-between">
						<div class="info flex justify-between w-100">
							<div class="price">
								<div class="main_infor mr-10">
									<span class="title">Mức giá</span>
									<br/>
									<span class="content">
														{{ formatMoney(data.price) }}
													</span>
								</div>
							</div>
							<div class="area mx-12 main_infor">
								<span class="title">Diện tích</span>
								<br/>
								<span class="content">
														{{ data.area }} m&sup2
													</span>
							</div>
							<div class="direction main_infor ml-10" v-if="data.direction !== 0">
								<span class="title">Hướng nhà</span>
								<br/>
								<span class="content">
													{{ getDirectionLabel(data.direction) }}
												</span>
	
							</div>
							<div class="flex-end feature flex ml-auto align-items-center">
								<a-tooltip placement="top">
									<template #title>
														<span>Chia sẻ</span>
</template>
									<a-button class="border-none hover:bg-slate-200"
										><ShareAltOutlined
											:style="{ fontSize: '24px' }"
									/></a-button>
								</a-tooltip>
								<a-tooltip placement="top">
<template #title>
	<span>Báo cáo</span>
</template>
									<a-button class="border-none"
										><WarningOutlined
											:style="{ fontSize: '24px' }"
									/></a-button>
								</a-tooltip>
								<a-tooltip placement="top">
<template #title>
	<span>Lưu tin</span>
</template>
									<a-button class="border-none"
										><HeartOutlined
											:style="{ fontSize: '24px' }"
									/></a-button>
								</a-tooltip>
	
								<a-tooltip placement="top">
<template #title>
	<span>Sao chép nội dung</span>
</template>
									<a-button
										class="border-none"
										@click="copyText(data.description)"
										><CopyOutlined
											:style="{ fontSize: '24px' }"
									/></a-button>
								</a-tooltip>
							</div>
						</div>
					</div>
				</div>
				<!-- end::Short Info -->
				 <!-- begin::Price Detail -->
				<div class="cta_detail" :class="priceChange">
						<span class="cta_number flex"><img v-if="priceChange=='up'" src="../../../assets/logo/icon_up.svg" alt="" class="cta_icon"> <img v-else src="../../../assets/logo/icon_down.svg" alt="" class="cta_icon">  4,2%</span>
						<span class="cta_text">Giá tại dự án tăng trong vòng 1 năm qua</span>
					<a href="#" class="cta_link">Xem lịch sử giá</a>
				</div>
				<!-- end::Price Detail -->
				<a-divider />
				<!-- begin::Description -->
				<div class="description">
					<a-descriptions title="Thông tin mô tả" :titleStyle="{ fontSize: '18px' }">
						<a-descriptions-item
							label=""
							class="select-all whitespace-pre-line"
						>
							{{ data.description }}
						</a-descriptions-item>
					</a-descriptions>
				</div>
				<!-- end::Description -->
				<a-divider />
				<!-- begin::Feature -->
				<div class="feature">
					<a-descriptions title="Đặc điểm bất động sản" :column="2" :labelStyle="{ fontWeight: '500' }">
						<a-descriptions-item :span="1" class="description-item-infor">
					<template #label>
						Diện tích
					</template>
							{{ data.area }} m&sup2
						</a-descriptions-item>
						<a-descriptions-item :span="1" class="description-item-infor">
					<template #label>
						Mức giá
					</template>
							{{ formatMoney(data.price) }}
						</a-descriptions-item>
						
						<a-descriptions-item :span="1" class="description-item-infor">
					<template #label>
						Hướng ban công
					</template>
							{{ getDirectionLabel(data.direction)}}
						</a-descriptions-item>
						<a-descriptions-item :span="1" class="description-item-infor">
						<template #label>
							Số phòng ngủ
						</template>
							1 phòng
						</a-descriptions-item>
						<a-descriptions-item :span="1" class="description-item-infor">
					<template #label>
						Số toilet
					</template>
							2 phòng
						</a-descriptions-item>
						<a-descriptions-item :span="1" class="description-item-infor">
					<template #label>
						Pháp lý
					</template>
							Sổ đỏ/ sổ hồng
						</a-descriptions-item>
						<a-descriptions-item :span="1" class="description-item-infor">
					<template #label>
						<ios-icon>
						</ios-icon>
						Nội thất
					</template>
							Đầy đủ
						</a-descriptions-item>
					</a-descriptions>
				</div>
				<!-- end::Feature -->
				<a-divider />
				<!-- begin::Project Infor -->
				<a-descriptions>
<template #title>
	<div class='project_infor-title'>
		Thông tin dự án
	
		<a href='#' class="project_infor-more">Xem 864 tin đăng bán ></a>
	
	</div>
</template>
				</a-descriptions>

				<div class="project_infor">
					<img src="https://file4.batdongsan.com.vn/crop/320x320/2024/07/12/20240712141326-1386_wm.jpg" alt="" class="project_infor-img">
					<div class="project_infor-content">
						<h3 class="project_infor-title">Vinhomes Ocean Park Gia Lâm</h3>
						<span class="project_infor-status"><strong> Tình trạng:</strong> Đang mở bán</span>
						<span class="project_infor-quantity"><strong> Số lượng:</strong>  66</span> 
						<span class="project_infor-group"><strong> Tập đoàn</strong> Vingroup</span>
					</div>
				</div>
				<!-- end::Project Infor  -->
				<a-divider />
				<!-- begin::Date -->
				<!-- begin::Tag -->
				<a-descriptions title="Tìm kiếm theo từ khóa">
				</a-descriptions>
				<div class="post_tags flex flex-wrap mt-0">
					<span class="post_tag" v-for="tag in postTags">{{tag}}</span>
				</div>
				<!-- end::Tag -->
				<a-divider/>
				<!-- begin::Date -->
				<div class="date">
					<div class='post_infor-list'>
						<div class=" post_infor">
							<span class="title">Ngày đăng</span>
							<br/>
							<span class="content">
									{{formatDateOnly(data.created_at) }}
									</span>
						</div>
						<div class=" post_infor">
							<span class="title">Ngày hết hạn</span>
							<br/>
							<span class="content">
									{{formatExpiredDate(data.created_at,15) }}
									</span>
						</div>
						<div class=" post_infor">
							<span class="title">Mã tin</span>
							<br/>
							<span class="content">
								{{ data.id }}
									</span>
						</div>
					</div>
				</div>
				<!-- end::Date -->
				 <a-divider/>
				 <p class='post-notice'>Quý vị đang xem nội dung tin rao "<strong>{{data.title }} </strong>" - Mã tin <strong> {{data.id}}</strong>. Mọi thông tin, nội dung liên quan tới tin rao này là do người đăng tin đăng tải và chịu trách nhiệm. Qtland.site luôn cố gắng để các thông tin được hữu ích nhất cho quý vị tuy nhiên Qtland.site không đảm bảo và không chịu trách nhiệm về bất kỳ thông tin, nội dung nào liên quan tới tin rao này. Trường hợp phát hiện nội dung tin đăng không chính xác, Quý vị hãy thông báo và cung cấp thông tin cho Ban quản trị Qtland.site theo Hotline 19001881 để được hỗ trợ nhanh và kịp thời nhất.</p>
				
				<div :class="props.type === 'admin' ? '' : 'block xl:hidden'">
					<a-divider />
					<a-descriptions title="Thông tin người đăng">
					</a-descriptions>
					<router-link
						:to="{
							name: 'user-post',
							params: { id: data.user.id },
						}"
					>
						<div class="author flex align-items-center">
							<a-avatar
								:size="64"
								:style="{
									backgroundColor: '#ADC178',
									verticalAlign: 'middle',
								}"
							>
								{{ data.user.name?.[0] }}
							</a-avatar>
							<div class="author ml-5">
								<h2>{{ data.user.name }}</h2>
							</div>
						</div>
					</router-link>
				</div>
				<a-divider />
				<!-- begin::PostSlider -->
					<!-- <PostCarousel
					title="Bất động sản dành cho bạn"
					:post_image="data.post_image"
				
				/> -->
				<!-- end::PostSlider -->
				<a-divider />
				<!-- begin::Comments -->
				<Comment
					:comments="comments"
					@submitComment="onSubmitComment"
				/>
				<!-- end::Comments -->
			</div>
			<!-- end::Detail Info -->
		</div>
		<!-- end::Main Content -->
	</div>
	<!-- end::Primary Content -->

	<!-- begin::Sidebar -->
	<SidebarFilter class="sticky top-0 right-20" v-if="props.type == 'user'">
<template #author>
	<router-link :to="{
									name: 'user-post',
									params: { id: data.user.id },
								}">
		<div class="flex flex-col align-items-center py-3">
			<a-avatar :size="64" :style="{
											backgroundColor: '#ADC178',
											verticalAlign: 'middle',
										}" class="">
				{{ data.user.name?.[0] }}
			</a-avatar>
			<div class="author mt-2">
				<h2>{{ data.user.name }}</h2>
			</div>
			<a href="#" class="author_posts">Xem thêm 4 tin khác</a>
			<div class="user_button-list">
				<a class="user_button-item mobile" href="#">
											Liên hệ số
										</a>
				<a class="user_button-item" href="#">
											<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png" alt="" class="user_button-img">
											Chat qua Zalo
										</a>
				<a class="user_button-item" href="#">
											Gửi email
										</a>
				<a class="user_button-item" href="#">
											Yêu cầu liên hệ lại
										</a>
			</div>
		</div>
	</router-link>
</template>
	</SidebarFilter>
	<!-- end::Sidebar -->
</template>

<script setup>
import {
	HeartOutlined,
	WarningOutlined,
	ShareAltOutlined,
	CopyOutlined,
} from "@ant-design/icons-vue";
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import getPostAPI from "../../../api/posts/getDetails";
import getCommentDetailsAPI from "../../../api/comment/getDetails";
import viewedPostsAPI from "../../../api/posts/viewed/index";
import formatMoney from "../../../utils/formatMoney";
import formatDateOnly from "../../../scripts/formatDateOnly";
import copyText from "../../../scripts/copyText";
import auth from "../../../stores/auth";
const route = useRoute();

const props = defineProps({
	type: {
		type: String,
		default: "user",
	},
});

const direction = [{
		value: 1,
		label: "Đông",
	},
	{
		value: 2,
		label: "Đông Nam",
	},
	{
		value: 3,
		label: "Nam",
	},
	{
		value: 4,
		label: "Tây Nam",
	},
	{
		value: 5,
		label: "Tây",
	},
	{
		value: 6,
		label: "Tây Bắc",
	},
	{
		value: 7,
		label: "Bắc",
	},
	{
		value: 8,
		label: "Đông Bắc",
	},
];
const postTags = [
"Nhà riêng phường 12 Gò Vấp",
"Nhà riêng Quang Trung Gò Vấp",
"Nhà riêng Gò Vấp Hồ Chí Minh",
"Nhà riêng Hồ Chí Minh 4 PN",
"Bán nhà phố Hồ Chí Minh" ];

const getDirectionLabel = (value) => {
	const directionObj = direction.find((item) => item.value === value);
	return directionObj ? directionObj.label : "";
};

const data = reactive({
	id: "",
	title: "",
	description: "",
	price: "",
	area: "",
	direction: "",
	address: "",
	created_at: "",
	view: 1000,
	sold_status: "",
	status_id: "",
	user: "",
	comment: [],
	post_image: [],
});

const comments = ref([]);

const isLoading = ref(false);

const postId = route.params.id;

const authStore = auth();

const userId = authStore.getUser.id;

const priceChange = ref('up');

onMounted(async () => {
	await viewedPostsAPI.recordView(postId, userId);
});

const fetchPostsList = async (id) => {
	isLoading.value = true;
	const post = await getPostAPI.getById(id);

	Object.keys(data).forEach((key) => {
		data[key] = post[key];
	});

	comments.value.push(...post.comment);
};

fetchPostsList(postId);

const handleLoading = (value) => {
	isLoading.value = value;
};

function formatExpiredDate(dateTimeString, daysToAdd = 0) {
	const dateTime = new Date(dateTimeString);

	// Thêm số ngày cần cộng
	dateTime.setDate(dateTime.getDate() + daysToAdd);

	// Lấy thông tin ngày, tháng, năm
	const date = dateTime.toLocaleDateString("vi-VN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

	return date;
}

const fetchCommentsList = async (id) => {
	const commentOnPost = await getCommentDetailsAPI(id);
	comments.value = commentOnPost;
};

const onSubmitComment = () => {
	fetchCommentsList(postId);
};
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
import Carousel from "../../../components/base/carousel/Carousel.vue";
import Comment from "../../../components/base/comment/Comment.vue";
import PostCarousel from "../../../components/base/carousel/PostCarousel.vue";
import SidebarFilter from "../../../components/base/sidebar/SidebarFilter.vue";
import { template } from "lodash-es";

export default {
	components: {
		ThePageHeader,
		Carousel,
		Comment,
		SidebarFilter,
	},

	methods: {},
};
</script>

<style scoped>
:deep(.ant-descriptions-title) {
	font-size: 18px;
}

:deep(.meta-info .ant-descriptions-title) {
	font-size: 24px;
}

.post_infor-list {
	display: flex;
}

.post_infor .title {
	font-size: 14px;
	line-height: 20px;
	font-weight: normal !important;
	color: #999;
}

.post_infor {
	margin-right: 50px;
}

.post_infor .content {
	font-size: 14px;
	line-height: 28px;
	font-weight: 500;
	color: #2C2C2C;
	margin-top: 4px;
}

.main_infor .title {
	font-size: 14px;
	line-height: 20px;
	font-weight: normal !important;
	color: #999;
}

.main_infor .content {
	font-size: 18px;
	line-height: 28px;
	font-weight: normal !important;
	color: #2C2C2C;
	margin-top: 4px;
}

:deep(.ant-descriptions-item.description-item-infor) {
	border-top: 1px solid #F2F2F2;
	padding-top: 20px;
	margin-left: 10px;
}

.user_button-list {
	display: flex;
	flex-direction: column;
}

.post-notice {
	font-size: 14px;
	line-height: 20px;
	font-weight: normal !important;
	color: #505050;
}

.post-notice strong {
	font-weight: 500;
}

.user_button-item {
	text-align: center;
	color: #2C2C2C;
	background: #fff;
	border: solid 1px #ccc;
	font-family: "Lexend Medium", Roboto, Arial !important;
	font-size: 14px;
	line-height: 25px;
	font-weight: normal !important;
	letter-spacing: -.2px;
	padding: 13px 15px;
	border-radius: 8px;
	margin-top: 5px;
	display: flex;
	justify-content: center;
	transition: ease all 0.5s;
}

.user_button-item:hover {
	background: #FAFAFA;
	color: #8b3035;
	border-color: #8b3035;
}

.user_button-item.mobile:hover {
	background-color: #70272a;
	border-color: #70272a;
}

.user_button-item.mobile {
	color: #fff;
	background: #8b3035;
	border: 1px solid #8b3035;
	font-family: "Lexend Medium", Roboto, Arial !important;
	font-size: 14px;
	line-height: 20px;
	font-weight: normal !important;
	letter-spacing: -.2px;
	padding: 13px 15px;
	border-radius: 8px;
}

.user_button-img {
	width: 25px;
	height: 25px;
	margin-right: 5px;
}

.author_posts {
	font-weight: 300;
	margin-bottom: 10px;
}

.cta_detail {
	display: flex;
	align-items: center;
}

.cta_detail.up {
	border: 1px solid #07A35D;
	padding: 15px 15px;
	border-radius: 5px;
}
.cta_detail.down {
	border: 1px solid #E03C31;
	padding: 15px 15px;
	border-radius: 5px;
}

.cta_detail.up .cta_number {
	background: url(/assets/logo/icon_up.svg) no-repeat 8px 8px #E7FFF4;
	font-family: "Lexend Medium", Roboto, Arial !important;
	font-size: 14px;
	line-height: 20px;
	font-weight: 600;
	letter-spacing: -.2px;
	color: #07A35D;
	padding: 5px;
	border-radius: 5px;
}

.cta_detail.down .cta_number {
	background: url(/assets/logo/icon_down.svg) no-repeat 8px 8px #FFC7C3;
	font-family: "Lexend Medium", Roboto, Arial !important;
	font-size: 14px;
	line-height: 20px;
	font-weight: normal !important;
	letter-spacing: -.2px;
	font-weight: 600;
	color: #E03C31;
	padding: 5px;
	border-radius: 5px;
}

.cta_text {
	margin-left: 10px;
}

.cta_detail .cta_link {
	color: #8b3035;
	font-family: "Roboto Regular", Roboto, Arial !important;
	font-size: 14px;
	line-height: 20px;
	font-weight: 700;
}

.cta_link {
	margin-left: auto;
}
.cta_link:hover {
	color: #b83c42;
}


.project_infor {
	display: flex;
	outline: 1px solid #F2F2F2;
	width: 100%;
	border-radius: 4px;
	padding: 16px;
}

.project_infor span {
	font-weight: 300;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
	max-width: 238px;
}

.project_infor-img {
	width: 76px;
	height: 76px;
	border-radius: 5px;
}

.project_infor-content {
	padding-left: 20px;
}

.project_infor-title {
	font-family: "Lexend Medium", Roboto, Arial !important;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.2px;
	color: #2C2C2C;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.project_infor-title {
	display: flex;
	justify-content: space-between;
}

.project_infor-more {
	color: #8b3035;
}

.project_infor-more:hover {
	color: #b75d62;
}
.post_tag{
	border-radius: 40px;
    background: #F2F2F2;
	color: #2C2C2C;
    cursor: pointer;
	margin-top: 8px;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal !important;
    padding: 6px 16px;
    margin-right: 8px;
}
.post_tag:hover {
    background: #F2F2F2;
    color: #999;
}
</style>
