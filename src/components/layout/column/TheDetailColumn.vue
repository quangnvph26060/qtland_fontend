<template>
  <!-- begin::Tabs -->
  <a-tabs>
    <a-tab-pane key="1" tab="Tổng quan">
      <div class="tab-content">
        <div class="flex flex-col gap-lg-10">
          <!-- begin::Status -->
          <Card title="Trạng thái" class="p-0 border-0">
            <template #content>
              <!-- <div v-if="postId">
                <InputSelect
                  :valueSelected="data.sold_status.toString()"
                  :options="soldStatus"
                  :title="'Trạng thái thuê'"
                  @update:selected="handleInput('sold_status', $event)"
                />
              </div> -->

              <div
                v-if="
                  postId && store.user.role_id != 2 && store.user.role_id != 5
                "
              >
                <InputSelect
                  :valueSelected="data.status_id?.toString()"
                  :options="status"
                  :title="'Trạng thái bài viết'"
                  @update:selected="handleInput('status_id', $event)"
                />
              </div>

              <div>
                <InputSelect
                  :valueSelected="data.priority_status"
                  :options="priorityStatus"
                  :title="'Độ ưu tiên bài viết'"
                  @update:selected="handleInput('priority_status', $event)"
                  placeholder="Không yêu cầu"
                />

                <div
                  v-if="data.priority_status === 'trả phòng'"
                  class="date-picker"
                >
                  <label>Ngày trả phòng </label>
                  <input
                    type="date"
                    id="datetime-picker"
                    v-model="formattedDate"
                    @change="handleDateChange"
                  
                    class="datetime-input"
                  />
                </div>
              </div>
            </template>
          </Card>
          <!-- end::Status -->

          <!-- begin::Basic Info Option -->
          <Card title="Thông tin cơ bản" class="p-0 border-0">
            <template #content>
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
              <!-- end::Input Group -->

              <!-- begin::Input Group -->
              <a-form>
                <InputBasic
                  title="Địa chỉ hiển thị trên tin đăng"
                  placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ, ..."
                  :value="data.address_detail"
                  @input="handleInput('address_detail', $event)"
                />
              </a-form>

              <!-- end::Input Group -->
            </template>
          </Card>
          <!-- end::Basic Info Option -->

          <!-- begin::Post Info Option -->
          <Card title="Thông tin bài viết" class="p-0 border-0">
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
          <Card title="Thông tin bất động sản" class="p-0 border-0">
            <template #content>
              <InputSelect
                title="Hạng văn phòng"
                :options="classrank"
                :valueSelected="
                  data.classrank?.toString() !== '0'
                    ? data.classrank?.toString()
                    : null
                "
                @update:selected="handleInput('classrank', $event)"
                placeholder="Chọn hạng văn phòng"
              />
              <!-- begin::Input Group -->
              <InputBasic
                title="Diện tích xây dựng"
                placeholder="Nhập diện tích, VD: 80"
                :value="data.area?.toString()"
                @input="handleInput('area', $event)"
                inputType="number"
              />
              <!-- end::Input Group -->
              <!-- begin::Input Group -->
              <InputBasic
                title="Diện tích sử dụng"
                placeholder="Nhập diện tích, VD: 80"
                :value="data.areausable?.toString()"
                @input="handleInput('areausable', $event)"
                inputType="number"
              />
              <!-- end::Input Group -->

              <!-- begin::Input Group -->
              <div class="flex justify-between flex-wrap price_unit">
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
                    :options="unit"
                    :valueSelected="data.unit?.toString()"
                    @update:selected="handleInput('unit', $event)"
                    placeholder="VND"
                  />

                  <!-- end::Select -->
                </div>
              </div>
              <!-- end::Input Group -->
              <!-- begin::Input Group -->
              <div class="flex justify-between flex-wrap price_unit">
                <div class="col-12 col-xl-8">
                  <!-- begin::Input -->
                  <InputBasic
                    title="Giá dịch vụ"
                    placeholder="Nhập giá, VD: 1200000"
                    :value="data.priceservice?.toString()"
                    @input="handleInput('priceservice', $event)"
                    inputType="number"
                  />
                  <!-- end::Input -->
                </div>
                <div class="col-12 col-xl-3">
                  <InputSelect
                    title="Đơn vị"
                    :options="unit1"
                    :valueSelected="data.unit1?.toString()"
                    @update:selected="handleInput('unit1', $event)"
                    placeholder="VND"
                  />

                  <!-- end::Select -->
                </div>
              </div>
              <div class="flex justify-between flex-wrap price_unit">
                <div class="col-12 col-xl-8">
                  <!-- begin::Input -->
                  <InputBasic
                    title="Giá điện"
                    placeholder="Nhập giá, VD: 1200000"
                    :value="data.priceElectricity?.toString()"
                    @input="handleInput('priceElectricity', $event)"
                    inputType="number"
                  />
                  <!-- end::Input -->
                </div>
                <div class="col-12 col-xl-3">
                  <InputSelect
                    title="Đơn vị"
                    :options="unit2"
                    :valueSelected="data.unit2?.toString()"
                    @update:selected="handleInput('unit2', $event)"
                    placeholder="VND"
                  />

                  <!-- end::Select -->
                </div>
              </div>
              <div class="flex justify-between flex-wrap price_unit">
                <div class="col-12 col-xl-8">
                  <!-- begin::Input -->
                  <InputBasic
                    title="Giá nước"
                    placeholder="Nhập giá, VD: 1200000"
                    :value="data.pricewater?.toString()"
                    @input="handleInput('pricewater', $event)"
                    inputType="number"
                  />
                  <!-- end::Input -->
                </div>
                <div class="col-12 col-xl-3">
                  <InputSelect
                    title="Đơn vị"
                    :options="unit3"
                    :valueSelected="data.unit3?.toString()"
                    @update:selected="handleInput('unit3', $event)"
                    placeholder="VND"
                  />

                  <!-- end::Select -->
                </div>
              </div>
              <!-- end::Input Group -->
              <div class="col-12 col-xl-12">
                <!-- begin::Input -->
                <div class="d-flex flex-wrap justify-content-between">
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Số tầng"
                      placeholder="Nhập số tầng"
                      :value="data.floors?.toString()"
                      @input="handleInput('floors', $event)"
                      inputType="number"
                    />
                  </div>
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Chia phòng"
                      placeholder="Nhập chia phòng"
                      :value="data.rooms?.toString()"
                      @input="handleInput('rooms', $event)"
                      inputType="number"
                    />
                  </div>
                  <div class="flex-fill">
                    <InputBasic
                      title="Số nhà vệ sinh"
                      placeholder="Nhập số nhà vệ sinh"
                      :value="data.bathrooms?.toString()"
                      @input="handleInput('bathrooms', $event)"
                      inputType="number"
                    />
                  </div>
                </div>
                <!-- end::Input -->
              </div>

              <div class="col-12 col-xl-12">
                <!-- begin::Header and Inputs -->
                <div class="d-flex align-items-center mobitrichthuong">
                  <!-- Tiêu đề -->
                  <div class="me-4 flex-shrink-0 trichthuong">
                    <h3
                      class="mb-0"
                      style="
                        padding-bottom: 10px;
                        font-size: 14px;
                        color: black;
                      "
                    >
                      Trích thưởng
                    </h3>
                  </div>
                  <!-- Các input -->
                  <div class="d-flex flex-grow-1 align-items-center mobiinput">
                    <!-- Phần trăm input -->
                    <div class="d-flex align-items-center">
                      <InputBasic
                        title=""
                        placeholder="Nhập phần trăm, VD: 10"
                        :value="data.bonus ? data.bonus : ''"
                        @input="handleInput('bonus', $event)"
                        inputType="number"
                      />
                      <span class="ms-2" style="font-weight: 700 !important"
                        >%</span
                      >
                    </div>
                    <!-- Từ "hoặc" -->
                    <span class="mx-3 align-self-center">hoặc</span>
                    <!-- Tiền input -->
                    <div class="d-flex align-items-center flex-grow-1 col-xl-3">
                      <InputBasic
                        title=""
                        placeholder="Nhập tiền, VD: 12000000"
                        :value="
                          data.bonusmonthly ? data.bonusmonthly.toString() : ''
                        "
                        @input="handleInput('bonusmonthly', $event)"
                        inputType="number"
                      />
                      <span class="ms-2" style="font-weight: 500 !important"
                        >VND</span
                      >
                    </div>
                  </div>
                </div>
                <!-- end::Header and Inputs -->
              </div>

              <div class="col-12 col-xl-12 thanhtoan">
                <!-- begin::Header and Inputs -->
                <div class="d-flex align-items-center justify-content-start">
                  <!-- Tiêu đề bao quanh -->
                  <div class="me-4 flex-shrink-0 title">
                    <h3 class="mb-0" style="font-size: 14px; color: black">
                      Hình thức thanh toán
                    </h3>
                  </div>
                  <!-- Các input -->
                  <div class="d-flex flex-wrap align-items-center gop_pay">
                    <!-- Tiêu đề "Cọc" -->
                    <div class="gop">
                      <div class="me-4">
                        <h3
                          class="mb-0"
                          style="
                            font-size: 14px;
                            color: black;
                            font-weight: 500 !important;
                          "
                        >
                          Cọc
                        </h3>
                      </div>
                      <!-- Input cho "Cọc" -->
                      <div class="d-flex align-items-center">
                        <InputBasic
                          title=""
                          placeholder="Nhập tháng cọc, VD: 3"
                          :value="data.gop ? data.gop : ''"
                          @input="handleInput('gop', $event)"
                          inputType="number"
                        />
                        <span class="ms-2" style="font-weight: 500 !important"
                          >Tháng</span
                        >
                      </div>
                    </div>

                    <div id="gop_pay" style="width: 50px"></div>
                    <!-- Phần cách "hoặc" -->
                    <div class="pay">
                      <div class="me-4">
                        <h3
                          class="mb-0"
                          style="
                            font-size: 14px;
                            color: black;
                            font-weight: 500 !important;
                          "
                        >
                          Thanh toán
                        </h3>
                      </div>
                      <!-- Input cho "Cọc" -->
                      <div class="d-flex align-items-center">
                        <InputBasic
                          title=""
                          placeholder="Thanh toán 1 lần, VD: 3"
                          :value="data.pay ? data.pay : ''"
                          @input="handleInput('pay', $event)"
                          inputType="number"
                        />
                        <span class="ms-2" style="font-weight: 500 !important"
                          >Tháng</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end::Header and Inputs -->
              </div>

              <InputSelect
                title="Hướng nhà"
                :options="direction"
                :valueSelected="
                  data.direction?.toString() !== '0'
                    ? data.direction?.toString()
                    : null
                "
                @update:selected="handleInput('direction', $event)"
                placeholder="Chọn hướng nhà"
              />

              <InputSelect
                title="Hướng ban công"
                :options="direction"
                :valueSelected="
                  data.directionBalcony?.toString() !== '0'
                    ? data.directionBalcony?.toString()
                    : null
                "
                @update:selected="handleInput('directionBalcony', $event)"
                placeholder="Chọn hướng ban công"
              />
              <div class="col-12 col-xl-12">
                <!-- begin::Input -->
                <div class="d-flex flex-wrap justify-content-between">
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Đường vào"
                      placeholder="Diện tích đường vào"
                      :value="data.wayin?.toString()"
                      @input="handleInput('wayin', $event)"
                      inputType="number"
                    />
                  </div>
                  <div class="flex-fill me-2">
                    <InputBasic
                      title="Mặt tiền"
                      placeholder="Diện tích mặt tiền"
                      :value="data.font?.toString()"
                      @input="handleInput('font', $event)"
                      inputType="number"
                    />
                  </div>
                </div>
                <!-- end::Input -->
              </div>
              <div class="col-12 col-xl-12" id="radio-buttons">
                <div class="d-flex flex-wrap justify-content-between">
                  <!-- Phòng cháy chữa cháy -->
                  <div class="flex-fill me-2">
                    <label>Phòng cháy chữa cháy:</label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        :checked="data.pccc === 1"
                        id="pcccYes"
                        name="pccc"
                        value="1"
                        @change="checkRadio('pccc', 1)"
                      />
                      <label class="form-check-label" for="pcccYes"> Có </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        :checked="data.pccc === 0"
                        id="pcccNo"
                        name="pccc"
                        value="0"
                        @change="checkRadio('pccc', 0)"
                      />
                      <label class="form-check-label" for="pcccNo">
                        Không
                      </label>
                    </div>
                  </div>

                  <!-- Thang máy -->
                  <div class="flex-fill me-2">
                    <label>Thang máy:</label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        :checked="data.elevator === 1"
                        id="elevatorYes"
                        name="elevator"
                        value="1"
                        @change="checkRadio('elevator', 1)"
                      />
                      <label class="form-check-label" for="elevatorYes">
                        Có
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        :checked="data.elevator === 0"
                        id="elevatorNo"
                        name="elevator"
                        value="0"
                        @change="checkRadio('elevator', 0)"
                      />
                      <label class="form-check-label" for="elevatorNo">
                        Không
                      </label>
                    </div>
                  </div>

                  <!-- Thang bộ -->
                  <!-- <div class="flex-fill me-2">
					  <label>Thang bộ:</label>
					  <div class="form-check">
						<input
						  class="form-check-input"
						  type="radio"
						  :checked="data.stairs === 1"
						  id="stairsYes"
						  name="stairs"
						  value="1"
						  @change="checkRadio('stairs',1)"
						/>
						<label class="form-check-label" for="stairsYes">
						  Có
						</label>
					  </div>
					  <div class="form-check">
						<input
						  class="form-check-input"
						  type="radio"
						  :checked="data.stairs === 0"
						  id="stairsNo"
						  name="stairs"
						  value="0"
						  @change="checkRadio('stairs',0)"
						/>
						<label class="form-check-label" for="stairsNo">
						  Không
						</label>
					  </div>
					</div> -->
                </div>
              </div>
            </template>
          </Card>
          <!-- end::Land Info Option -->

          <!-- begin::Media Option -->
          <Card title="Hình ảnh" class="p-0 border-0">
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
    <a-tab-pane
      key="2"
      tab="Bình luận"
      force-render
      :disabled="disabledCommentTab"
    >
      <div class="flex flex-col gap-lg-10">
        <Card>
          <template #content>
            <Comment :comments="comments" @submitComment="onSubmitComment" />
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
import { reactive, ref, computed, watch } from "vue";
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

