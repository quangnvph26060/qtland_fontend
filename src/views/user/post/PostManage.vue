<template>
  <div class="flex flex-col col-12 col-xl-10 xl:pr-[30px]">
    <div class="w-full">
      <ThePageHeader />
    </div>

    <!-- begin::Main Content -->
    <div class="">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" force-render class="space-y-5">
          <template #tab> Tất cả ({{ totalLand }}) </template>
          <button @click="toggleDiv" class="btn border border-primary text-primary"> {{ showAllPost1 ? 'Dạng excel' : 'Dạng danh sách' }}</button>
          <div  v-if="showAllPost1" class="flex n:flex-col sm:flex-row border-[1px] cursor-pointer" id="allpost1" v-for="item in data"  >
            <div
              class="relative flex align-items-center justify-center col-sm-3 w-full"
            >
              <div
              
                class="absolute z-2 top-1 sm:top-4 w-auto px-2 h-6 leading-6 -left-1 text-white text-center rounded"
                :class="getColorTagByPriorityStatus(item.priority_status)"
              >
                {{ item.priority_status }}
                {{
                  item.priority_status == "trả phòng"
                    ? formatDate(item.traphong)
                    : ""
                }}
              </div>
              <a-image
                @click="redirectPostDetail(item.id)"
                :src="item.post_image?.[0]?.image_path"
                class="object-cover"
                :preview="false"
                :height="150"
                :width="300"
              />
            </div>
            <div class="col-sm-9">
              <Card :title="item.title">
                <template #content>
                  <span class="text-sm" @click="redirectPostDetail(item.id)">
                    {{ item.description }}
                  </span>
                  <CardInfor
                    @statusUpdated="handleStatusUpdated"
                    type="list"
                    :post="item"
                  />
                </template>
              </Card>
            </div>
          </div>
          <div  v-else id="allpost2">
            <CardinforDetail />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" class="space-y-5">
          <template #tab> Đang hiển thị ({{ totalLandHT }}) </template>
          <!-- begin::Post Items -->
          <div
            class="flex n:flex-col sm:flex-row border-[1px] cursor-pointer"
            v-for="item in datahienthi"
          >
            <div
              class="relative flex align-items-center justify-center col-sm-3 w-full"
            >
              <div
               
                class="absolute z-2 top-1 sm:top-4 w-auto px-2 h-6 leading-6 -left-1 text-white text-center rounded"
                :class="getColorTagByPriorityStatus(item.priority_status)"
              >
                {{ item.priority_status }}
                {{
                  item.priority_status == "trả phòng"
                    ? formatDate(item.traphong)
                    : ""
                }}
              </div>
              <a-image
                @click="redirectPostDetail(item.id)"
                :src="item.post_image?.[0]?.image_path"
                class="object-cover"
                :preview="false"
                :height="150"
                :width="300"
              />
            </div>
            <div class="col-sm-9">
              <Card :title="item.title">
                <template #content>
                  <span class="text-sm" @click="redirectPostDetail(item.id)">
                    {{ item.description }}
                  </span>
                  <CardInfor
                    @statusUpdated="handleStatusUpdated"
                    type="manage"
                    :post="item"
                  />
                </template>
              </Card>
            </div>
          </div>
          <!-- end::Post Items -->
        </a-tab-pane>

        <a-tab-pane key="3" class="space-y-5">
          <template #tab> Chờ hiển thị ({{ totalLandSold }}) </template>
          <!-- begin::Post Items -->
          <div
            class="flex n:flex-col sm:flex-row border-[1px] cursor-pointer"
            v-for="item in dataSold"
          >
            <div
              class="relative flex align-items-center justify-center col-sm-3 w-full"
            >
              <div
               
                class="absolute z-2 top-1 sm:top-4 w-auto px-2 h-6 leading-6 -left-1 text-white text-center rounded"
                :class="getColorTagByPriorityStatus(item.priority_status)"
              >
                {{ item.priority_status }}
                {{
                  item.priority_status == "trả phòng"
                    ? formatDate(item.traphong)
                    : ""
                }}
              </div>
              <a-image
                @click="redirectPostDetail(item.id)"
                :src="item.post_image?.[0]?.image_path"
                class="object-cover"
                :preview="false"
                :height="150"
                :width="300"
              />
            </div>
            <div class="col-sm-9">
              <Card :title="item.title">
                <template #content>
                  <span class="text-sm" @click="redirectPostDetail(item.id)">
                    {{ item.description }}
                  </span>
                  <CardInfor
                    @statusUpdated="handleStatusUpdated"
                    type="sold"
                    :post="item"
                  />
                </template>
              </Card>
            </div>
          </div>
          <!-- end::Post Items -->
        </a-tab-pane>

        <a-tab-pane key="4" class="space-y-5">
          <template #tab> Chờ duyệt ({{ totalLandCHT }}) </template>
          <!-- begin::Post Items -->
          <div
            class="flex n:flex-col sm:flex-row border-[1px] cursor-pointer"
            v-for="item in datachohienthi"
          >
            <div
              class="relative flex align-items-center justify-center col-sm-3 w-full"
            >
              <div
                
                class="absolute z-2 top-1 sm:top-4 w-auto px-2 h-6 leading-6 -left-1 text-white text-center rounded"
                :class="getColorTagByPriorityStatus(item.priority_status)"
              >
                {{ item.priority_status }}
                {{
                  item.priority_status == "trả phòng"
                    ? formatDate(item.traphong)
                    : ""
                }}
              </div>
              <a-image
                @click="redirectPostDetail(item.id)"
                :src="item.post_image?.[0]?.image_path"
                class="object-cover"
                :preview="false"
                :height="150"
                :width="300"
              />
            </div>
            <div class="col-sm-9">
              <Card :title="item.title">
                <template #content>
                  <span class="text-sm" @click="redirectPostDetail(item.id)">
                    {{ item.description }}
                  </span>
                  <CardInfor
                    @statusUpdated="handleStatusUpdated"
                    type="cht"
                    :post="item"
                  />
                </template>
              </Card>
            </div>
          </div>
          <!-- end::Post Items -->
        </a-tab-pane>

        <a-tab-pane key="5" class="space-y-5">
          <template #tab> Không duyệt ({{ totalLandKD }}) </template>
          <!-- begin::Post Items -->
          <div
            class="flex n:flex-col sm:flex-row border-[1px] cursor-pointer"
            v-for="item in dataKD"
          >
            <div
              class="relative flex align-items-center justify-center col-sm-3 w-full"
            >
              <div
                
                class="absolute z-2 top-1 sm:top-4 w-auto px-2 h-6 leading-6 -left-1 text-white text-center rounded"
                :class="getColorTagByPriorityStatus(item.priority_status)"
              >
                {{ item.priority_status }}
                {{
                  item.priority_status == "trả phòng"
                    ? formatDate(item.traphong)
                    : ""
                }}
              </div>
              <a-image
                @click="redirectPostDetail(item.id)"
                :src="item.post_image?.[0]?.image_path"
                class="object-cover"
                :preview="false"
                :height="150"
                :width="300"
              />
            </div>
            <div class="col-sm-9">
              <Card :title="item.title">
                <template #content>
                  <span class="text-sm" @click="redirectPostDetail(item.id)">
                    {{ item.description }}
                  </span>
                  <CardInfor
                    @statusUpdated="handleStatusUpdated"
                    type="kd"
                    :post="item"
                  />
                </template>
              </Card>
            </div>
          </div>
          <!-- end::Post Items -->
        </a-tab-pane>
        <!-- <a-tab-pane key="6" class="space-y-5">
          <template #tab> Danh sách </template>
          <CardinforDetail />
        </a-tab-pane> -->
      </a-tabs>
    </div>
  </div>
  <!-- begin::Sidebar -->
  <SidebarFilter />
  <!-- end::Sidebar -->
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import router from "../../../router";
import messageAnt from "../../../scripts/message";
import auth from "../../../stores/auth";
import listPostsAPI from "../../../api/posts/index";
import getTimeSincePostCreation from "../../../utils/getTimeSincePostCreation";
import { useRouter } from "vue-router";
import formatDate from "../../../scripts/formatDate";
const authStore = auth();
const userId = ref(authStore.getUser.id);
watch(
  () => authStore.getUser,
  () => {
    fetchPostByUser(authStore.getUser.id);
  }
);
const router1 = useRouter();
const redirectPostDetail = (postId) => {
  router1.push({ name: "post-detail", params: { id: postId } });
};


