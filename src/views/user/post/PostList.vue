<template>
  <!-- <a-modal v-model:open="openBanner" :footer="null" width="1000px" height="500px" class="banner top-[30%] md:top-[20%] lg:top-[15%]">
            <a-image :src="apiURL.URL+'/storage/upload/images/banners/qc.jpg'" alt="Banner" class="w-full" :preview="false" />
        </a-modal> -->
  <!-- begin::Primary Content -->
  <div class="flex flex-col col-12 col-xl-10 relative">
    <div class="w-full mt-20 lg:mt-10">
      <!-- <ThePageHeader /> -->
    </div>

    <!-- begin::Content Navbar -->
    <div class="flex align-content-center justify-between my-3 w-full">
      <!-- begin::Total land -->

      <a-skeleton-input v-if="isLoading" />
      <div v-else class="flex w-full justify-between align-items-center" style="padding: 0px 20px 0px 0px">
        <span>Hiện có {{ data ? total : 0 }} bất động sản </span>
        <div>
          <a-select ref="select" v-model:value="value1" style="width: 120px" :options="options1" @focus="focus"
            @change="handleChange">
          </a-select>
        </div>
      </div>
      <!-- end::Total land -->
    </div>
    <!-- end::Content Navbar -->

    <!-- begin::Main Content -->
    <div class="space-y-10 mb-5 main-flex">
      <!-- begin::Content Item -->
      <!-- <a-skeleton v-if="isLoading" :active="true" /> -->
      <a-list item-layout="vertical" size="large" class="demo" :data-source="data" :pagination="pagination">
        <template #header>
          <div class="text-xl font-semibold">Danh sách bài viết</div>
        </template>

        <template #renderItem="{ item, index }">
          <div :key="item.id" class="w-full md:w-1/4 p-2 post-container">
            <div class="border rounded-lg overflow-hidden flex flex-column h-full post-item">
              <router-link :to="{ name: 'post-detail', params: { id: item.id } }" class="block">
                <div class="relative h-48">
                  <img :src="item.post_image?.[0]?.image_path" class="w-full h-full object-cover" alt="Post Image" />
                  <div class="absolute top-2 left-2 px-2 py-1 text-white bg-red-500 rounded">
                    {{ item.priority_status }} <span> {{ item.traphong && item.priority_status == 'trả phòng' ?
                      formatDate(item.traphong) : "" }}</span>
                  </div>
                </div>
                <div style="padding: 5px 11px 6px 12px">
                  <h2 class="text-lg font-semibold line-clamp-2" style="height: 56px">
                    {{ item.floors }} - {{ item.address_detail }} {{ item.areausable }}/{{ item.area }} {{ item.font }}
                    {{ item.price / 1000000 }}tr
                  </h2>
                  <div class="flex align-items-center">
                    <div class="text-red-500 text-base mr-1">
                      {{ formatMoney(item.price) }}
                    </div>

                    <div class="text-red-500 text-base">
                      {{ item.areausable }} m<sup>2</sup>
                    </div>
                  </div>
                  <div class="mt-2 line-clamp-2 main_text_address">
                    {{ item.address }}
                  </div>
                  <a-divider style="margin-bottom: 8px; margin-top: 5px" />
                </div>
              </router-link>
              <div class="demo" style="padding: 5px 15px">
                <div class="flex items-baseline justify-content-between" style="flex-wrap: wrap">
                  <div style="display: flex">
                    <a-avatar class="me-2" :src="item.user_info.avatar || ''" :style="{
                      backgroundColor: '#ADC178',
                      verticalAlign: 'middle',
                    }">
                      <template v-if="!item.user_info.avatar">
                        {{ item.user_info.name[0] }}
                      </template>
                    </a-avatar>
                    <div class="flex flex-col">
                      <div>{{ item.user_info.name }}</div>
                      <div style="font-size: 13px; color: gray">
                        {{ item.updated_at }}
                      </div>
                    </div>
                  </div>
                  <div id="lienhe_phone" style="color: #ffff; font-weight: 600">
                    <div v-if="!isPhoneVisible[item.id]" style="display: flex; align-items: center; margin: 0px">
                      <div style="
                          display: flex;
                          background: #009ba1;
                          align-items: center;
                          padding: 5px 10px;
                          border-radius: 5px;
                        ">
                        <a :href="'tel:' + item.user_info.phone" style=" color: inherit;">
                          <i style="padding: 0px 10px 0px 0px" class="fa-solid fa-phone"></i>{{ item.user_info.phone }}
                        </a>

                      </div>
                    </div>
                    <div v-else style="
                        display: flex;
                        align-items: center;
                        margin: 0px;
                        background: #009ba1;
                        padding: 0px 5px;
                        border-radius: 5px;
                      ">
                      <div style="display: flex; align-items: center">
                        {{ item.user_info.phone }}
                        <span @click="copyPhoneNumber(item.user_info.phone)" class="copy-link">.Copy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </a-list>
      <!-- end::Content Item -->
    </div>

    <!-- end::Main Content -->
  </div>
  <!-- end::Primary Content -->

  <!-- begin::Sidebar -->
  <SidebarFilter class="right-[14.5vw] sidebar-filter" />
  <!-- end::Sidebar -->
