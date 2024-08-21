<template>
  <div class="card border-x-0">
    <!-- begin::Card Header -->
    <div class="card-header flex flex-row-reverse justify-between mb-3 md:mb-0">
      <!-- begin::Card Toolbar -->
      <div class="card-toolbar flex justify-start md:justify-end"></div>
    </div>
    <div class="card-body">
         <div class="flex n:flex-col sm:flex-row border-[1px] cursor-pointer allpost1" id="allpost1" v-for="item in data"  >
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
            <div class="col-sm-9 title_phone" >
                
              <Card :title="item.title">
                <template #content>
                  <span class="text-sm" @click="redirectPostDetail(item.id)">
                    {{ item.description }}
                  </span>
                  <CardInfor
                    @statusUpdated="handleStatusUpdated"
                    type="pending"
                    :post="item"
                  />
                </template>
              </Card>
            </div>
          </div>


    </div>
  </div>
</template>

<script setup>
import {
  FilterOutlined,
  ExportOutlined,
  UserOutlined,
  SyncOutlined,
  DownOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { createVNode, computed, reactive } from "vue";
import messageAnt from "../../../scripts/message";
import formatDate from "../../../scripts/formatDate";
import listPostsAPI from "../../../api/posts/index";
import updatePostAPI from "../../../api/posts/update";
import deletePostAPI from "../../../api/posts/delete";
import getPostAPI from "../../../api/posts/getDetails";
import CardInfor from "../../../components/base/card/CardInfor.vue";
import { useRouter } from "vue-router";

import { Modal } from "ant-design-vue";
const data = ref([]);
const totalLandHT = ref(0);
const fetchPostByPending = async () => {
  // isLoading.value = true;
  data.value = [];

const listPosts = await listPostsAPI.getPostPending();
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
};

fetchPostByPending();


const getColorTagByPriorityStatus = (priority_status) => {
  switch (priority_status) {
    case "khách nhượng":
      return "hot-priority";
    case "quy hoạch":
      return "medium-priority";
    case "trả phòng":
      return "medium-priority";
    default:
      return "";
  }
};

const router1 = useRouter();
const redirectPostDetail = (postId) => {
  router1.push({ name: "admin-pending-post-detail", params: { id: postId } });
};

</script>

<script>
import { ref } from "vue";
import ThePageHeader from "../../../components/ThePageHeader.vue";
import Card from "../../../components/base/card/Card.vue";
export default {
  components: {
    ThePageHeader,
    Card,
  },
};

</script>
<style>
 p {
  margin-bottom: 10px !important;
}

a-modal p strong {
  font-weight: bold;
  color: #333; /* Màu của tiêu đề */
}

a-modal p {
  color: #555; /* Màu của nội dung */
}

a-modal p sup {
  font-size: 12px;
  vertical-align: super;
}

a-modal {
  --ant-modal-header-bg: #f0f0f0; /* Màu nền header modal */
  --ant-modal-body-bg: #fff; /* Màu nền body modal */
}

a-modal .ant-modal-title {
  font-size: 18px;
  color: #000; /* Màu tiêu đề modal */
  font-weight: bold;
}
.ant-modal-header {
  background-color: #4a90e2;
  color: #ffffff;
  border-radius: 12px 12px 0 0;
  padding: 15px;
  text-align: center; 
  margin-bottom: 0px !important;

}
.ant-modal-header div{
  font-size: 20px !important;
}
</style>
