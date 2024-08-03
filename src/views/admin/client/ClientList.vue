<template>
  <div class="card border-x-0">
    <!-- begin::Card Header -->
    <div class="card-header flex flex-row-reverse justify-between mb-3 md:mb-0">
      <!-- begin::Card Toolbar -->
      <div class="card-toolbar flex justify-start md:justify-end">
        <!-- begin::Filter -->
        <!-- <a-dropdown trigger="click" class="w-[100px]">
					<template #overlay>
						<a-menu class="w-[150px]">
							<a-menu-item key="1">
								<FilterAddress type="admin" />
							</a-menu-item>
							<a-menu-item key="2">
								<FilterPriceRange type="admin" />
							</a-menu-item>
							<a-menu-item key="3">
								<FilterAreaRange type="admin" />
							</a-menu-item>
							<a-menu-item key="4">
								<FilterOptions type="admin" />
							</a-menu-item>
							<a-menu-item key="5">
								<FilterStatus type="admin" />
							</a-menu-item>
						</a-menu>
					</template>
					<a-button class="me-3">
						<template #icon>
							<FilterOutlined />
						</template>
						Lọc
					</a-button>
				</a-dropdown> -->

        <!-- end::Filter -->

        <!-- begin::Reset Filter -->
        <!-- <div class="mr-3">
					<a-button @click="handResetFilter"> Đặt lại </a-button>
				</div> -->
        <!-- end::Reset Filter -->

        <!-- begin::Export -->
        <!-- <a-button @click="showModalExport">
					<template #icon>
						<ExportOutlined />
					</template>
					Xuất file
				</a-button> -->
        <a-modal
          v-model:open="openModalExport"
          title="Xuất file"
          cancelText="Huỷ"
          okText="Xuất file"
          class="top-[100%]"
          :onOk="
            () => {
              handleOkModalExport();
              messageAnt.success();
            }
          "
        >
          <a-form layout="horizontal" style="max-width: 600px">
            <a-form-item label="Loại file">
              <a-select>
                <a-select-option value="excel">Excel</a-select-option>
                <a-select-option value="admin">PDF</a-select-option>
                <a-select-option value="admin">Zip</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Khoảng thời gian">
              <a-range-picker />
            </a-form-item>
          </a-form>
        </a-modal>
        <!-- end::Export -->
      </div>
      <!-- end::Card Toolbar -->
    </div>
    <!-- end::Card Header -->

    <!-- begin::Card Body -->
    <div class="card-body">
      <!-- <button style="bacground: red !important" type="button" class="btn mb-4" @click="exportCLient">Xuất Excel</button> -->
      <a-button class="mb-4 px-4" @click="exportCLient"> Xuất Excel </a-button>
      <!-- begin::Table -->
      <a-table
        :data-source="data"
        :columns="columns"
        :scroll="{ x: 1000 }"
        :dataSource="data"
        :rowKey="(record) => record.id"
        :pagination="pagination"
        :expand-column-width="20"
        id="main-table"
      >
        <template #expandColumnTitle>
          <span style="color: red">More</span>
        </template>
        <template #expandedRowRender="{ record }">
          <p style="margin: 0">
            <a-descriptions title="Thông tin chi tiết" :column="1">
              <a-descriptions-item label="Địa chỉ">{{
                record.address
              }}</a-descriptions-item>
              <a-descriptions-item label="Email">
                {{ record.email }}
              </a-descriptions-item>
              <a-descriptions-item label="Diện tích cần tìm"
                >{{ record.area }} m<sup>2</sup></a-descriptions-item
              ><a-descriptions-item label="Khu vực cần tìm">{{
                record.searcharea
              }}</a-descriptions-item>
              <a-descriptions-item label="Ngày tham gia">
                {{ record.created_at }}
              </a-descriptions-item>
            </a-descriptions>
          </p>
        </template>
        <template
          #customFilterDropdown="{
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            column,
          }"
        >
          <div style="padding: 8px">
            <a-input
              ref="searchInput"
              :placeholder="`Search ${column.dataIndex}`"
              :value="selectedKeys[0]"
              style="width: 188px; margin-bottom: 8px; display: block"
              @change="
                (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
              "
              @pressEnter="
                handleSearch(selectedKeys, confirm, column.dataIndex)
              "
            />
            <a-button
              type="primary"
              size="small"
              style="width: 90px; margin-right: 8px"
              @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
            >
              <template #icon><SearchOutlined /></template>
              Tìm
            </a-button>
            <a-button
              size="small"
              style="width: 90px"
              @click="handleReset(clearFilters, column.dataIndex)"
            >
              Đặt lại
            </a-button>
          </div>
        </template>
        <template #customFilterIcon="{ filtered }">
          <search-outlined
            :style="{
              color: filtered ? '#108ee9' : undefined,
            }"
          />
        </template>
        <template #bodyCell="{ text, column, record }">
          <span
            v-if="state.searchText && state.searchedColumn === column.dataIndex"
          >
            <template
              v-for="(fragment, i) in text
                .toString()
                .split(
                  new RegExp(
                    `(?<=${state.searchText})|(?=${state.searchText})`,
                    'i'
                  )
                )"
            >
              <mark
                v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
                :key="i"
                class="highlight"
              >
                {{ fragment }}
              </mark>
              <template v-else>{{ fragment }}</template>
            </template>
          </span>
          <template v-if="column.key === 'detail'">
            <div style="display: flex; align-items: center">
              <router-link
                :to="{
                  name: 'admin-client-detail',
                  params: { id: record.id },
                }"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </router-link>
              <div
                style="display: flex; margin-left: 15px"
                @click="showConfirmDelete(record.id)"
              >
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <!-- <div>
							<a-dropdown trigger="click">
								<template #overlay>
									<a-menu>
										<a-menu-item key="1">
											<router-link
												:to="{
													name: 'admin-post-detail',
													params: { id: record.id },
												}"
											>
												Sửa
											</router-link>
										</a-menu-item>
										<a-menu-item key="2" >
											<div style="text-align: center"
												@click="
													showConfirmDelete(record.id)
												"
											>
												<i class="fa-solid fa-trash"></i>
											</div>
										</a-menu-item>
									</a-menu>
								</template>
								<a-button>
									Chức năng
									<DownOutlined />
								</a-button>
								
							</a-dropdown>
						</div> -->
          </template>
          <template v-else-if="column.dataIndex === 'sold_status'">
            <div class="flex">
              <a-tag
                style="width: 70px"
                :color="
                  record.sold_status === 1
                    ? '#87d068'
                    : record.sold_status === 0
                    ? '#f50'
                    : ''
                "
              >
                {{ record.sold_status == 1 ? "đã bán" : "chưa bán" }}
              </a-tag>
              <a-tag>
                {{ record.priority_status }}
              </a-tag>
            </div>
          </template>
        </template>
      </a-table>
      <!-- end::Table -->
    </div>
    <!-- end::Card Body -->
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
import listCLientAPI from "../../../api/client/index";
import deletePostAPI from "../../../api/posts/delete";
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
import apiURL from "../../../api/constants.js";
import router from "../../../router";

