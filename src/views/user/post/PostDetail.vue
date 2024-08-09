<template>
  <!-- begin::Primary Content -->
  <div
    class="flex flex-col"
    :class="props.type === 'admin' ? 'col-12' : 'col-12 col-xl-8 xl:pr-[30px]'"
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
          <a-descriptions
            title="Thông tin mô tả"
            :titleStyle="{ fontSize: '18px' }"
          >
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
                {{ maskedPhone }}
                <span @click="togglePhoneVisibility" class="show-link"
                  >Hiện</span
                >
              </div>
              Mr.{{ data.user.name }}
            </div>
            <div v-else style="display: flex; align-items: center">
              <div style="display: flex">
                {{ data.user.phone }}
                <span @click="copyPhoneNumber" class="copy-link">Sao chép</span>
              </div>
              Mr.{{ data.user.name }}
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
                    {{ getUnitLabel(data.unit) }}/tháng
                  </span>
                </div>
              </div>
              <div class="area mx-12 main_infor">
                <span class="title">Diện tích</span>
                <br />
                <span class="content"> {{ data.area }} m2 </span>
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
                    <template #title>
                      <span>Chia sẻ</span>
                    </template>
                    <a-dropdown>
                      <a-button class="border-none hover:bg-slate-200">
                        <ShareAltOutlined :style="{ fontSize: '24px' }" />
                      </a-button>
                      <template #overlay>
                        <a-menu @click="handleMenuClick">
                          <a-menu-item key="facebook">
                            <span>Chia sẻ lên Facebook</span>
                          </a-menu-item>
                          <a-menu-item key="zalo">
                            <span>Chia sẻ lên Zalo</span>
                          </a-menu-item>
                        </a-menu>
                      </template>
                    </a-dropdown>
                  </a-tooltip>
                </div>

                <div>
                  <a-tooltip placement="top">
                    <template #title>
                      <span>Sao chép link</span>
                    </template>
                    <a-button class="border-none" @click="copyCurrentPageUrl()">
                      <CopyOutlined :style="{ fontSize: '24px' }" />
                    </a-button>
                  </a-tooltip>
                </div>
                <div>
                  <a-tooltip placement="top">
                    <template #title>
                      <span>Lưu tin</span>
                    </template>
                    <a-button class="border-none"  @click="toggleHeart" :style="heartStyle">
                      <HeartOutlined :style="{ fontSize: '24px' }" />
                    </a-button>
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
              v-if="data.area !== null && data.area !== undefined"
              :span="1"
              class="description-item-infor"
            >
              <template #label>
                <i class="fa-solid fa-object-group"></i> Diện tích</template
              >
              {{ data.area }} m&sup2
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
              {{ formatMoney(data.price) }} {{ getUnitLabel(data.unit) }}/tháng
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
                <i class="fas fa-fire-extinguisher pccc-icon"></i>PCCC</template
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
              class="description-item-infor"
            >
              <template #label
                ><i class="fas fa-percentage icon"></i>Hoa hồng</template
              >
              {{ data.bonus }} %
            </a-descriptions-item>
            <a-descriptions-item
              v-if="
                data.bonusmonthly !== null && data.bonusmonthly !== undefined
              "
              :span="1"
              class="description-item-infor"
            >
              <template #label
                ><i class="fas fa-percentage icon"></i>Hoa hồng</template
              >
              {{ data.bonusmonthly }}/tháng
            </a-descriptions-item>
            <a-descriptions-item
              v-if="data.rooms !== null && data.rooms !== undefined"
              :span="1"
              class="description-item-infor"
            >
              <template #label>
                <i class="fas fa-door-closed icon"></i>Số phòng</template
              >
              {{ data.rooms }}
            </a-descriptions-item>
            <a-descriptions-item
              v-if="data.bathrooms !== null && data.bathrooms !== undefined"
              :span="1"
              class="description-item-infor"
            >
              <template #label><i class="fas fa-toilet"></i>Số toilet</template>
              {{ data.bathrooms }}
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
          <router-link
            :to="{ name: 'user-post', params: { id: data.user.id } }"
          >
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
          </router-link>
        </div>

        <!-- begin::Comments -->
        <Comment :comments="comments" @submitComment="onSubmitComment" />
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
      <div class="flex flex-col align-items-center py-3">
        <router-link :to="{ name: 'user-post', params: { id: data.user.id } }">
          <div
            class="flex flex-col align-items-center py-3"
            style="cursor: pointer"
          >
            <a-avatar
              :size="64"
              :style="{ backgroundColor: '#ADC178', verticalAlign: 'middle' }"
            >
              {{ data.user.name?.[0] }}
            </a-avatar>
            <h2 class="mt-2">{{ data.user.name }}</h2>
            <a href="#" class="author_posts">Xem thêm 4 tin khác</a>
          </div>
        </router-link>
        <div class="user_button-list" style="width: 70%">
          <a
            class="user_button-item mobile"
            href="#"
            style="margin-bottom: 10px"
          >
            Liên hệ số : {{ data.user.phone }}
          </a>
          <a
            target="_blank"
            class="user_button-item"
            :href="'https://zalo.me/' + data.user.phone"
            style="margin-bottom: 10px"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
              alt=""
              class="user_button-img"
            />
            Chat qua Zalo
          </a>
          <a
            class="user_button-item"
            @click="copyEmail"
            :href="'mailto:'"
            style="margin-bottom: 10px"
          >
            Gửi email
          </a>
          <a class="user_button-item" href="#" style="margin-bottom: 10px">
            Yêu cầu liên hệ lại
          </a>
        </div>
      </div>
    </template>
  </SidebarFilter>
  <!-- end::Sidebar -->
 <div class="footer_mobi" style="position: fixed; bottom:0px; left: 0; background:#ffff;width: 100%; box-shadow: 0px -2px 2px rgba(203,203,203,0.25); ">
        <div class="" style=" display: flex; flex: 1; justify-content:space-around ; padding: 5px 30px; gap:15px ">
          
          <a
            target="_blank"
            class="user_button-item"
            :href="'https://zalo.me/' + data.user.phone"
            style="margin-bottom: 10px; flex: 1; font-weight:600 !important"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
              alt=""
              class="user_button-img" style="margin-right: 10px"
            />
            Chat Zalo
          </a>
          <a
            class="user_button-item mobile"
            @click.prevent="copyToClipboard(data.user.phone)"
            style="margin-bottom: 10px; font-weight:600 !important; flex: 1;align-items:center; background: #009BA1 !important; border: none;"
          >
            {{ data.user.phone }}
          </a>
          
        </div>
 </div>