</template>

<script setup>
import listPostsAPI from "../../../api/posts/index";
import getTimeSincePostCreation from "../../../utils/getTimeSincePostCreation";
import {
  ref,
  reactive,
  watch,
  onBeforeUnmount,
  onMounted,
  nextTick,
  computed,
  onBeforeMount
} from "vue";
import formatMoney from "../../../utils/formatMoney";
import auth from "../../../stores/auth";
import router from "../../../router";
import filterRange from "../../../stores/filterRange";
import { gsap } from "gsap";
import apiURL from "../../../api/constants";
import { message } from "ant-design-vue";
import formatDate from "../../../scripts/formatDate";

const text5 = ref(null);
const user_create_id = localStorage.getItem("user_create_id");
onMounted(() => {
  const text5Element = text5.value;

  if (text5Element) {
    // Replace text with span-wrapped characters
    text5Element.innerHTML = text5Element.textContent.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='_text3'>$&</span>"
    );

    const $text5 = text5Element.querySelectorAll("span");
    const tl_5 = gsap.timeline({ repeat: -1 });

    tl_5
      .staggerFrom(
        $text5,
        0.5,
        { opacity: 0, x: 40, ease: "power1.out" },
        0.1,
        "+=1.2"
      )
      .staggerTo(
        $text5,
        0.5,
        { opacity: 0, x: -40, ease: "power1.out" },
        0.1,
        "+=1.5"
      );
  }
});
const filterStore = filterRange();
const openBanner = ref(true);

let filter = filterStore.getAll;
console.log(filter);

// onBeforeUnmount(() => {
//   filterStore.resetFilters();
// });

const props = defineProps({
  rangeArea: String,
  rangePrice: String,
  dirs: String,
  address: String,
  classrank: String,
});

const store = auth();
const role = localStorage.getItem("role_id");
const useid = localStorage.getItem('user_id');

const total = ref(0);
const data = ref([]);

const isLoading = ref(false);

if (!store.token) {
  router.push({ name: "login" });
}

// Lọc bài viết theo ưu tiên
const value1 = ref("all");
const options1 = ref([
  {
    value: "all",
    label: "Tất cả",
  },
  {
    value: "khách nhượng",
    label: "Khách nhượng",
  },
  {
    value: "mới",
    label: "Mới",
  },
  {
    value: "trả phòng",
    label: "Trả phòng",
  },
]);

const focus = () => {
  // console.log("focus");
};
const handleChange = (value) => {
  value1.value = value;
  fetchPostsFilter(filter, pageFilter.value, pageSizeFilter.value, value);
};

const pageFilter = ref(1);
const pageSizeFilter = ref(10);
const currentPage = ref(1);

const datacall = ref({
  user: {
    phone: "",
    name: "",
    email: "",
  },
});

