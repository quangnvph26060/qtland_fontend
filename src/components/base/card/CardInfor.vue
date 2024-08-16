<template>
  <div class="flex flex-col mt-3">
    <!-- begin::Card Infor For List -->
    <div class="flex flex-wrap space-x-10" v-if="type === 'list'">
      <div class="flex flex-col">
        <span class="text-slate-400">Trạng thái</span>
        <div class="news-status">
          <a-tag color="warning" v-if="data?.status_id === 3">chờ duyệt</a-tag>
          <a-tag color="success" v-else-if="data?.status_id === 4"
            >công khai</a-tag
          >
          <a-tag color="error" v-else-if="data?.status_id === 2"
            >không duyệt</a-tag
          >
        </div>
      </div>
      <div class="flex flex-col">
        <span class="text-slate-400">Ngày đăng </span>
        <div class="news-date">{{ formatDate(data?.created_at) }}</div>
      </div>
      <div class="flex checkbox_delet_edit">
        <div>
          <button  @click="redirectPostDetail(data.id)">Sửa</button>
        </div>
        <div>
          <button  @click="showConfirmDelete(data.id)">Xóa</button>
        </div>
      </div>
      
    </div>
    <!-- end::Card Infor For List -->

    <!-- begin::Card Infor For Manage -->
    <div class="flex flex-wrap space-x-10" v-else-if="type === 'manage'">
      <div class="flex flex-col">
        <span class="text-slate-400">Trạng thái</span>
        <div class="news-status">
          <a-tag color="warning" v-if="data?.status_id === 3">chờ duyệt</a-tag>
          <a-tag color="success" v-else-if="data?.status_id === 4"
            >công khai</a-tag
          >
          <a-tag color="error" v-else-if="data?.status_id === 2"
            >không duyệt</a-tag
          >
        </div>
      </div>
      <div class="flex flex-col">
        <span class="text-slate-400">Ngày đăng </span>
        <div class="news-date">{{ formatDate(data?.created_at) }}</div>
      </div>
      <div class="flex flex-col checkbox_sold">
        <label class="switch">
          <input
            type="checkbox"
            v-model="data.sold_status"
            :true-value="1"
            :false-value="0"
          />
          <span class="slider"></span>
        </label>
        <p style="font-weight: 600">
          {{ data?.sold_status === 1 ? "Đã thuê" : "Chưa thuê" }}
        </p>
      </div>
       <div class="flex checkbox_delet_edit">
        <div>
          <button  @click="redirectPostDetail(data.id)">Sửa</button>
        </div>
        <div>
          <button  @click="showConfirmDelete(data.id)">Xóa</button>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap space-x-10" v-else-if="type === 'cht'">
      <div class="flex flex-col">
        <span class="text-slate-400">Trạng thái</span>
        <div class="news-status">
          <a-tag color="warning" v-if="data?.status_id === 3">chờ duyệt</a-tag>
          <a-tag color="success" v-else-if="data?.status_id === 4"
            >công khai</a-tag
          >
          <a-tag color="error" v-else-if="data?.status_id === 2"
            >không duyệt</a-tag
          >
        </div>
      </div>
      <div class="flex flex-col">
        <span class="text-slate-400">Ngày đăng </span>
        <div class="news-date">{{ formatDate(data?.created_at) }}</div>
      </div>
       <div class="flex checkbox_delet_edit">
        <div>
          <button  @click="redirectPostDetail(data.id)">Sửa</button>
        </div>
        <div>
          <button  @click="showConfirmDelete(data.id)">Xóa</button>
        </div>
      </div>
      
    </div>

     <div class="flex flex-wrap space-x-10" v-else-if="type === 'sold'">
      <div class="flex flex-col">
        <span class="text-slate-400">Trạng thái</span>
        <div class="news-status">
          <a-tag color="warning" v-if="data?.status_id === 3">chờ duyệt</a-tag>
          <a-tag color="success" v-else-if="data?.status_id === 4"
            >công khai</a-tag
          >
          <a-tag color="error" v-else-if="data?.status_id === 2"
            >không duyệt</a-tag
          >
        </div>
      </div>
      <div class="flex flex-col">
        <span class="text-slate-400">Ngày đăng </span>
        <div class="news-date">{{ formatDate(data?.created_at) }}</div>
      </div>
        <div class="flex flex-col checkbox_sold">
        <label class="switch">
          <input
            type="checkbox"
            v-model="data.sold_status"
            :true-value="1"
            :false-value="0"
          />
          <span class="slider"></span>
        </label>
        <p style="font-weight: 600">
          {{ data?.sold_status === 1 ? "Đã thuê" : "Chưa thuê" }}
        </p>
      </div>
       <div class="flex checkbox_delet_edit">
        <div>
          <button  @click="redirectPostDetail(data.id)">Sửa</button>
        </div>
        <div>
          <button  @click="showConfirmDelete(data.id)">Xóa</button>
        </div>
      </div>
      
    </div>

     <div class="flex flex-wrap space-x-10" v-else-if="type === 'kd'">
      <div class="flex flex-col">
        <span class="text-slate-400">Trạng thái</span>
        <div class="news-status">
          <a-tag color="warning" v-if="data?.status_id === 3">chờ duyệt</a-tag>
          <a-tag color="success" v-else-if="data?.status_id === 4"
            >công khai</a-tag
          >
          <a-tag color="error" v-else-if="data?.status_id === 2"
            >không duyệt</a-tag
          >
        </div>
      </div>
      <div class="flex flex-col">
        <span class="text-slate-400">Ngày đăng </span>
        <div class="news-date">{{ formatDate(data?.created_at) }}</div>
      </div>
      <div class="flex checkbox_delet_edit">
        <div>
          <button  @click="redirectPostDetail(data.id)">Sửa</button>
        </div>
        <div>
          <button  @click="showConfirmDelete(data.id)">Xóa</button>
        </div>
      </div>
    </div>
    <!-- end::Card Infor For Manage -->
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import formatMoney from "../../../utils/formatMoney";
import formatDate from "../../../scripts/formatDate";
import updatePostAPI from "../../../api/posts/update";
import { message } from "ant-design-vue";
import { useRouter } from 'vue-router';
import { Modal, message as messageAnt } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import deletePostAPI from "../../../api/posts/delete"
const router = useRouter();
const props = defineProps({
  type: {
    type: String,
    default: "list",
  },
  post: {
    type: Object,
    default: () => {},
  },
});