const unit = [
  {
    value: "1",
    label: "Vnd/m2",
  },
  {
    value: "2",
    label: "Vnd/tháng",
  },
];
const unit1 = [
  {
    value: "1",
    label: "Vnd/tháng",
  },
  {
    value: "2",
    label: "Vnd/m2",
  },
  {
    value: "3",
    label: "Miễn phí",
  },
];
const unit2 = [
  {
    value: "1",
    label: "Vnd/Số",
  },
  {
    value: "2",
    label: "Miễn phí",
  },
];

const unit3 = [
  {
    value: "1",
    label: "Vnd/m3",
  },
  {
    value: "2",
    label: "Miễn phí",
  },
];

const soldStatus = [
  {
    value: "1",
    label: "Đã thuê",
  },
  {
    value: "0",
    label: "Chưa thuê",
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
    value: "khách nhượng",
    label: "Khách nhượng",
  },
  {
    value: "trả phòng",
    label: "Trả phòng",
  },
];

const priorityStatusSelected = ref("");
const returnDate = ref("");

const handleInput1 = (value) => {
  priorityStatusSelected.value = value;
};

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

const classrank = [
  {
    value: "1",
    label: "Hạng A",
  },
  {
    value: "2",
    label: "Hạng B",
  },
  {
    value: "3",
    label: "Hạng C",
  },
  {
    value: "4",
    label: "Hạng Cowking",
  },
];

