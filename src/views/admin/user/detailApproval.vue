<template>
  <div class="card border-x-0">
    <!-- begin::Card Header -->

    <div style="display: flex; align-items: center" id="user_info_by_id">
      <div class="avatar-user">
        <img
          :src="
            user.avatar ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5NFFUU-0Yz1JkeqbyFgqOHvoPeBMmsdD0ks05B9wMWGF9glDlkVVvd65bWmJ6fIweT2k&usqp=CAU'
          "
          alt="User Avatar"
        />
      </div>
      <div class="user-info-container">
        <div class="user-info-item">
          <span class="label">Họ tên:</span>
          <span class="value">{{ user.name }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Email:</span>
          <span class="value">{{ user.email }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">CCCD:</span>
          <span class="value">{{ user.cccd }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Ngày sinh:</span>
          <span class="value">{{ user.birthday }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Giới tính :</span>
          <span class="value">{{ user.gender }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Đơn vị công tác:</span>
          <span class="value">{{ user.workunit }}</span>
        </div>
      </div>
      <div class="user-info-container">
        <div class="user-info-item">
          <span class="label">Trạng thái:</span>
          <span class="value">{{
            user.is_active == 2 ? "Chờ duyệt" : "Không hoạt động"
          }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Số điện thoại:</span>
          <span class="value">{{ user.phone }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Quyền:</span>
          <span class="value">{{
            user.role_id == 1
              ? "supper admin"
              : user.role_id == 2
              ? "đầu chủ"
              : user.role_id == 3
              ? "sale"
              : user.role_id == 4
              ? "sale vip"
              : user.role_id == 5
              ? "đầu chủ vip"
              : user.role_id == 6
              ? "admin"
              : ""
          }}</span>
        </div>
        <div class="user-info-item">
          <span class="label">Quyền truy cập :</span>
          <span class="value">
            <div>
              <div>
                {{
                  user.permissions[0]?.access_permission_1 == 1
                    ? "Văn phòng hàng A"
                    : ""
                }}
              </div>
              <div>
                {{
                  user.permissions[0]?.access_permission_2 == 2
                    ? "Văn phòng hàng B"
                    : ""
                }}
              </div>
              <div>
                {{
                  user.permissions[0]?.access_permission_3 == 3
                    ? "Văn phòng hàng C"
                    : ""
                }}
              </div>
              <div>
                {{
                  user.permissions[0]?.access_permission_4 == 4
                    ? "Văn phòng hạng D"
                    : ""
                }}
              </div>
              <div>
                {{
                  user.permissions[0]?.access_permission_5 == 5
                    ? "Mặt bằng kinh doanh"
                    : ""
                }}
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>

    <div style="padding: 20px">
      <div class="row">
        <!-- Tiêu đề CCCD Trước -->
        <div class="col-md-6 col-12">
          <div class="row">
            <div class="col-12 mb-3">
              <h5>Ảnh CCCD Trước</h5>
            </div>
            <!-- Ảnh CCCD Trước -->
            <div class="col-12 mb-4">
              <img
                :src="user.cccd_trc"
                alt="Ảnh CCCD Trước"
                class="rounded border cccd-image"
              />
            </div>
          </div>
        </div>

        <!-- Tiêu đề CCCD Sau -->
        <div class="col-md-6 col-12">
          <div class="row">
            <div class="col-12 mb-3">
              <h5>Ảnh CCCD Sau</h5>
            </div>
            <!-- Ảnh CCCD Sau -->
            <div class="col-12 mb-4">
              <img
                :src="user.cccd_sau"
                alt="Ảnh CCCD Sau"
                class="img-fluid rounded border cccd-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex checkbox_delet_edit justify-content-center my-3"  >
      <div>
        <button @click="DuyetUser(user.id)" class="py-2">Duyệt </button>
      </div>
      <div>
        <button class="py-2"
          @click="KhongDuyetUser(user.id)"
          style="padding-right: 35px; padding-left: 35px"
        >
          Không duyệt
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  FilterOutlined,
  ExportOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import {
  createVNode,
  reactive,
  ref,
  watch,
  onBeforeUnmount,
  onMounted,
} from "vue";
import messageAnt from "../../../scripts/message";
import listPostsAPI from "../../../api/posts/index";
import approvaluserAPI from "../../../api/users/approval";
import viewedPostsAPI from "../../../api/posts/viewed/index";
import { Modal } from "ant-design-vue";
import formatMoney from "../../../utils/formatMoney";
import FilterAddress from "../../../components/base/filter/FilterAddress.vue";
import FilterPriceRange from "../../../components/base/filter/FilterPriceRange.vue";
import FilterAreaRange from "../../../components/base/filter/FilterAreaRange.vue";
import FilterOptions from "../../../components/base/filter/FilterOptions.vue";
import FilterStatus from "../../../components/base/filter/FilterStatus.vue";
import filterRange from "../../../stores/filterRange";
import getTimeSincePostCreation from "../../../utils/getTimeSincePostCreation";
import CardinforDetailByUser from "../../../components/base/card/CardnforDetailByUser.vue";
import CardinforDetailByUserStatus4 from "../../../components/base/card/CardnforDetailByUserStatus4.vue";
import CardinforDetailByUserStatus3 from "../../../components/base/card/CardnforDetailByUserStatus3.vue";
import CardinforDetailByUserStatus2 from "../../../components/base/card/CardnforDetailByUserStatus2.vue";
import CardinforDetailByUserSold from "../../../components/base/card/CardnforDetailByUserSold.vue";

import { useRoute } from "vue-router";
import getUserAPI from "../../../api/users/getUser";
import router from "../../../router";

const route = useRoute();
const searchInput = ref();
const state = reactive({
  searchConditions: [],
});

const splitText = (text, searchText) => {
  return text.split(new RegExp(`(${searchText})`, "i"));
};



const filterStore = filterRange();

let filter = filterStore.getAll;

onBeforeUnmount(() => {
  filterStore.resetFilters();
});

onMounted(() => {
  filterStore.resetFilters();
});

const handResetFilter = () => {
  filterStore.resetFilters();
  fetchPostsListByID({
    ...filterStore.getAll,
    searchConditions: state.searchConditions,
  });
};

const handaddpost = () => {
  router.push({ name: "admin-post-create" });
};

const props = defineProps({
  rangeArea: String,
  rangePrice: String,
  dirs: Array,
  address: String,
  sold_status: Array,
  priority_status: Array,
});

const data = ref([]);
const pageFilter = ref(1);
const pageSizeFilter = ref(10);
const currentPage = ref(1);
const total = ref(0);

watch(props, (newVal) => {
  filter = {
    ...filter,
    rangeArea: newVal.rangeArea,
    rangePrice: newVal.rangePrice,
    dirs: newVal.dirs,
    address: newVal.address,
    sold_status: newVal.sold_status,
    priority_status: newVal.priority_status,
  };
  fetchPostsListByID({
    ...filter,
    searchConditions: state.searchConditions,
  });
});

// modal export
const openModalExport = ref(false);
const showModalExport = () => {
  openModalExport.value = true;
};
const handleOkModalExport = (e) => {
  openModalExport.value = false;
};



const getDirectionLabel = (value) => {
  const directionObj = direction.find((item) => item.value === value);
  return directionObj ? directionObj.label : "";
};

// table

/**
 * Hàm lấy danh sách bài viết đã duyệt
 * @param
 * CreatedBy: youngbachhh (29/03/2024)
 */
const userid = route.params.id;

const DuyetUser = async (userid) => {
  const data = { is_active: 1 };
  await approvaluserAPI(userid, data);
  messageAnt.success("Duyệt người dùng thành công !");
  router.push({ name: "admin-post-user-approval-list" });
};

const KhongDuyetUser = async (userid) => {
  const data = { is_active: 3 };
  await approvaluserAPI(userid, data);
  messageAnt.success("Bạn đã không duyệt người dùng này !");
  router.push({ name: "admin-post-user-approval-list" });
};

const fetchPostsListByID = async (filter, page = 1, pageSize = 10) => {
  data.value = [];

  let res;

  res = await listPostsAPI.getPostByFilterByUserID(userid, {
    ...filter,
    page: pageFilter.value,
    pageSize: pageSizeFilter.value,
  });
  // console.log(res);
  let listPosts = res.data;
  total.value = res.total;
  const posts = [];
  const ans = reactive({
    id: "",
    key: "",
    title: "",
    name: "",
    description: "",
    price: "",
    direction: "",
    area: "",
    address: "",
    created_at: "",
    views_count: 0,
    sold_status: "",
    priority_status: "",
    status_id: "",
    user: "",
    comment: [],
    post_image: [],
    user_info: "",
    cccd_trc: "",
    cccd_sau: "",
    gender: "",
  });
  if (listPosts.length === 0) return;
  for (let i = 0; i < listPosts.length; i++) {
    const post = listPosts[i];
    Object.keys(ans).forEach((key) => {
      ans[key] = post[key];
    });

    ans.created_at = getTimeSincePostCreation(post.created_at, true);
    ans.name = post.user_info.name;
    ans.key = i + 1;
    posts.push({ ...ans });
  }

  data.value = posts;
};

fetchPostsListByID({
  ...filter,
  searchConditions: state.searchConditions,
});

const getColorPriorityStatus = (priority_status) => {
  switch (priority_status) {
    case "khách nhượng":
      return "volcano";
    case "quy hoạch":
      return "cyan";
    case "khong yêu cầu":
      return "kyc";
    default:
      return "";
  }
};



const user = reactive({
  id: '',
  name: "",
  email: "",
  password: "",
  cccd: "",
  role_id: "",
  is_active: "",
  cccd: "",
  phone: "",
  address: "",
  workunit: "",
  birthday: "",
  avatar: "",
  permissions: "",
  gender: "",
  cccd_trc: "",
  cccd_sau: "",
});
const comments = ref([]);

const totalpost = ref(0);
const totalpostht = ref(0);
const totalpostcht = ref(0);
const totalpostcd = ref(0);
const totalpostkd = ref(0);

const fetchUserById = async (id) => {
  const users = await getUserAPI.getById(id);
  const listpost = await listPostsAPI.getPostByUser(id); //all
  totalpost.value = listpost.length;
  const listpostht = await listPostsAPI.getPostByUserHT(id); // HT
  totalpostht.value = listpostht.length;
  const listpostcht = await listPostsAPI.getPostSoldByUser(id); // CHT
  totalpostcht.value = listpostcht.length;
  const listpostcd = await listPostsAPI.getPostStatus3ByUser(id); // CD
  totalpostcd.value = listpostcd.length;
  const listpostkd = await listPostsAPI.getPostStatus2ByUser(id); // KD
  totalpostkd.value = listpostkd.length;

  Object.keys(user).forEach((key) => {
    user[key] = users[key];
  });

  // comments.value.push(...post.comment);
};

fetchUserById(userid);
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
import listReportAPI from "../../../api/report";
export default {
  components: {
    ThePageHeader,
  },
  methods: {
    statusColor(status_id) {
      if (status_id === 4) {
        return "success";
      } else if (status_id === 5) {
        return "error";
      }
      return "";
    },
    statusLabel(status_id) {
      if (status_id === 4) {
        return "công khai";
      } else if (status_id === 5) {
        return "không công khai";
      }
      return "chờ xử lý";
    },
  },
};
</script>
<style scoped>
.user-info-container {
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  border: 1px solid #ddd;
  /* border-radius: 8px; */
  padding: 16px;
  max-width: 600px;
  margin: 10px 60px;
  flex: 2;
}

.user-info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.user-info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  color: #555;
}
.avatar-user {
  max-width: 255px;
  max-height: 255px;
  margin-left: 50px;
}
.avatar-user img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.cccd-image {
  width: 300px !important; /* Giới hạn chiều rộng tối đa */
  height: 170px !important; /* Giới hạn chiều cao tối đa */
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>

