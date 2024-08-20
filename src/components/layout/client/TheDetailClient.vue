<template>
  <!-- begin::Tabs -->
  <a-tabs>
    <a-tab-pane key="1" tab="Thông tin khách hàng">
      <div class="tab-content">
        <div class="flex flex-col gap-lg-10">
          <!-- begin::Basic Info Option -->

          <Card title="Thông tin cơ bản" class="p-0 border-0">
            <template #content>
              <div class="col-12 col-xl-12">
                <!-- begin::Input -->
                <div class="d-flex flex-wrap justify-content-between">
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Họ và tên"
                      placeholder="Họ và tên"
                      :value="data.name?.toString()"
                      @input="handleInput('name', $event)"
                      inputType="text"
                    />
                  </div>
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Số điện thoại"
                      placeholder="Số điện thoại"
                      :value="data.phone?.toString()"
                      @input="handleInput('phone', $event)"
                      inputType="text"
                    />
                  </div>
                  <div class="flex-fill me-2">
                    <label class="required form-label">Năm sinh</label>
                    <input
                      style="padding: 3px 11px"
                      type="date"
                      :placeholder="placeholder"
                      :value="data.birth_year ?? ''"
                      v-model="data.birth_year"
                      class="form-control"
                    />
                  </div>
                </div>
                <!-- end::Input -->
              </div>
              <!-- begin::Input Group -->
              <div class="mb-3">
                <div class="form-label">Địa điểm</div>
                <SelectorAddress
                  @update:selectedProvince="handleInput('province', $event)"
                  @update:selectedDistrict="handleInput('district', $event)"
                  @update:selectedWard="handleInput('ward', $event)"
                  :address="data.address"
                />
              </div>
              <div class="col-12 col-xl-12">
                <!-- begin::Input -->
                <div class="d-flex flex-wrap justify-content-between">
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Email"
                      placeholder="Địa chỉ email"
                      :value="data.email?.toString()"
                      @input="handleInput('email', $event)"
                      inputType="text"
                    />
                  </div>
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Căn cước công dân"
                      placeholder="Căn cước công dân"
                      :value="data.cccd?.toString()"
                      @input="handleInput('cccd', $event)"
                      inputType="text"
                    />
                  </div>
                </div>
                <!-- end::Input -->
              </div>
            </template>
          </Card>

          <Card title="Yêu cầu cho bất động sản" class="p-0 border-0">
            <template #content>
              <!-- begin::Input Group -->
              <InputBasic
                title="Lĩnh vực kinh doanh"
                placeholder="Lĩnh vực kinh doanh"
                :value="data.business"
                @input="handleInput('business', $event)"
              />
              <!-- end::Input Group -->

              <!-- begin::Input Group -->
              <div class="col-12 col-xl-12">
                <!-- begin::Input -->
                <div class="d-flex flex-wrap justify-content-between">
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Khu vực cần tìm"
                      placeholder="Khu vực cần tìm"
                      :value="data.searcharea?.toString()"
                      @input="handleInput('searcharea', $event)"
                      inputType="text"
                    />
                  </div>
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Diện tích (m2)"
                      placeholder="Diện tích"
                      :value="data.area?.toString()"
                      @input="handleInput('area', $event)"
                      inputType="text"
                    />
                  </div>
                </div>
                <!-- end::Input -->
              </div>
              <div class="col-12 col-xl-12">
                <!-- begin::Input -->
                <div class="d-flex flex-wrap justify-content-between">
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Tài chinh "
                      placeholder="Tài chính"
                      :value="data.finance?.toString()"
                      @input="handleInput('finance', $event)"
                      inputType="number"
                    />
                  </div>
                  <div class="flex-fill me-2">
                    <label class="required form-label"
                      >Thòi gian dự kiến chuyển đến
                    </label>
                    <input
                      style="padding: 3px 11px"
                      type="date"
                      :placeholder="placeholder"
                      :value="data.intendtime ?? ''"
                      v-model="data.intendtime"
                      class="form-control"
                    />
                  </div>
                </div>
                <!-- end::Input -->
              </div>

              <div class="col-12 col-xl-12">
                <!-- begin::Input -->
                <div class="d-flex flex-wrap justify-content-between">
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Số người"
                      placeholder="Số người"
                      :value="data.personnumber?.toString()"
                      @input="handleInput('personnumber', $event)"
                      inputType="number"
                    />
                  </div>
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Số xe oto"
                      placeholder="Số xe oto"
                      :value="data.numbercars?.toString()"
                      @input="handleInput('numbercars', $event)"
                      inputType="number"
                    />
                  </div>
                  <div class="flex-fill">
                    <InputBasic
                      title="Số xe máy"
                      placeholder="Số xe máy"
                      :value="data.numbermotor?.toString()"
                      @input="handleInput('numbermotor', $event)"
                      inputType="number"
                    />
                  </div>
                </div>
                <!-- end::Input -->
              </div>

              <!-- end::Input Group -->
            </template>
          </Card>
          <!-- end::Post Info Option -->

          <!-- begin::Land Info Option -->

          <!-- end::Land Info Option -->

          <!-- begin::Media Option -->
          <!-- end::Media Option -->
        </div>
      </div>
    </a-tab-pane>
  </a-tabs>
  <!-- end::Tabs -->
  <div class="flex justify-center mb-4">
    <a-button
      style="display: flex; padding: 20px 35px; align-items: center"
      type="primary"
      @click="onSubmit"
      :loading="uploading"
      >Lưu</a-button
    >
  </div>