const data = reactive({
  id: "",
  title: "",
  description: "",
  classrank: "",
  area: "",
  areausable: "",
  price: "",
  priceservice: "",
  priceElectricity: "",
  pricewater: "",
  floors: "",
  rooms: "",
  bathrooms: "",
  bonus: "",
  bonusmonthly: "",
  direction: "",
  directionBalcony: "",
  wayin: "",
  font: "",
  pccc: "",
  elevator: "",
  stairs: "",
  address: "",
  address_detail: "",
  created_at: "",
  updated_at: "",
  unit: "",
  unit1: "",
  unit2: "",
  unit3: "",
  sold_status: "",
  status_id: "",
  priority_status: "",
  user: "",
  comment: [],
  post_image: [],
  gop: "",
  pay: "",
  traphong: "",
});

const formattedDate = ref("");
const handleDateChange = (event) => {
  const date = event.target.value; // Giá trị từ input kiểu "YYYY-MM-DD"
  if (date) {
    data.traphong = date; // Cập nhật giá trị ngày không có giờ vào data.traphong
  } else {
    // Nếu không có giá trị, thiết lập data.traphong là rỗng
    data.traphong = "";
  }
};

// Theo dõi sự thay đổi của data.traphong và cập nhật formattedDate
watch(() => data.traphong, (newVal) => {
  formattedDate.value = newVal; // Cập nhật formattedDate khi data.traphong thay đổi
});