const searchInput = ref();
const state = reactive({
  searchConditions: [],
});

const splitText = (text, searchText) => {
  return text.split(new RegExp(`(${searchText})`, "i"));
};
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  const searchText = selectedKeys[0];

  // Clone the search conditions to ensure reactivity
  const updatedConditions = [...state.searchConditions];

  // Remove any existing condition for the same column
  const conditionIndex = updatedConditions.findIndex(
    (condition) => condition.column === dataIndex
  );
  if (conditionIndex !== -1) {
    updatedConditions.splice(conditionIndex, 1);
  }

  // Push the new condition
  updatedConditions.push({
    column: dataIndex,
    text: searchText,
  });

  // Define the desired order
  const desiredOrder = [
    "id",
    "name",
    "phone",
    "cccd",
    "address",
    "email",
    "finance",
    "searcharea",
    "area",
    "intendtime",
    "business",
    "personnumber",
    "numbercars",
    "numbermotor",
    "note",
    "birth_year",
    "created_at",
  ];

  // Sort the search conditions based on the desired order
  updatedConditions.sort((a, b) => {
    return desiredOrder.indexOf(a.column) - desiredOrder.indexOf(b.column);
  });

  // Update the search conditions
  state.searchConditions = updatedConditions;

  // Call the fetchPostsList function with updated conditions
  fetchPostsList({
    ...filterStore.getAll,
    searchConditions: updatedConditions,
  });
};