</template>
  
  <script setup>
import { reactive, ref, computed } from "vue";
import {
  AlertTwoTone,
  InboxOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import getClientAPI from "../../../api/client/getDetail";
import getImageDetailAPI from "../../../api/images/getDetail";
import createImageAPI from "../../../api/images/create";
import createClientAPI from "../../../api/client/create";
import getCommentDetailsAPI from "../../../api/comment/getDetails";
import apiURL from "../../../api/constants";
import router from "../../../router";
import auth from "../../../stores/auth";
import { useRouter } from "vue-router";
const routerclient = useRouter();
const store = auth();
const visible = ref(false);

const route = useRoute();
const disabledCommentTab = ref(false);

const data = reactive({
  id: "",
  name: "",
  phone: "",
  address: "",
  cccd: "",
  email: "",
  finance: "",
  searcharea: "",
  area: "",
  intendtime: "",
  business: "",
  personnumber: "",
  numbercars: "",
  numbermotor: "",
  note: "",
  birth_year: "",
  user_id: "",
});

const disabledSubmit = computed(() => {
  return !(data.name && data.phone && data.address && data.email);
});

const comments = ref([]);
const isLoading = ref(false);

const clientId = route.params.id;

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
const role = localStorage.getItem("role_id");
const user = localStorage.getItem("user_id");
const handleInput = (key, value) => {
  if (key === "province" || key === "district" || key === "ward") {
    selectorAddress[key] = value;
    return;
  }
  console.log(value);
  data[key] = value;
};

if (clientId) {
  disabledCommentTab.value = false;
  const fetchPost = async () => {
    isLoading.value = true;
    const client = await getClientAPI.getById(clientId);
    console.log(client);
    Object.keys(data).forEach((key) => {
      data[key] = client[key];
    });

    if (client.address.split(",").length === 3) {
      const [ward, district, province] = client.address.split(",");
      selectorAddress.province = province.trim();
      selectorAddress.district = district.trim();
      selectorAddress.ward = ward.trim();
    } else {
      const [district, province] = client.address.split(",");
      selectorAddress.province = province.trim();
      selectorAddress.district = district.trim();
    }

    // comments.value.push(...post.comment);
  };

  fetchPost(clientId);
} else {
  disabledCommentTab.value = true;
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

    if (clientId) {
      const response = await updateClientAPI.update(clientId, data);
      console.log(response);
      if (response && response.status == 200) {
        message.success("Cập nhật bài viết thành công");
        setTimeout(() => {
          if (role == 1 || role == 6) {
            routerclient.push({ name: "admin-client-list" });
          } else {
            routerclient.push({ name: "client-list" });
          }
        }, 1000);
      } else {
        message.error("Cập nhật bài viết thất bại");
      }
    } else {
      data.user_id = user;
      alert(data.user_id);
      const response = await createClientAPI(data);
       console.log(response);
       if (response && response.status == 200) {
        message.success("Thêm bài viết thành công");
        setTimeout(() => {
          if (role == 1 || role == 6) {
            routerclient.push({ name: "admin-client-list" });
          } else {
            routerclient.push({ name: "client-list" });
          }
        }, 1000);
      } else {
        message.error("Thêm bài viết thất bại");
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
import updateClientAPI from "../../../api/client/update";

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
  