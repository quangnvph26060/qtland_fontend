<template>
	<!-- begin::Tabs -->
	<a-tabs>
		<a-tab-pane key="1" tab="Tổng quan">
			<div class="tab-content">
				<div class="flex flex-col gap-7 gap-lg-10">
					<!-- begin::Status -->
					<Card title="Trạng thái" class="space-y-3">
						<template #content>
							<div v-if="postId">
								<InputSelect
									:valueSelected="data.sold_status.toString()"
									:options="soldStatus"
									:title="'Trạng thái bán'"
									@update:selected="
										handleInput('sold_status', $event)
									"
								/>
							</div>

							<div v-if="postId">
								<InputSelect
									:valueSelected="data.status_id?.toString()"
									:options="status"
									:title="'Trạng thái bài viết'"
									@update:selected="
										handleInput('status_id', $event)
									"
								/>
							</div>

							<div>
								<InputSelect
									:valueSelected="data.priority_status"
									:options="priorityStatus"
									:title="'Độ ưu tiên bài viết'"
									@update:selected="
										handleInput('priority_status', $event)
									"
									placeholder="Không yêu cầu"
								/>
							</div>
						</template>
					</Card>
					<!-- end::Status -->

					<!-- begin::Basic Info Option -->
					<Card title="Thông tin cơ bản">
						<template #content>
							<!-- begin::Input Group -->
							<div class="mb-3 space-y-3">
								<div class="form-label">Địa điểm</div>
								<SelectorAddress
									@update:selectedProvince="
										handleInput('province', $event)
									"
									@update:selectedDistrict="
										handleInput('district', $event)
									"
									@update:selectedWard="
										handleInput('ward', $event)
									"
									:address="data.address"
								/>
							</div>
							<!-- end::Input Group -->

							<!-- begin::Input Group -->
							<a-form>
								<InputBasic
									title="Địa chỉ hiển thị trên tin đăng"
									placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ, ..."
									:value="data.address_detail"
									@input="
										handleInput('address_detail', $event)
									"
								/>
							</a-form>

							<!-- end::Input Group -->
						</template>
					</Card>
					<!-- end::Basic Info Option -->

					<!-- begin::Post Info Option -->
					<Card title="Thông tin bài viết">
						<template #content>
							<!-- begin::Input Group -->
							<InputBasic
								title="Tiêu đề"
								placeholder="Nhập tiêu đề bài viết"
								:value="data.title"
								@input="handleInput('title', $event)"
							/>
							<!-- end::Input Group -->

							<!-- begin::Input Group -->
							<InputArea
								title="Mô tả"
								placeholder="Nhập mô tả bài viết"
								:value="data.description"
								:rows="6"
								@input="handleInput('description', $event)"
							/>
							<!-- end::Input Group -->
						</template>
					</Card>
					<!-- end::Post Info Option -->

					<!-- begin::Land Info Option -->
					<Card title="Thông tin bất động sản">
						<template #content>
							<!-- begin::Input Group -->
							<InputBasic
								title="Diện tích"
								placeholder="Nhập diện tích, VD: 80"
								:value="data.area?.toString()"
								@input="handleInput('area', $event)"
								inputType="number"
							/>
							<!-- end::Input Group -->

							<!-- begin::Input Group -->
							<div class="flex justify-between flex-wrap">
								<div class="col-12 col-xl-8">
									<!-- begin::Input -->
									<InputBasic
										title="Mức giá"
										placeholder="Nhập giá, VD: 12000000"
										:value="data.price?.toString()"
										@input="handleInput('price', $event)"
										inputType="number"
									/>
									<!-- end::Input -->
								</div>
								<div class="col-12 col-xl-3">
									<InputSelect
										title="Đơn vị"
										:options="units"
										:valueSelected="data.unit?.toString()"
										@update:selected="
											handleInput('unit', $event)
										"
										placeholder="VND"
									/>

									<!-- end::Select -->
								</div>
							</div>
							<!-- end::Input Group -->

							<InputSelect
								title="Hướng nhà"
								:options="direction"
								:valueSelected="
									data.direction?.toString() !== '0'
										? data.direction?.toString()
										: null
								"
								@update:selected="
									handleInput('direction', $event)
								"
								placeholder="Chọn hướng nhà"
							/>
						</template>
					</Card>
					<!-- end::Land Info Option -->

					<!-- begin::Media Option -->
					<Card title="Hình ảnh">
						<template #content>
							<!-- begin::Input Group -->
							<div class="mb-2 h-100" v-if="!postId">
								<!-- begin::Dropzone -->

								<a-upload-dragger
									v-model:fileList="fileList"
									name="file"
									:multiple="true"
									:action="uploadURL"
									@change="handleChange"
									@drop="handleDrop"
									@preview="handlePreview"
									:max-count="10"
								>
									<p class="ant-upload-drag-icon">
										<InboxOutlined></InboxOutlined>
									</p>

									<p class="ant-upload-hint">
										Tải lên tối thiểu 1 hình ảnh, tối đa 20
									</p>
								</a-upload-dragger>
								<a-modal
									:open="previewVisible"
									:title="previewTitle"
									:footer="null"
									@cancel="handleCancel"
								>
									<img
										alt="example"
										style="width: 100%"
										:src="previewImage"
									/>
								</a-modal>

								<!-- end::Dropzone -->
							</div>
							<!-- end::Input Group -->

							<div class="clearfix" v-else>
								<a-upload
									v-model:file-list="fileList"
									:action="uploadURL"
									list-type="picture-card"
									:multiple="true"
									@preview="handlePreview"
								>
									<div v-if="fileList.length < 20">
										<plus-outlined />
										<div style="margin-top: 8px">
											Tải ảnh lên
										</div>
									</div>
								</a-upload>
								<a-modal
									:open="previewVisible"
									:footer="null"
									@cancel="handleCancel"
								>
									<img
										alt="example"
										style="width: 100%"
										:src="previewImage"
									/>
								</a-modal>
							</div>
						</template>
					</Card>
					<!-- end::Media Option -->
				</div>
			</div>
		</a-tab-pane>
		<a-tab-pane
			key="2"
			tab="Bình luận"
			force-render
			:disabled="disabledCommentTab"
		>
			<div class="flex flex-col gap-7 gap-lg-10">
				<Card>
					<template #content>
						<Comment
							:comments="comments"
							@submitComment="onSubmitComment"
						/>
					</template>
				</Card>
			</div>
		</a-tab-pane>
	</a-tabs>
	<!-- end::Tabs -->
	<div class="flex justify-end mb-4">
		<a-button type="default">Hủy</a-button>

		<a-button
			type="primary"
			class="mx-4"
			@click="onSubmit"
			:disabled="
				postId ? disabledSubmit : fileList.length < 1 || disabledSubmit
			"
			:loading="uploading"
			>Lưu</a-button
		>
	</div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import getPostAPI from "../../../api/posts/getDetails";
