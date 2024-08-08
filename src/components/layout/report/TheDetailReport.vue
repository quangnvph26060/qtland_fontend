<template>
  <!-- begin::Tabs -->
  <a-tabs>
    <a-tab-pane >
      <div class="tab-content">
        <div class="flex flex-col gap-lg-10">
          <Card title="Thông tin báo cáo" class="p-0 border-0">
            <template #content>
              <!-- begin::Input Group -->
              <InputBasic
                title="Họ và tên"
                placeholder="Nhập họ và tên"
                  :value="data.name"
                @input="handleInput('name', $event)"
              
              />

              <InputBasic
                title="Số điện thoại"
                placeholder="Nhập số điện thoại"
                :value="data.phone"
                @input="handleInput('phone', $event)"
              />

              <InputBasic
                title="Địa chỉ"
                placeholder="Nhập địa chỉ"
                :value="data.address"
                @input="handleInput('address', $event)"
              />
              <InputBasic
                title="Căn cước công dân"
                placeholder="Nhập căn cước công dân"
                :value="data.cccd"
                @input="handleInput('cccd', $event)"
              />
              <div class="flex-fill me-2">
                <label class="required form-label">Năm sinh</label>
                <input
                  style="padding: 3px 11px"
                  type="date"
                  :placeholder="placeholder"
                  :value="data.birthday ?? ''"
                  v-model="data.birthday"
                  class="form-control"
                />
              </div>
             <InputBasic
                title="Mã tin"
                placeholder="Nhập mã tin"
                :value="data.post_id"
                @input="handleInput('post_id', $event)"
              />

               <div class="flex-fill me-2 mt-3">
                <label class="required form-label">Thời gian dẫn khách</label>
                <input
                  style="padding: 3px 11px"
                  type="date"
                  :placeholder="placeholder"
                  :value="data.time ?? ''"
                  v-model="data.time"
                  class="form-control"
                />
              </div>
            </template>
          </Card>
          <Card title="Hình ảnh" class="p-0 border-0">
            <template #content>
              <!-- begin::Input Group -->
              <div class="mb-2 h-100" v-if="!postId">
                <!-- begin::Dropzone -->

                <a-upload-dragger
                  v-model:fileList="fileList"
                  name="files"
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
                  <img alt="example" style="width: 100%" :src="previewImage" />
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
                    <div style="margin-top: 8px">Tải ảnh lên</div>
                  </div>
                </a-upload>
                <a-modal
                  :open="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </template>
          </Card>
          <!-- end::Media Option -->
        </div>
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
import { reactive, ref, computed, onMounted    } from "vue";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import getReportAPI from "../../../api/report/getDetails";
import getImageDetailAPI from "../../../api/images/getDetail";
import createImageAPI from "../../../api/images/createreport";
import createReportAPI from "../../../api/report/create";
import getCommentDetailsAPI from "../../../api/comment/getDetails";
import apiURL from "../../../api/constants";
import router from "../../../router";
import auth from "../../../stores/auth";

const store = auth();
const visible = ref(false);

const route = useRoute();
const disabledCommentTab = ref(false);

const data = reactive({
    id: "",
    name: "",
    phone: "",
    cccd: "",
    address: "",
    birthday: "",
    time: "",
    description: "",
    created_at: "",
    post_id: "",
    user : "",
    post: "",
    images: "",

});

const disabledSubmit = computed(() => {
  return !(
    data.name &&
    data.phone &&
    data.cccd &&
    data.address && 
    data.post_id
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
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
};
// Xử lý input từ các input

//123
const imagesData = ref([]);
const fileList = ref([]);

onMounted(() => {
    if (postId) {
    disabledCommentTab.value = false;
    const fetchPost = async () => {
      isLoading.value = true;
      const post = await getReportAPI.getById(postId);
      
      Object.keys(data).forEach((key) => {
        data[key] = post[key];
      });
      for (let i = 0; i < data.images.length; i++) {
        fileList.value.push({
          ...data.images[i],
          url: data.images[i].image,
        });
      }
    };

    fetchPost(postId);
  } else {
    disabledCommentTab.value = true;
  }
});

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
const uploadURL = apiURL.baseURL + "/uploadMultiplereport";
const updateURL = apiURL.baseURL + "/updateMultiplereport";
const uploading = ref(false);

function handleDrop(e) {
  console.log(e);
}

// Xử lý submit form
const onSubmit = async () => {
  try {
    if (postId) {
  
      const response = await updateReportAPI.update(postId, data);

      console.log(response);
      if (response && response.status == 200) {
        message.success("Cập nhật báo cáo thành công");

        const formData = new FormData();
        fileList.value.forEach((file) => {
          formData.append("files[]", file.originFileObj);
        });
        const filteredArray = fileList.value.filter(
          (item) => item.id !== undefined
        );
        formData.append("deleted_files", JSON.stringify(filteredArray));
        formData.append("report_id", response.data.id);
        try {
          const res = await createImageAPI.updateReportImage(formData);

          fileList.value = [];
          uploading.value = false;
          router.go(0);
        } catch (error) {
          uploading.value = false;
          console.log(error);
        }
      } else {
        message.error("Cập nhật báo cáo thất bại");
      }
    } else {
      data.user_id = store.user.id;

      const response = await createReportAPI(data);
      if (response && response.status === 201) {
        message.success("Tạo cáo cáo thành công");

        const formData = new FormData();
        fileList.value.forEach((file) => {
          formData.append("files[]", file.originFileObj);
        });
        formData.append("report_id", response.data.id);
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
          router.push({ name: "admin-post-list" });
        } catch (error) {
          uploading.value = false;
          console.log(error);
        }
      } else {
        message.error("Tạo cáo cáo thất bại");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
 const handleInput = (key, value) => {
	if (key === "province" || key === "district" || key === "ward") {
	  selectorAddress[key] = value;
	  return;
	}
	data[key] = value;
  };
</script>
  
  <script>
import InputArea from "../../../components/base/input/InputArea.vue";
import Comment from "../../../components/base/comment/Comment.vue";
import InputBasic from "../../../components/base/input/InputBasic.vue";
import InputSelect from "../../../components/base/input/InputSelect.vue";
import Card from "../../../components/base/card/Card.vue";
import SelectorAddress from "../../../components/base/selector/SelectorAddress.vue";
import updateReportAPI from "../../../api/report/update";

export default {
  components: {
    Comment,
    InputBasic,
    InputSelect,
    Card,
  },
};
</script>
  <style lang=""></style>
  