const redirectPostDetail = (postId) => {
  // alert(postId);
  router.push({ name: "post-edit", params: { id: postId } });
};

const data = ref(props.post);
console.log(data.value.sold_status);
watch(
  () => props.post,
  (newVal) => {
    data.value = newVal;
  }
);


const showConfirmDelete = (id) => {
  Modal.confirm({
    title: "Cảnh báo",
    icon: createVNode(ExclamationCircleOutlined),
    class: "top-[24%]",
    content: createVNode(
      "div",
      {
        style: "color:red;",
      },
      "Bạn chắc chắn muốn xoá người dùng này?"
    ),
    okText: "Xoá",
    cancelText: "Huỷ",
    onOk() {
      deleteUserById(id);
    },
    onCancel() {
      console.log("Đã hủy xóa");
    },
  });
};

const deleteUserById = async (id) => {
    await deletePostAPI(id);
    messageAnt.success('Xóa bài viết thành công!');
    router.push({ name: "post-edit", params: { id: id } });
};

const emit = defineEmits(['statusUpdated'])
watch(
  () => data.value.sold_status,
  async (newStatus) => {
    try {
      // Gửi yêu cầu PUT hoặc PATCH đến API để cập nhật status
      const response = await updatePostAPI.updateSold(props.post.id, {
        sold_status: newStatus,

      });
      if (response && response.status == 200) {
      emit('statusUpdated', newStatus);
        message.success("Cập nhật trạng thái cho thuê thành công");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }
);
</script>

<script>
export default {};
</script>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