import getImageDetailAPI from "../../../api/images/getDetail";
import createImageAPI from "../../../api/images/create";
import createPostAPI from "../../../api/posts/create";
import getCommentDetailsAPI from "../../../api/comment/getDetails";
import apiURL from "../../../api/constants";
import router from "../../../router";
import auth from "../../../stores/auth";

const store = auth();
const visible = ref(false);
const route = useRoute();
const disabledCommentTab = ref(false);

const units = [
	{
		value: "1",
		label: "VND",
	},
	{
		value: "2",
		label: "Giá/m2",
	},
	{
		value: "3",
		label: "Thỏa thuận",
	},
];

const soldStatus = [
	{
		value: "1",
		label: "Đã bán",
	},
	{
		value: "0",
		label: "Chưa bán",
	},
];

const status = [
	{
		value: "3",
		label: "Chờ duyệt",
	},
	{
		value: "4",
		label: "Công khai",
	},
	{
		value: "5",
		label: "Không công khai",
	},
];

const priorityStatus = [
	{
		value: "không yêu cầu",
		label: "Không yêu cầu",
	},
	{
		value: "hot",
		label: "Hot",
	},
	{
		value: "tăng chào",
		label: "Tăng chào",
	},
	{
		value: "quy hoạch",
		label: "Quy hoạch",
	},
	{
		value: "giảm chào",
		label: "Giảm chào",
	},
];

const direction = [
	{
		value: "1",
		label: "Đông",
	},
	{
		value: "2",
		label: "Đông Nam",
	},
	{
		value: "3",
		label: "Nam",
	},
	{
		value: "4",
		label: "Tây Nam",
	},
	{
		value: "5",
		label: "Tây",
	},
	{
		value: "6",
		label: "Tây Bắc",
	},
	{
		value: "7",
		label: "Bắc",
	},
	{
		value: "8",
		label: "Đông Bắc",
	},
];

const data = reactive({
	id: "",
	title: "",
	description: "",
	area: "",
	price: "",
	direction: "",
	address: "",
	address_detail: "",
	created_at: "",
	updated_at: "",
	unit: "",
	sold_status: "",
	status_id: "",
	priority_status: "",
	user: "",
	comment: [],
	post_image: [],
});

const disabledSubmit = computed(() => {
	return !(
		data.title &&
		data.description &&
		data.address_detail &&
		data.area &&
		data.price
	);
});

const comments = ref([]);
const isLoading = ref(false);

const postId = route.params.id;

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");

const handleCancel = () => {
	previewVisible.value = false;
	previewTitle.value = "";
};

