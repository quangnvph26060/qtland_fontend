<template>
  <!-- begin::Primary Content -->
  <div style="display: flex; justify-content: center">
    <div
      class="flex flex-col"
      :class="
        props.type === 'admin' ? 'col-12' : 'col-12 col-xl-8 xl:pr-[30px]'
      "
    >
      <!-- begin::Main Content -->
      <div :class="props.type === 'admin' ? 'w-4/5 mx-auto' : 'w-full'">
        <!-- begin::Carousel Media -->
        <a-skeleton
          :active="isLoading"
          :avatar="false"
          :title="false"
          :paragraph="{ rows: 15 }"
          v-show="isLoading"
        />
        <div v-show="!isLoading">
          <Carousel
            :postId="postId"
            :post_image="data.post_image"
            @update:isLoading="handleLoading(value)"
          />
        </div>
        <!-- end::Carousel Media -->

        <!-- begin::Detail Info -->
        <div class="detail-info mt-[50px] lg:mt-[50px] space-y-5">
          <!-- begin::Meta Info -->
          <div class="meta-info" id="description-section">
            <div id="title-detail">
              <h1 style="font-size: 26px">{{ data.title }}</h1>
              <span>{{ data.address_detail + "," }} {{ data.address }}</span>
            </div>
            <!-- <a-descriptions :title="data.title">
            <a-descriptions-item style="padding: 0px">
              {{ data.address }}
            </a-descriptions-item>
          </a-descriptions> -->
          </div>
          <!-- end::Meta Info -->
          <a-divider style="margin-top: 15px" />

          <!-- begin::Description -->
          <div class="description" id="features-section">
            <a-descriptions title="Mô tả" :titleStyle="{ fontSize: '18px' }">
              <a-descriptions-item
                label=""
                class="select-all whitespace-pre-line"
              >
                {{ data.description }}
              </a-descriptions-item>
            </a-descriptions>
            <div id="lienhe_phone">
              <div>Liên hệ :</div>
              <div
                v-if="!isPhoneVisible"
                style="display: flex; align-items: center"
              >
                <div style="display: flex">
                  <!-- {{ maskedPhone }} -->
                  {{ data.user.phone }}
                  <!-- <span @click="togglePhoneVisibility" class="show-link"
                  >Hiện</span> -->
                  <a
                    :href="`tel:${data.user.phone}`"
                    class="show-link"
                    style="
                      padding: 5px 13px;
                      background: rgb(0, 155, 161);
                      margin-left: 5px;
                      border-radius: 5px;
                    "
                  >
                    Gọi
                  </a>
                </div>
                {{ data.user.name }}
              </div>
              <div v-else style="display: flex; align-items: center">
                <div style="display: flex">
                  {{ data.user.phone }}
                  <span @click="copyPhoneNumber" class="copy-link">Copy</span>
                </div>
                {{ data.user.name }}
              </div>
            </div>
          </div>
          <!-- <a-divider style="margin-top: 15px" /> -->
          <div class="short-info" id="short-info" style="margin-top: 15px">
            <div class="flex flex-wrap justify-between">
              <div class="info flex justify-between w-100">
                <div class="price">
                  <div class="main_infor mr-1">
                    <span class="title">Mức giá</span>
                    <br />
                    <span class="content">
                      {{ formatMoney(data.price) }}
                      {{ getUnitLabel(data.unit) }}
                    </span>
                  </div>
                </div>
                <div class="area mx-12 main_infor">
                  <span class="title">Diện tích</span>
                  <br />
                  <span class="content"> {{ data.areausable }} m2 </span>
                </div>
                <div
                  class="direction main_infor ml-10"
                  v-if="data.direction !== 0"
                >
                  <span class="title">Hướng nhà</span>
                  <br />
                  <span class="content">
                    {{ getDirectionLabel(data.direction) }}
                  </span>
                </div>
                <div class="flex-end feature flex ml-auto align-items-center">
                  <div>
                    <a-tooltip placement="top">
                      <a-dropdown>
                        <a
                          class="border-none hover:bg-slate-200"
                          v-bind:wave="false"
                        >
                          <ShareAltOutlined :style="{ fontSize: '24px' }" />
                        </a>
                        <template #overlay>
                          <a-menu @click="handleMenuClick">
                            <a-menu-item key="facebook">
                              <span>Chia sẻ lên Facebook</span>
                            </a-menu-item>
                            <a-menu-item key="zalo">
                              <span>Chia sẻ lên Zalo</span>
                            </a-menu-item>
                            <a-menu-item
                              class="border-none"
                              @click="copyCurrentPageUrl()"
                              v-bind:wave="false"
                            >
                              <span>Sao chép đường dẫn</span>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </a-tooltip>
                  </div>

                  <div>
                    <a-tooltip placement="top">
                      <a
                        class="border-none"
                        @click="copyCurrenttitle(data.title)"
                        v-bind:wave="false"
                      >
                        <CopyOutlined :style="{ fontSize: '24px' }" />
                      </a>
                    </a-tooltip>
                  </div>
                  <div class="h">
                    <a-tooltip placement="top">
                      <a
                        class="border-none"
                        @click="toggleHeart"
                        :style="heartStyle"
                        v-bind:wave="false"
                      >
                        <HeartOutlined :style="{ fontSize: '24px' }" />
                      </a>
                    </a-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end::Description -->
          <!-- <a-divider style="margin-top: 0px" /> -->
          <!-- begin::Feature -->
          <div class="feature">
            <a-descriptions
              title="Đặc điểm bất động sản"
              :column="2"
              :labelStyle="{ fontWeight: '500' }"
            >
              <a-descriptions-item
                v-if="data.areausable !== null && data.areausable !== undefined"
                :span="1"
                class="description-item-infor"
              >
                <template #label>
                  <i class="fa-solid fa-object-group"></i> Diện tích</template
                >
                {{ data.areausable }} m&sup2
              </a-descriptions-item>
              <a-descriptions-item
                v-if="
                  data.price !== null &&
                  data.unit !== null &&
                  data.price !== undefined &&
                  data.unit !== undefined
                "
                :span="1"
                class="description-item-infor"
              >
                <template #label>
                  <i class="fas fa-money-bill-wave"></i> Mức giá</template
                >
                {{ formatMoney(data.price) }} {{ getUnitLabel(data.unit) }}
              </a-descriptions-item>
              <a-descriptions-item
                v-if="data.direction !== null && data.direction !== undefined"
                :span="1"
                class="description-item-infor"
              >
                <template #label>
                  <i class="fas fa-compass"></i> Hướng nhà</template
                >
                {{ getDirectionLabel(data.direction) }}
              </a-descriptions-item>
              <a-descriptions-item
                v-if="
                  data.directionBalcony !== null &&
                  data.directionBalcony !== undefined
                "
                :span="1"
                class="description-item-infor"
              >
                <template #label>
                  <i class="fas fa-compass"></i>Hướng ban công</template
                >
                {{ getDirectionLabel(data.directionBalcony) }}
              </a-descriptions-item>
              <a-descriptions-item
                v-if="data.floors !== null && data.floors !== undefined"
                :span="1"
                class="description-item-infor"
              >
                <template #label>
                  <i class="fas fa-building"></i>Số tầng</template
                >
                {{ data.floors }}
              </a-descriptions-item>
              <a-descriptions-item
                v-if="data.pccc !== null && data.pccc !== undefined"
                :span="1"
                class="description-item-infor"
              >
                <template #label>
                  <i class="fas fa-fire-extinguisher pccc-icon"></i
                  >PCCC</template
                >
                {{ data.pccc == 1 ? "Có" : "Không" }}
              </a-descriptions-item>
              <a-descriptions-item
                v-if="data.elevator !== null && data.elevator !== undefined"
                :span="1"
                class="description-item-infor"
              >
                <template #label>
                  <i class="fas fa-elevator icon elevator-icon"></i>Thang
                  máy</template
                >
                {{ data.elevator == 1 ? "Có" : "Không" }}
              </a-descriptions-item>
              <a-descriptions-item
                v-if="data.bonus !== null && data.bonus !== undefined"
                :span="1"
                class="description-item-infor bonus"
              >
                <template #label
                  ><i class="fas fa-percentage icon" style="color: red"></i
                  ><span style="color: red">Hoa hồng</span></template
                >
                <span style="color: red"> {{ data.bonus }}%</span>
              </a-descriptions-item>
              <a-descriptions-item
                v-if="
                  data.bonusmonthly !== null && data.bonusmonthly !== undefined
                "
                :span="1"
                class="description-item-infor bonus"
              >
                <template #label
                  ><i class="fas fa-percentage icon" style="color: red"></i
                  ><span style="color: red">Hoa hồng</span></template
                >
                <span style="color: red"
                  >{{ formatMoney(data.bonusmonthly) }} Vnd/tháng</span
                >
              </a-descriptions-item>
              <a-descriptions-item
                v-if="data.rooms !== null && data.rooms !== undefined"
                :span="1"
                class="description-item-infor"
              >
                <template #label>
                  <i class="fas fa-door-closed icon"></i>Chia phòng</template
                >
                {{ data.rooms }}
              </a-descriptions-item>
              <a-descriptions-item
                v-if="data.bathrooms !== null && data.bathrooms !== undefined"
                :span="1"
                class="description-item-infor"
              >
                <template #label
                  ><i class="fas fa-toilet"></i>Số toilet</template
                >
                {{ data.bathrooms }}
              </a-descriptions-item>

              <a-descriptions-item :span="1" class="description-item-infor">
                <template #label
                  ><i class="fas fa-toilet"></i>Phí dịch vụ</template
                >
                {{ data.unit1 != 3 ? formatPrice(data.priceservice) : "" }}
                {{ getUnitLabel1(data.unit1) }}
              </a-descriptions-item>

              <a-descriptions-item :span="1" class="description-item-infor">
                <template #label
                  ><i class="fas fa-toilet"></i>Giá điện</template
                >
                {{ data.unit2 != 2 ? formatPrice(data.priceElectricity) : "" }}
                {{ getUnitLabel2(data.unit2) }}
              </a-descriptions-item>

              <a-descriptions-item :span="1" class="description-item-infor">
                <template #label
                  ><i class="fas fa-toilet"></i>Giá nước</template
                >
                {{ data.unit3 != 2 ? formatPrice(data.pricewater) : "" }}
                {{ getUnitLabel3(data.unit3) }}
              </a-descriptions-item>
              <a-descriptions-item
                v-if="data.gop !== null && data.gop !== undefined"
                :span="1"
                class="description-item-infor"
              >
                <template #label
                  ><i class="fas fa-money-bill-wave"></i>Cọc</template
                >
                {{ data.gop }} Tháng
              </a-descriptions-item>
              <a-descriptions-item
                v-if="data.pay !== null && data.pay !== undefined"
                :span="1"
                class="description-item-infor"
              >
                <template #label
                  ><i class="fas fa-credit-card"></i>Thanh toán</template
                >
                {{ data.pay }} Tháng
              </a-descriptions-item>
            </a-descriptions>
          </div>
          <!-- end::Feature -->

          <!-- begin::Date -->
          <div class="date" id="comments-section">
            <div class="post_infor-list">
              <div class="post_infor">
                <span class="title">Ngày đăng</span>
                <br />
                <span class="content">
                  {{ formatDateOnly(data.created_at) }}
                </span>
              </div>
              <div class="post_infor">
                <span class="title">Mã tin</span>
                <br />
                <span class="content">
                  {{ data.id }}
                </span>
              </div>
            </div>
          </div>
          <!-- end::Date -->

          <div :class="props.type === 'admin' ? '' : 'block xl:hidden'">
            <a-divider />
            <a-descriptions title="Thông tin người đăng"> </a-descriptions>

            <div class="author flex align-items-center">
              <a-avatar
                :size="64"
                :style="{ backgroundColor: '#ADC178', verticalAlign: 'middle' }"
              >
                {{ data.user.name?.[0] }}
              </a-avatar>
              <div class="author ml-5">
                <h2>{{ data.user.name }}</h2>
              </div>
            </div>
          </div>

          <!-- begin::Comments -->

          <!-- end::Comments -->
        </div>
        <!-- end::Detail Info -->
      </div>
      <div style="margin: 20p 0px" id="pendingw760">
        <div class="flex checkbox_delet_edit">
          <div>
            <button @click="redirectPostPending(data.id)">Duyệt</button>
          </div>
          <div>
            <button
              @click="showConfirmNoPending(data.id)"
              style="padding-right: 35px; padding-left: 35px"
            >
              Không duyệt
            </button>
            <div v-if="isModalVisible1" class="modal">
              <div class="modal-content">
                <span class="close-button" @click="closeModal">&times;</span>
                <p>Bạn có chắc chắn muốn không duyệt bài viết này?</p>
                <p>Hãy ghi chú lý do (nếu có):</p>
                <textarea
                  v-model="data.note"
                  rows="3"
                  placeholder="Ghi chú lý do..."
                  style="
                    width: 100%;
                    padding: 8px;
                    margin-top: 8px;
                    border-radius: 4px;
                    border: 1px solid #d9d9d9;
                  "
                ></textarea>
                <button
                  @click="confirmActionNoPending(data.id)"
                  class="custom-button confirm-button"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end::Main Content -->
    </div>
  </div>
  <!-- end::Primary Content -->