</template>

<script setup>
import {
  HeartOutlined,
  WarningOutlined,
  ShareAltOutlined,
  CopyOutlined,
} from "@ant-design/icons-vue";
import { reactive, ref, onMounted, computed } from "vue";
import { message } from "ant-design-vue";
import { useRoute } from "vue-router";
import getPostAPI from "../../../api/posts/getDetails";
import getCommentDetailsAPI from "../../../api/comment/getDetails";
import viewedPostsAPI from "../../../api/posts/viewed/index";
import formatMoney from "../../../utils/formatMoney";
import formatDateOnly from "../../../scripts/formatDateOnly";
import copyCurrentPageUrl from "../../../scripts/copyText.js";
import auth from "../../../stores/auth";
const route = useRoute();
const data = reactive({
  id: "",
  title: "",
  description: "",
  price: "",
  area: "",
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
  rooms: "",
  bathrooms: "",
  floors: "",
  address_detail: "",
  pccc: "",
  elevator: "",
  stairs: "",
  bonus: "",
  bonusmonthly: "",
});

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    message.success("Số điện thoại đã được sao chép!");
  }).catch((err) => {
    console.error("Không thể sao chép văn bản: ", err);
    message.error("Không thể sao chép số điện thoại.");
  });
};

// lưu 
const isHearted = ref(false);

// Hàm để thay đổi trạng thái của nút
const toggleHeart = () => {
  isHearted.value = !isHearted.value;
};

// Tính toán kiểu của nút dựa trên trạng thái
const heartStyle = computed(() => ({
  
  color: isHearted.value ? 'red' : 'inherit'
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
  navigator.clipboard
    .writeText(datacall.value.user.phone)
    .then(() => {
      alert("Số điện thoại đã được sao chép vào clipboard!");
    })
    .catch((err) => {
      console.error("Không thể sao chép số điện thoại:", err);
    });
};

const copyEmail = () => {
  navigator.clipboard
    .writeText(datacall.value.user.email)
    .then(() => {
      alert("Email đã được sao chép vào clipboard!");
    })
    .catch((err) => {
      console.error("Không thể sao chép email:", err);
    });
};

const handleMenuClick = ({ key }) => {
  const localUrl = "http://example.com"; // Thay thế bằng URL công khai của bạn
  const currentUrl = window.location.href;

  // Sử dụng URL tạm thời nếu đang ở localhost
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
    value: 1,
    label: "m2",
  },
  {
    value: 2,
    label: "VND",
  },
  {
    value: 3,
    label: "Thảo thuận",
  },
];
const getUnitLabel = (value) => {
  const unitObj = unit.find((item) => item.value === value);
  return unitObj ? unitObj.label : "";
};

const comments = ref([]);

const isLoading = ref(false);

const postId = route.params.id;

const authStore = auth();

const userId = authStore.getUser.id;

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

const fetchPostsList = async (id) => {
  isLoading.value = true;
  const post = await getPostAPI.getById(id);
  console.log(datacall.value.user.phone);
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

</style>