const disabledSubmit = computed(() => {
  return !(
    data.title &&
    data.description &&
    data.classrank &&
    data.area &&
    data.areausable &&
    data.price &&
    data.priceservice &&
    data.priceElectricity &&
    data.pricewater &&
    data.floors &&
    data.rooms &&
    data.bathrooms &&
    (data.bonus || data.bonusmonthly) &&
    data.direction &&
    data.directionBalcony &&
    data.wayin &&
    data.font &&
    data.pccc &&
    data.elevator &&
    // data.address &&
    data.address_detail &&
    data.unit &&
    // data.unit1 &&
    // data.unit2 &&
    // data.unit3 &&
    data.gop &&
    data.pay
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
  unit: null,
  unit1: null,
  unit2: null,
  unit3: null,
};

const handleInput = (key, value) => {
  if (key === "province" || key === "district" || key === "ward") {
    selectorAddress[key] = value;
    return;
  }
  if (key === "priority_status") {
    priorityStatusSelected.value = value;
  }
  data[key] = value;
};

const checkRadio = (key, value) => {
  data[key] = value;
};

const imagesData = ref([]);
const fileList = ref([]);

if (postId) {
  disabledCommentTab.value = false;
  const fetchPost = async () => {
    isLoading.value = true;
    const post = await getPostAPI.getById(postId);
    console.log(post);
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

      console.log(response);
      if (response && response.status == 200) {
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

          const role = localStorage.getItem("role_id");
          if (role == 6 || role == 1) {
            router.push({ name: "admin-post-list" });
          } else {
            router.push({ name: "post-manage" });
          }
          fileList.value = [];
          uploading.value = false;
          // router.go(0);
        } catch (error) {
          uploading.value = false;
          console.log(error);
        }
      } else {
        message.error("Cập nhật bài viết thất bại");
      }
    } else {
      data.sold_status = 0;
      data.status_id = 3;
      data.user_id = store.user.id;
      
      const response = await createPostAPI(data);
      if (response && response.status === 201) {
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
          const role = localStorage.getItem("role_id");
          if (role == 6 || role == 1) {
            router.push({ name: "admin-post-list" });
          } else {
            router.push({ name: "post-manage" });
          }
          fileList.value = [];
          uploading.value = false;
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
  <style >
.date-picker {
  display: flex !important;
  flex-direction: column !important;
}
.date-picker label {
  font-weight: 600 !important;
  padding: 10px 0px !important;
}
.date-picker input {
  border: 1px solid rgb(187, 184, 184);
  border-radius: 5px;
  padding: 3px 6px;
}
</style>
  