</template>

<script setup>
import {
  HeartOutlined,
  WarningOutlined,
  ShareAltOutlined,
  CopyOutlined,
} from "@ant-design/icons-vue";
import { reactive, ref, onMounted, computed } from "vue";
import { Modal, message, Input } from "ant-design-vue";
import { useRoute } from "vue-router";
import getPostAPI from "../../../api/posts/getDetails";
import listPostsAPI from "../../../api/posts/index";
import getCommentDetailsAPI from "../../../api/comment/getDetails";
import viewedPostsAPI from "../../../api/posts/viewed/index";
import formatMoney from "../../../utils/formatMoney";
import formatDateOnly from "../../../scripts/formatDateOnly";

const copyCurrentPageUrl = () => {
  const url = window.location.href; // Lấy URL của trang web hiện tại

  if (typeof window !== "undefined") {
    // Kiểm tra nếu đang chạy trong môi trường trình duyệt
    if (
      navigator &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          message.success("Sao chép URL trang thành công!");
        })
        .catch((err) => {
          console.error("Không thể sao chép văn bản: ", err);
          fallbackCopyTextToClipboard(url);
        });
    } else {
      fallbackCopyTextToClipboard(url);
    }
  } else {
    console.error("Môi trường không hỗ trợ sao chép văn bản.");
    message.error("Không thể sao chép URL trang.");
  }
};