const fetchPostsFilter = async (
  filter,
  page = 1,
  pageSize = 10,
  priority_status = "all"
) => {
  isLoading.value = true;
  data.value = [];

  let listPosts;
  let res;
  // console.log(role);

  if (role == 2) {
    res = await listPostsAPI.getPostBySoldFilterByUser(useid, {
      ...filter,
      page: pageFilter.value,
      pageSize: pageSizeFilter.value,
      priority_status: value1.value,
    });


  } else if (role == 7) {
    res = await listPostsAPI.getPostBySoldFilterByUser(user_create_id, {
      ...filter,
      page: pageFilter.value,
      pageSize: pageSizeFilter.value,
      priority_status: value1.value,
    });

  } else {
    res = await listPostsAPI.getPostBySoldFilter({
      ...filter,
      page: pageFilter.value,
      pageSize: pageSizeFilter.value,
      priority_status: value1.value,
    });
  }

  listPosts = res.data;
  total.value = res.total + 3000;
  const ans = reactive({
    id: "",
    title: "",
    description: "",
    price: "",
    direction: "",
    areausable: "",
    address: "",
    created_at: "",
    updated_at: "",
    views_count: 0,
    sold_status: "",
    status_id: "",
    priority_status: "",
    classrank: "",
    user: "",
    comment: [],
    post_image: [],
    user_info: "",
    user_id: "",
    traphong: "",
    address_detail: "",
    floors: "",
    wayin: "",
    area: "",
    font: ""

  });

  const posts = [];
  if (listPosts.length === 0) {
    isLoading.value = false;
    return;
  }

  for (let i = 0; i < listPosts.length; i++) {
    const post = listPosts[i];

    if (post && post.user_info) {
      datacall.value.user.phone = post.user_info.phone;
      datacall.value.user.name = post.user_info.name;
      datacall.value.user.email = post.user_info.email;
    }

    Object.keys(ans).forEach((key) => {
      ans[key] = post[key];
    });
    ans.created_at = getTimeSincePostCreation(post.created_at);
    ans.updated_at = getTimeSincePostCreation(post.updated_at);
    posts.push({ ...ans });
  }

  data.value = posts;
  isLoading.value = false;
};
onBeforeMount(() => {
  fetchPostsFilter(filter);
  console.log('Component được mount');
});

fetchPostsFilter(filter);
const pagination = reactive({
  showSizeChanger: true,
  responsive: true,
  current: currentPage.value,
  showLessItems: true,
  total: total.value,
  onChange: (page, pageSize) => {
    pageFilter.value = page;
    pageSizeFilter.value = pageSize;
    fetchPostsFilter({
      ...filter,
      page: page,
      pageSize: pageSize,
      priority_status: value1.value,
    });
    scrollToTop();
  },
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

watch(props, () => {
  filter = filterStore.getAll;
  fetchPostsFilter({
    ...filter,
    page: pageFilter.value,
    pageSize: pageSizeFilter.value,
  });
});


watch(total, (newVal) => {
  pagination.total = newVal;
  total.value = newVal;
});

watch(pageFilter, (newVal) => {
  pagination.current = newVal;
});

const isPhoneVisible = ref({});

const maskedPhone = computed(() => {
  const phone = datacall.value.user.phone;
  return phone.slice(0, -3) + "***";
});

const togglePhoneVisibility = (id) => {
  isPhoneVisible.value[id] = !isPhoneVisible.value[id];
};

const copyPhoneNumber = (phone) => {
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

// Hàm lấy màu tag theo trạng thái ưu tiên
const getColorTagByPriorityStatus = (priority_status) => {
  switch (priority_status) {
    case "khách nhượng":
      return "volcano";
    case "traphong":
      return "cyan";
    case "khong yêu cầu":
      return "kyc";
    default:
      return "";
  }
};

</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
import SidebarFilter from "../../../components/base/sidebar/SidebarFilter.vue";
import CardInfor from "../../../components/base/card/CardInfor.vue";

export default {
  components: {
    ThePageHeader,
    SidebarFilter,
    CardInfor,
  },
};
</script>

<style>
.ant-list-items {
  display: flex !important;
  flex-wrap: wrap !important;
}

.main_text_address {
  line-height: 1.5em;
  height: 3em;
}

.sidebar-filter {
  width: 262px;
  max-width: 254px;
}

.ant-list-pagination {
  width: 75vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner .ant-modal-content {
  padding: 0 !important;
}

.sidebar-box-item {
  margin-bottom: 12px;
  font-weight: normal;
}

.text5 {
  position: absolute;
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  letter-spacing: 0.1em;
}

.text5 span {
  display: inline-block;
}

:where(.css-dev-only-do-not-override-1w58yth).ant-list .ant-list-items {
  display: flex;
  flex-wrap: wrap;
}

.post-container:hover .post-item {
  box-shadow: 0px 4px 16px 0px rgba(44, 44, 44, 0.08);
}

/* @media screen and (min-width: 768px) {
    .banner .ant-image-img {
        height: 500px;
    }
} */
</style>