const handleReset = (clearFilters, dataIndex) => {
  clearFilters({
    confirm: true,
  });

  state.searchConditions = state.searchConditions.filter(
    (condition) => condition.column !== dataIndex
  );

  fetchPostsList({
    ...filterStore.getAll,
    searchConditions: state.searchConditions,
  });

  // router.push({ name: "admin-post-list" });
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
  fetchPostsList({
    ...filterStore.getAll,
    searchConditions: state.searchConditions,
  });
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
  // fetchPostsList({
  // 	...filter,
  // 	searchConditions: state.searchConditions,
  // });
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
const columns = [
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
    width: 120,
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "Điện thoại",
    dataIndex: "phone",
    key: "phone",
    width: 140,
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.phone.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },

  {
    title: "Năm sinh",
    dataIndex: "birth_year",
    key: "birth_year",
    width: 100,
    sorter: (a, b) => {
      // Chuyển đổi ngày sinh thành timestamp (giây từ Unix Epoch)
      const timestampA = new Date(a.birth_year).getTime();
      const timestampB = new Date(b.birth_year).getTime();

      // So sánh timestamp
      return timestampA - timestampB;
    },
  },
  {
    title: "Lĩnh vực kinh doanh",
    dataIndex: "business",
    key: "business",
    width: 150,
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.business.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "Chi tiết",
    key: "detail",
    width: 20,
  },
];

const getPostsList = async () => {
  data.value = [];
  const listPosts = await listPostsAPI.getAllPosts();
  const clients = await listCLientAPI.getAllClient();

  const listclient = [];
  for (const client of clients) {
    listclient.push({
      id: client.id,
      name: client.name,
      phone: client.phone,
      cccd: client.cccd,
      address: client.address,
      email: client.email,
      finance: client.finance,
      searcharea: client.searcharea,
      area: client.area,
      intendtime: client.intendtime,
      business: client.business,
      personnumber: client.personnumber,
      numbercars: client.numbercars,
      numbermotor: client.numbermotor,
      note: client.note,
      birth_year: client.birth_year,
      created_at: client.birth_year,
    });
  }
  data.value = listclient;
  console.log(data.value);
};
getPostsList();

const exportCLient = async () => {
  try {
    const clients = await listCLientAPI.exportAllClient();
    if (clients && clients.status === 200) {
      const blob = new Blob([clients.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);
      link.download = "clients.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
      messageAnt.success("Xuất file thành công");
    } else {
      messageAnt.error("Xuất file thất bại");
    }
  } catch (error) {
    console.error(error);
    messageAnt.error("Xuất file thất bại");
  }
};

const pagination = reactive({
  showSizeChanger: true,
  responsive: true,
  current: currentPage.value,
  showLessItems: true,
  total: total.value,
  onChange: (page, pageSize) => {
    pageFilter.value = page;
    pageSizeFilter.value = pageSize;
    fetchPostsList({
      ...filter,
      page: page,
      pageSize: pageSize,
      searchConditions: state.searchConditions,
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

watch(total, (newVal) => {
  pagination.total = newVal;
  total.value = newVal;
});

watch(pageFilter, (newVal) => {
  pagination.current = newVal;
});

const showConfirmDelete = async (id) => {
  Modal.confirm({
    title: "Cảnh báo",
    icon: createVNode(ExclamationCircleOutlined),
    class: "top-[24%]",
    content: createVNode(
      "div",
      {
        class: "text-danger",
      },
      "Bạn chắc chắn muốn xóa bài viết này ?"
    ),
    okText: "Xóa",
    cancelText: "Hủy",
    onOk() {
      const deletecClient = async () => {
        await listCLientAPI.deleteClientAPI(id);
        getPostsList();
        messageAnt.success("Xóa bài viết thành công");
      };
      deletecClient();
    },
    onCancel() {},
    maskClosable: true,
  });
};
</script>

<script>
import ThePageHeader from "../../../components/ThePageHeader.vue";
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
<style></style>