const handlePreview = async (file) => {
	if (!file.url && !file.preview) {
		file.preview = await getBase64(file.originFileObj);
	}
	previewImage.value = file.url || file.preview;
	previewVisible.value = true;
	previewTitle.value =
		file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
};
// Xử lý input từ các input
let selectorAddress = {
	province: null,
	district: null,
	ward: null,
};

const handleInput = (key, value) => {
	if (key === "province" || key === "district" || key === "ward") {
		selectorAddress[key] = value;
		return;
	}
	data[key] = value;
};

const imagesData = ref([]);
const fileList = ref([]);
if (postId) {
	disabledCommentTab.value = false;
	const fetchPost = async () => {
		isLoading.value = true;
		const post = await getPostAPI.getById(postId);

		Object.keys(data).forEach((key) => {
			data[key] = post[key];
		});
		for (let i = 0; i < data.post_image.length; i++) {
			fileList.value.push({
				...data.post_image[i],
				url: data.post_image[i].image_path,
			});
		}

		if (post.address.split(",").length === 3) {
			const [ward, district, province] = post.address.split(",");
			selectorAddress.province = province.trim();
			selectorAddress.district = district.trim();
			selectorAddress.ward = ward.trim();
		} else {
			const [district, province] = post.address.split(",");
			selectorAddress.province = province.trim();
			selectorAddress.district = district.trim();
		}

		comments.value.push(...post.comment);
	};

	fetchPost(postId);
} else {
	disabledCommentTab.value = true;
}

const handleLoading = (value) => {
	isLoading.value = value;
};

const fetchCommentsList = async (id) => {
	const commentOnPost = await getCommentDetailsAPI(id);
	comments.value = commentOnPost;
};

const onSubmitComment = () => {
	fetchCommentsList();
};

// Xử lý upload nhiều file
const uploadURL = apiURL.baseURL + "/uploadMultiple";
const updateURL = apiURL.baseURL + "/updateMultiple";
const uploading = ref(false);

const handleChange = (info) => {
	const status = info.file.status;
	// if (status !== "uploading") {
	//   console.log(info.file, info.fileList);
	// }
	// if (status === "done") {
	//   message.success(`${info.file.name} file uploaded thành công.`);
	// } else if (status === "error") {
	//   message.error(`${info.file.name} file upload thất bại.`);
	// }
};
function handleDrop(e) {
	console.log(e);
}

// Xử lý submit form
const onSubmit = async () => {
	try {
		const { province, district, ward } = selectorAddress;
		if (ward == null) {
			data.address = `${district}, ${province}`;
		} else {
			data.address = `${ward}, ${district}, ${province}`;
		}

		if (postId) {
			const response = await updatePostAPI.update(postId, data);
			if (response.status == 200) {
				message.success("Cập nhật bài viết thành công");

				const formData = new FormData();
				fileList.value.forEach((file) => {
					formData.append("files[]", file.originFileObj);
				});
				const filteredArray = fileList.value.filter(
					(item) => item.id !== undefined
				);
				formData.append("deleted_files", JSON.stringify(filteredArray));
				formData.append("post_id", response.data.id);
				try {
					const res = await createImageAPI.updatePostImage(formData);

					fileList.value = [];
					uploading.value = false;
					router.go(0);
				} catch (error) {
					uploading.value = false;
					console.log(error);
				}
			} else {
				message.error("Cập nhật bài viết thất bại");
			}
		} else {
			data.sold_status = 0;
			data.status_id = 4;
			data.user_id = store.user.id;
			const response = await createPostAPI(data);
			if (response.status === 201) {
				message.success("Tạo bài viết thành công");

				const formData = new FormData();
				fileList.value.forEach((file) => {
					formData.append("files[]", file.originFileObj);
				});
				formData.append("post_id", response.data.id);
				try {
					const response = await fetch(uploadURL, {
						method: "post",
						body: formData,
					});

					if (!response.ok) {
						message.error("Tải ảnh lên không thành công");
					}
					fileList.value = [];
					uploading.value = false;
					router.push({ name: "post-list" });
				} catch (error) {
					uploading.value = false;
					console.log(error);
				}
			} else {
				message.error("Tạo bài viết thất bại");
			}
		}
	} catch (error) {
		console.error(error);
	}
};
</script>

<script>
import InputArea from "../../../components/base/input/InputArea.vue";
import Comment from "../../../components/base/comment/Comment.vue";
import InputBasic from "../../../components/base/input/InputBasic.vue";
import InputSelect from "../../../components/base/input/InputSelect.vue";
import Card from "../../../components/base/card/Card.vue";
import SelectorAddress from "../../../components/base/selector/SelectorAddress.vue";
import updatePostAPI from "../../../api/posts/update";

export default {
	components: {
		InputArea,
		Comment,
		InputBasic,
		InputSelect,
		Card,
	},
};
</script>
<style lang=""></style>
