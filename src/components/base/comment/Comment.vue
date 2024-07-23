<template>
    <div class="comments mt-3">
        <a-descriptions title="Bình luận"> </a-descriptions>
        <div v-if="store.token">
            <div>
                <InputArea :type="'comment'" @submitComment="onSubmitComment" />
            </div>
            <div class="clearfix">
                <a-upload
                    v-model:file-list="fileList"
                    list-type="picture-card"
                    @preview="handlePreview"
                    :before-upload="beforeUpload"
                    @remove="handleRemove"
                >
                    <div v-if="fileList.length < 8">
                        <plus-outlined />
                        <div style="margin-top: 8px">Đăng ảnh</div>
                    </div>
                </a-upload>
                <a-modal
                    :open="previewVisible"
                    :title="previewTitle"
                    :footer="null"
                    @cancel="handleCancel"
                >
                    <img alt="example" class="w-100" :src="previewImage" />
                </a-modal>
            </div>
        </div>
        <a-divider />

        <a-list
            item-layout="vertical"
            size="large"
            :pagination="pagination"
            :data-source="listData"
        >
            <template #renderItem="{ item }">
                <a-comment>
                    <template #author
                        ><a>{{ item.user.name }}</a></template
                    >
                    <template #avatar>
                        <a-avatar
                            :src="item.avatar"
                            size="medium"
                            class="me-2"
                            :style="{
                                backgroundColor: '#ADC178',
                                verticalAlign: 'middle',
                            }"
                        >
                            {{ item.user.name[0] }}
                        </a-avatar>
                    </template>
                    <template #content>
                        <p>
                            {{ item.content }}
                        </p>
                    </template>
                    <template #datetime>
                        {{ dayjs(item.created_at).fromNow() }}
                        <!-- <span>{{ formatDate(item.created_at) }}</span> -->
                    </template>
                    <a-image
                        :key="item.id"
                        :preview="{ visible: false }"
                        :width="100"
                        :src="item.comment_image?.[0]?.image_path"
                        @click="item.visible = true"
                        v-if="item.comment_image?.length > 0"
                    />
                    <div style="display: none">
                        <a-image-preview-group
                            :preview="{
                                visible: item.visible,
                                onVisibleChange: (vis) => (item.visible = vis),
                            }"
                        >
                            <div v-for="image in item.comment_image">
                                <a-image :src="image.image_path" />
                            </div>
                        </a-image-preview-group>
                    </div>
                </a-comment>
            </template>
        </a-list>
    </div>
</template>

<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import auth from "../../../stores/auth";
import { ref, watch, reactive } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import apiURL from "../../../api/constants";

import createCommentAPI from "../../../api/comment/create";
import formatDate from "../../../scripts/formatDate";

const uploading = ref(false);

const route = useRoute();
const store = auth();
const postId = route.params.id;
const uploadURL = apiURL.baseURL + "/uploadMultipleCommentImg";

// Props
const props = defineProps({
    comments: {
        type: Array,
        default: () => [],
    },
});

const emits = defineEmits(["submitComment"]);

// Data
const userComment = ref({
    content: "",
    post_id: route.params.id,
    user_id: "",
});

const listData = ref(props.comments);
watch(
    () => props.comments.length,
    (newVal) => {
        for (let i = 0; i < listData.value.length; i++) {
            listData.value[i] = { ...listData.value[i], visible: false };
        }
    }
);

watch(
    () => props.comments,
    (newVal) => {
        listData.value = newVal;
        for (let i = 0; i < listData.value.length; i++) {
            listData.value[i] = { ...listData.value[i], visible: false };
        }
    }
);

// Methods
const onSubmitComment = (content) => {
    userComment.value.content = content;
    userComment.value.user_id = store.user.id;
    const fetchCreateComment = async () => {
        try {
            const res = await createCommentAPI(userComment.value);

            if (res.status === 201) {
                const formData = new FormData();

                fileList.value.forEach((file) => {
                    formData.append("files[]", file.originFileObj);
                });
                formData.append("post_id", postId);
                formData.append("comment_id", res.data.id);

                try {
                    const response = await fetch(uploadURL, {
                        method: "post",
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error("Upload failed");
                    }
                    emits("submitComment");
                    fileList.value = [];
                    uploading.value = false;
                    message.success("Bình luận thành công");
                } catch (error) {
                    uploading.value = false;
                    message.error(`Upload failed: ${error.message}`);
                }
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    fetchCreateComment();
};

// Pagination
const pagination = reactive({
    pageSize: 5,
    showSizeChanger: true,
    responsive: true,
    showLessItems: true,
    onChange: (page, pageSize) => {},
});

// Preview Image
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
const fileList = ref([]);

const handleRemove = (file) => {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
};

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

// Map image to file list
const beforeUpload = (file) => {
    fileList.value = [...(fileList.value || []), file];
    return false;
};

const handleUpload = async () => {
    const formData = new FormData();

    fileList.value.forEach((file) => {
        formData.append("files[]", file.originFileObj);
    });

    try {
        const response = await fetch(uploadURL, {
            method: "post",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Upload failed");
        }

        fileList.value = [];
        uploading.value = false;
        message.success("Upload successfully.");
    } catch (error) {
        uploading.value = false;
        message.error(`Upload failed: ${error.message}`);
    }
};
</script>

<script>
import InputArea from "../input/InputArea.vue";

export default {};
</script>

<style>
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