function formatPrice(value) {
  if (value == null) {
    return ""; // Hoặc bạn có thể trả về một giá trị mặc định nào đó, như "0"
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
import auth from "../../../stores/auth";
const route = useRoute();
const data = reactive({
  id: "",
  title: "",
  description: "",
  price: "",
  area: "",
  areausable: "",
  direction: "",
  directionBalcony: "",
  address: "",
  created_at: "",
  view: 1000,
  sold_status: "",
  classrank: "",
  status_id: "",
  user: "",
  comment: [],
  post_image: [],
  unit: "",
  unit1: "",
  unit2: "",
  unit3: "",
  rooms: "",
  bathrooms: "",
  floors: "",
  address_detail: "",
  pccc: "",
  elevator: "",
  stairs: "",
  bonus: "",
  bonusmonthly: "",
  priceservice: "",
  priceElectricity: "",
  pricewater: "",
  gop: "",
  pay: "",
  note: "",
});

const authStore = auth();

const userId = authStore.getUser.id;
const showOptions = ref(false);

function closeOptions() {
  showOptions.value = false;
}

function copyPhone(phone) {
  if (typeof window !== "undefined") {
    // Kiểm tra nếu đang chạy trong môi trường trình duyệt
    if (
      navigator &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(phone)
        .then(() => {
          message.success("Sao chép thành công!");
        })
        .catch((err) => {
          console.error("Không thể sao chép văn bản: ", err);
          fallbackCopyTextToClipboard(phone);
        });
    } else {
      fallbackCopyTextToClipboard(phone);
    }
  } else {
    console.error("Môi trường không hỗ trợ sao chép văn bản.");
    message.error("Không thể sao chép .");
  }
}

function callPhone() {
  window.location.href = `tel:${data.user.phone}`;
  closeOptions();
}

// lưu
const isHearted = ref(false);

// Hàm để thay đổi trạng thái của nút
const toggleHeart = () => {
  isHearted.value = !isHearted.value;
  if (isHearted.value) {
    message.success("Lưu tin thành công!");
  }
};

// Tính toán kiểu của nút dựa trên trạng thái
const heartStyle = computed(() => ({
  color: isHearted.value ? "red" : "inherit",
}));

const isPhoneVisible = ref(false);

const maskedPhone = computed(() => {
  const phone = datacall.value.user.phone;
  return phone.slice(0, -3) + "***";
});

// // Chuyển đổi hiển thị số điện thoại
const togglePhoneVisibility = () => {
  isPhoneVisible.value = !isPhoneVisible.value;
};

// // Sao chép số điện thoại vào clipboard
const copyPhoneNumber = () => {
  if (typeof window !== "undefined") {
    // Kiểm tra nếu đang chạy trong môi trường trình duyệt
    if (
      navigator &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(datacall.value.user.phone)
        .then(() => {
          message.success("Email đã được sao chép!");
        })
        .catch((err) => {
          console.error("Không thể sao chép văn bản: ", err);
          fallbackCopyTextToClipboard(datacall.value.user.phone);
        });
    } else {
      fallbackCopyTextToClipboard(y);
    }
  } else {
    console.error("Môi trường không hỗ trợ sao chép văn bản.");
    message.error("Không thể sao chép số điện thoại.");
  }
};

const copyEmail = () => {
  if (typeof window !== "undefined") {
    // Kiểm tra nếu đang chạy trong môi trường trình duyệt
    if (
      navigator &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(datacall.value.user.email)
        .then(() => {
          message.success("Email đã được sao chép!");
        })
        .catch((err) => {
          console.error("Không thể sao chép văn bản: ", err);
          fallbackCopyTextToClipboard(datacall.value.user.email);
        });
    } else {
      fallbackCopyTextToClipboard(datacall.value.user.email);
    }
  } else {
    console.error("Môi trường không hỗ trợ sao chép văn bản.");
    message.error("Không thể sao chép số điện thoại.");
  }
};

const copyCurrenttitle = (title) => {
  if (typeof window !== "undefined") {
    if (
      navigator &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(title)
        .then(() => {
          message.success("Sao chép nội dung bài viết thành công!");
        })
        .catch((err) => {
          console.error("Không thể sao chép văn bản: ", err);
          fallbackCopyTextToClipboard(title);
        });
    } else {
      fallbackCopyTextToClipboard(title);
    }
  } else {
    console.error("Môi trường không hỗ trợ sao chép văn bản.");
    message.error("Không thể sao chép .");
  }
};

const handleMenuClick = ({ key }) => {
  const localUrl = "http://example.com";
  const currentUrl = window.location.href;

  const urlToShare = currentUrl.includes("localhost") ? localUrl : currentUrl;

  if (
    urlToShare &&
    (urlToShare.startsWith("http://") || urlToShare.startsWith("https://"))
  ) {
    const encodedUrl = encodeURIComponent(urlToShare);
    let shareUrl = "";

    if (key === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    } else if (key === "zalo") {
      shareUrl = `https://zalo.me/share?url=${encodedUrl}`;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  } else {
    console.error("Invalid URL for sharing:", urlToShare);
  }
};

const props = defineProps({
  type: {
    type: String,
    default: "user",
  },
});

const direction = [
  {
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
  "Bán nhà phố Hồ Chí Minh",
];

const getDirectionLabel = (value) => {
  const directionObj = direction.find((item) => item.value === value);
  return directionObj ? directionObj.label : "";
};

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
const getUnitLabel = (value) => {
  const unitObj = unit.find((item) => item.value == value);
  return unitObj ? unitObj.label : "";
};
const getUnitLabel1 = (value) => {
  const unitObj = unit1.find((item) => item.value == value);
  return unitObj ? unitObj.label : "";
};
const getUnitLabel2 = (value) => {
  const unitObj = unit2.find((item) => item.value == value);
  return unitObj ? unitObj.label : "";
};
const getUnitLabel3 = (value) => {
  const unitObj = unit3.find((item) => item.value == value);
  return unitObj ? unitObj.label : "";
};

const comments = ref([]);

const isLoading = ref(false);

const postId = route.params.id;

const priceChange = ref("up");

onMounted(async () => {
  await viewedPostsAPI.recordView(postId, userId);
});

const datacall = ref({
  user: {
    phone: "",
    name: "",
    email: "",
  },
});
const lengthpost = ref(0);

const fetchPostsList = async (id) => {
  isLoading.value = true;
  const post = await getPostAPI.getById(id);
  const listpost = await listPostsAPI.getPostByUser(post.user.id);
  lengthpost.value = listpost.length;
  if (post && post.user) {
    datacall.value.user.phone = post.user.phone;
    datacall.value.user.name = post.user.name;
    datacall.value.user.email = post.user.email;
  }
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

const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
    message.success("Sao chép thành công!");
  } catch (err) {
    console.error("Không thể sao chép văn bản: ", err);
    message.error("Không thể sao chép văn bản.");
  }
  document.body.removeChild(textArea);
};

const router1 = useRouter();

const redirectPostPending = async (id) => {
  const response = await updatePostAPI.updatepending(id, 4);
  if (response && response.status == 200) {
    message.success("Cập nhật trạng thái cho thuê thành công");
    setTimeout(() => {
      router1.push({ name: "admin-post-browse" });
    }, 1000);
  }
};
const isModalVisible1 = ref(false);
const note = ref("");
const showConfirmNoPending = (id) => {
  isModalVisible1.value = true;
  
};

const closeModal = () => {
  isModalVisible1.value = false;
};

const confirmActionNoPending = async (id) => {
   const response = await updatePostAPI.updatepending(id, 2, data.note);
   isModalVisible1.value = false;
  if (response && response.status == 200) {
    message.success("Cập nhật trạng thái cho thuê thành công");
    setTimeout(() => {
      router1.push({ name: "admin-post-browse" });
    }, 1000);
  }
}
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
import Carousel from "../../../components/base/carousel/Carousel.vue";
import Comment from "../../../components/base/comment/Comment.vue";
import PostCarousel from "../../../components/base/carousel/PostCarousel.vue";
import SidebarFilter from "../../../components/base/sidebar/SidebarFilter.vue";
import updatePostAPI from "../../../api/posts/update";
import { useRouter } from "vue-router";
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
html {
  scroll-behavior: smooth;
}
div.ant-descriptions-title {
  white-space: normal !important;
}

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
.ant-descriptions-header {
  margin: 0px;
}

.post_infor {
  margin-right: 50px;
}

.post_infor .content {
  font-size: 14px;
  line-height: 28px;
  font-weight: 500;
  color: #2c2c2c;
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
  color: #2c2c2c;
  margin-top: 4px;
}

:deep(.ant-descriptions-item.description-item-infor) {
  border-top: 1px solid #f2f2f2;
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
  color: #2c2c2c;
  background: #fff;
  border: solid 1px #ccc;
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 25px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  padding: 13px 15px;
  border-radius: 8px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  transition: ease all 0.5s;
}

.user_button-item:hover {
  background: #fafafa;
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
  letter-spacing: -0.2px;
  padding: 13px 15px;
  border-radius: 8px;
}
.ant-wave {
  display: none !important;
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
  border: 1px solid #07a35d;
  padding: 15px 15px;
  border-radius: 5px;
}
.cta_detail.down {
  border: 1px solid #e03c31;
  padding: 15px 15px;
  border-radius: 5px;
}

.cta_detail.up .cta_number {
  background: url(/assets/logo/icon_up.svg) no-repeat 8px 8px #e7fff4;
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.2px;
  color: #07a35d;
  padding: 5px;
  border-radius: 5px;
}

.cta_detail.down .cta_number {
  background: url(/assets/logo/icon_down.svg) no-repeat 8px 8px #ffc7c3;
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  font-weight: 600;
  color: #e03c31;
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
  outline: 1px solid #f2f2f2;
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
  color: #2c2c2c;
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
.post_tag {
  border-radius: 40px;
  background: #f2f2f2;
  color: #2c2c2c;
  cursor: pointer;
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  padding: 6px 16px;
  margin-right: 8px;
}
.post_tag:hover {
  background: #f2f2f2;
  color: #999;
}
.feature button .ant-wave {
  display: none;
}

div[style*="position: absolute;"] {
  display: none !important;
  z-index: -100;
}
/* .bonus div span {
  color: red !im';
} */
.bonus .ant-descriptions-item-label {
  color: red !important;
}


/* Modal */
.modal {
  display: block; /* Hiển thị modal */
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5); /* Màu nền tối */
}

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 4px;
}

/* Nút đóng modal */
.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-button:hover,
.close-button:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

/* Nút xác nhận trong modal */
.confirm-button {
  margin-top: 15px;
  padding: 5px ;
  width: 100%;
}
</style>