const showAllPost1 = ref(true);

function toggleDiv() {
  showAllPost1.value = !showAllPost1.value;
}

const activeKey = ref("1");

const totalLand = ref(0);

// confirm modal
const showConfirmDelete = () => {
  Modal.confirm({
    title: "Cảnh báo",
    icon: createVNode(ExclamationCircleOutlined),
    class: "top-[24%]",
    content: createVNode(
      "div",
      {
        style: "color:red;",
      },
      "Bạn chắc chắn muốn xoá người dùng này ?"
    ),
    okText: "Xoá",
    cancelText: "Huỷ",
    onOk() {
      () => {
        messageAnt.success();
      };
    },
    onCancel() {},
    class: "test",
  });
};

const data = ref([]);
const totalLandHT = ref(0);
const fetchPostByUser = async (userId) => {
  // isLoading.value = true;
  data.value = [];

  const listPosts = await listPostsAPI.getPostByUser(userId);
  const ans = reactive({
    id: "",
    title: "",
    description: "",
    price: "",
    direction: "",
    area: "",
    address: "",
    created_at: "",
    view: 1000,
    sold_status: "",
    classrank: "",
    status_id: "",
    priority_status: "",
    user: "",
    comment: [],
    post_image: [],
    traphong: "",
    note : "",
  });
  const posts = [];

  for (let i = 0; i < listPosts.length; i++) {
    const post = listPosts[i];
    Object.keys(ans).forEach((key) => {
      ans[key] = post[key];
    });
    posts.push({ ...ans });
  }

  data.value = posts;
  totalLand.value = posts.length;
};
const datahienthi = ref([]);
const fetchPostByUserHT = async (userId) => {
  // isLoading.value = true;
  datahienthi.value = [];
  const listPosts = await listPostsAPI.getPostStatusByUser(userId);
  const ans = reactive({
    id: "",
    title: "",
    description: "",
    price: "",
    direction: "",
    area: "",
    address: "",
    created_at: "",
    view: 1000,
    sold_status: "",
    classrank: "",
    status_id: "",
    priority_status: "",
    user: "",
    comment: [],
    post_image: [],
    traphong: "",
    note: "",
  });
  const posts = [];

  for (let i = 0; i < listPosts.length; i++) {
    const post = listPosts[i];
    Object.keys(ans).forEach((key) => {
      ans[key] = post[key];
    });
    posts.push({ ...ans });
  }

  datahienthi.value = posts;
  totalLandHT.value = posts.length;
};
const totalLandCHT = ref(0);
const datachohienthi = ref([]);
const fetchPostByUserCHT = async (userId) => {
  // isLoading.value = true;
  datachohienthi.value = [];
  const listPosts = await listPostsAPI.getPostStatus3ByUser(userId);
  const ans = reactive({
    id: "",
    title: "",
    description: "",
    price: "",
    direction: "",
    area: "",
    address: "",
    created_at: "",
    view: 1000,
    sold_status: "",
    classrank: "",
    status_id: "",
    priority_status: "",
    user: "",
    comment: [],
    post_image: [],
    traphong: "",
    note: "",
  });
  const posts = [];

  for (let i = 0; i < listPosts.length; i++) {
    const post = listPosts[i];
    Object.keys(ans).forEach((key) => {
      ans[key] = post[key];
    });
    posts.push({ ...ans });
  }

  datachohienthi.value = posts;
  totalLandCHT.value = posts.length;
};

const totalLandKD = ref(0);
const dataKD = ref([]);
const fetchPostByUserKD = async (userId) => {
  // isLoading.value = true;
  dataKD.value = [];
  const listPosts = await listPostsAPI.getPostStatus2ByUser(userId);
  console.log(listPosts);
  const ans = reactive({
    id: "",
    title: "",
    description: "",
    price: "",
    direction: "",
    area: "",
    address: "",
    created_at: "",
    view: 1000,
    sold_status: "",
    classrank: "",
    status_id: "",
    priority_status: "",
    user: "",
    comment: [],
    post_image: [],
    traphong: "",
    note: "",
  });
  const posts = [];

  for (let i = 0; i < listPosts.length; i++) {
    const post = listPosts[i];
    Object.keys(ans).forEach((key) => {
      ans[key] = post[key];
    });
    posts.push({ ...ans });
  }

  dataKD.value = posts;
  totalLandKD.value = posts.length;
};

const totalLandSold = ref(0);
const dataSold = ref([]);
const fetchPostByUserSold = async (userId) => {
  // isLoading.value = true;
  dataSold.value = [];
  const listPosts = await listPostsAPI.getPostSoldByUser(userId);
  const ans = reactive({
    id: "",
    title: "",
    description: "",
    price: "",
    direction: "",
    area: "",
    address: "",
    created_at: "",
    view: 1000,
    sold_status: "",
    classrank: "",
    status_id: "",
    priority_status: "",
    user: "",
    comment: [],
    post_image: [],
    traphong: "",
    note: "",
  });
  const posts = [];

  for (let i = 0; i < listPosts.length; i++) {
    const post = listPosts[i];
    Object.keys(ans).forEach((key) => {
      ans[key] = post[key];
    });
    posts.push({ ...ans });
  }

  dataSold.value = posts;
  totalLandSold.value = posts.length;
};

const getColorTagByPriorityStatus = (priority_status) => {
  switch (priority_status) {
    case "khách nhượng":
      return "hot-priority";
    case "mới":
      return "medium-priority";
    case "trả phòng":
      return "medium-priority";
    default:
      return "";
  }
};
const userid = localStorage.getItem("user_id");

const handleStatusUpdated = () => {
  fetchPostByUser(userid);
  fetchPostByUserHT(userid);
  fetchPostByUserCHT(userid);
  fetchPostByUserSold(userid);
  fetchPostByUserKD(userid);
};
handleStatusUpdated();
window.handleStatusUpdated = handleStatusUpdated;
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
import Card from "../../../components/base/card/Card.vue";
import CardInfor from "../../../components/base/card/CardInfor.vue";
import CardinforDetail from "../../../components/base/card/CardnforDetail.vue";
import SidebarFilter from "../../../components/base/sidebar/SidebarFilter.vue";

export default {
  components: {
    ThePageHeader,
    Card,
  },
};
</script>
<style>
.sidebar-box-item {
  margin-bottom: 12px;
  font-weight: normal;
}

.ant-image {
  width: 100% !important;
}
</style>
