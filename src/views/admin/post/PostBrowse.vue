<template>
    <div class="card border-x-0">
        <!-- begin::Card Header -->
        <div
            class="card-header flex flex-row-reverse justify-between mb-3 md:mb-0"
        >
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

                <!-- begin::Export -->
                <a-button @click="showModalExport">
                    <template #icon>
                        <ExportOutlined />
                    </template>
                    Xuất file
                </a-button>
                <a-modal
                    v-model:open="openModalExport"
                    title="Xuất file"
                    cancelText="Huỷ"
                    okText="Xuất file"
                    class="top-[20%]"
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
                                <a-select-option value="excel"
                                    >Excel</a-select-option
                                >
                                <a-select-option value="admin"
                                    >PDF</a-select-option
                                >
                                <a-select-option value="admin"
                                    >Zip</a-select-option
                                >
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
            <!-- begin::Table -->
            <div>
                <div style="margin-bottom: 16px">
                    <a-button
                        type="primary"
                        class="w-[120px]"
                        :disabled="!hasSelected"
                        :loading="state.loading"
                        @click="start"
                    >
                        Xác nhận tin
                    </a-button>
                    <span style="margin-left: 8px">
                        <template v-if="hasSelected">
                            {{ `Đã chọn ${state.selectedRowKeys.length} tin` }}
                        </template>
                    </span>
                </div>
                <a-table
                    :row-selection="{
                        selectedRowKeys: state.selectedRowKeys,
                        onChange: onSelectChange,
                    }"
                    :columns="columns"
                    :data-source="data"
                    :scroll="{ x: 1500 }"
                    :pagination="pagination"
                >
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
                                style="
                                    width: 188px;
                                    margin-bottom: 8px;
                                    display: block;
                                "
                                @change="
                                    (e) =>
                                        setSelectedKeys(
                                            e.target.value
                                                ? [e.target.value]
                                                : []
                                        )
                                "
                                @pressEnter="
                                    handleSearch(
                                        selectedKeys,
                                        confirm,
                                        column.dataIndex
                                    )
                                "
                            />
                            <a-button
                                type="primary"
                                size="small"
                                style="width: 90px; margin-right: 8px"
                                @click="
                                    handleSearch(
                                        selectedKeys,
                                        confirm,
                                        column.dataIndex
                                    )
                                "
                            >
                                <template #icon><SearchOutlined /></template>
                                Tìm
                            </a-button>
                            <a-button
                                size="small"
                                style="width: 90px"
                                @click="handleReset(clearFilters)"
                            >
                                Đặt lại
                            </a-button>
                        </div>
                    </template>
                    <template #customFilterIcon="{ filtered }">
                        <search-outlined
                            :style="{ color: filtered ? '#108ee9' : undefined }"
                        />
                    </template>
                    <template #bodyCell="{ text, column, record }">
                        <template v-if="column.key === 'detail'">
                            <div>
                                <a-dropdown trigger="click">
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item key="1">
                                                <router-link
                                                    :to="{
                                                        name: 'admin-post-detail',
                                                        params: {
                                                            id: record.id,
                                                        },
                                                    }"
                                                >
                                                </router-link>
                                                Sửa
                                            </a-menu-item>
                                            <a-menu-item key="2">
                                                <div
                                                    @click="
                                                        showConfirmDelete(
                                                            record.id
                                                        )
                                                    "
                                                >
                                                    Xoá
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                    <a-button>
                                        Chức năng
                                        <DownOutlined />
                                    </a-button>
                                </a-dropdown>
                            </div>
                        </template>
                        <template v-else-if="column.dataIndex === 'price'">
                            {{ formatMoney(record.price) }}
                        </template>
                        <template v-else-if="column.dataIndex === 'area'">
                            {{ record.area }} m<sup>2</sup>
                        </template>
                        <template
                            v-else-if="column.dataIndex === 'sold_status'"
                        >
                            <a-tag
                                :color="
                                    record.sold_status === 1
                                        ? '#87d068'
                                        : record.sold_status === 0
                                        ? '#f50'
                                        : ''
                                "
                            >
                                {{
                                    record.sold_status == 1
                                        ? "đã bán"
                                        : "chưa bán"
                                }}</a-tag
                            >
                        </template>
                        <template v-else-if="column.dataIndex === 'status_id'">
                            <div>
                                <a-tag color="processing">
                                    chờ duyệt
                                    <template #icon>
                                        <sync-outlined :spin="true" />
                                    </template>
                                </a-tag>
                            </div>
                        </template>
                        <span
                            v-else
                            @click="
                                () =>
                                    router.push({
                                        name: 'admin-post-by-id',
                                        params: { id: record.id },
                                    })
                            "
                            class="cursor-pointer"
                        >
                            <template
                                v-for="(fragment, i) in text
                                    .toString()
                                    .split(
                                        new RegExp(
                                            `(?<=${state2.searchText})|(?=${state2.searchText})`,
                                            'i'
                                        )
                                    )"
                            >
                                <div class="line-clamp-2 inline">
                                    <mark
                                        v-if="
                                            fragment.toLowerCase() ===
                                            state2.searchText.toLowerCase()
                                        "
                                        :key="i"
                                        class="highlight"
                                    >
                                        {{ fragment }}
                                    </mark>
                                    <template v-else>{{ fragment }}</template>
                                </div>
                            </template>
                        </span>
                    </template>
                </a-table>
            </div>
            <!-- end::Table -->
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

import { Modal } from "ant-design-vue";

const state2 = reactive({
    searchText: "",
    searchedColumn: "",
});
const searchInput = ref();
const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    state2.searchText = selectedKeys[0];
    state2.searchedColumn = dataIndex;
};
const handleReset = (clearFilters) => {
    clearFilters({
        confirm: true,
    });
    state2.searchText = "";
};

// modal export
const openModalExport = ref(false);
const showModalExport = () => {
    openModalExport.value = true;
};
const handleOkModalExport = (e) => {
    openModalExport.value = false;
};

// table
const columns = [
    {
        title: "Người đăng",
        dataIndex: "name",
        key: "name",
        width: 100,
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
        title: "Tiêu đề",
        dataIndex: "title",
        key: "title",
        width: 250,
        customFilterDropdown: true,
        onFilter: (value, record) =>
            record.title.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => {
                    searchInput.value.focus();
                }, 100);
            }
        },
    },
    {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
        width: 200,
        customFilterDropdown: true,
        onFilter: (value, record) =>
            record.address
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => {
                    searchInput.value.focus();
                }, 100);
            }
        },
    },
    {
        title: "Giá bán",
        dataIndex: "price",
        key: "price",
        width: 120,
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: "Diện tích",
        dataIndex: "area",
        key: "area",
        width: 100,
        sorter: (a, b) => a.area - b.area,
    },
    // {
    //     title: "Lượt xem",
    //     dataIndex: "view",
    // },
    {
        title: "Trạng thái",
        dataIndex: "sold_status",
        key: "sold_status",
        width: 100,
        filters: [
            {
                text: "Chưa bán",
                value: 0,
            },
            {
                text: "Đã bán",
                value: 1,
            },
        ],
        onFilter: (value, record) => record.sold_status === value,
    },
    {
        title: "Trạng thái bài viết",
        dataIndex: "status_id",
        key: "status_id",
        width: 120,
        filters: [
            {
                text: "Chờ xử lý",
                value: 3,
            },
            {
                text: "Công khai",
                value: 4,
            },
            {
                text: "Không công khai",
                value: 5,
            },
        ],
        onFilter: (value, record) => record.status_id === value,
    },
    {
        title: "Chi tiết",
        key: "detail",
        fixed: "right",
        width: 120,
    },
];
const data = ref([]);

/**
 * Hàm lấy danh sách bài viết chờ duyệt
 * @param
 * CreatedBy: youngbachhh (29/03/2024)
 */

const fetchPostsPendingList = async () => {
    data.value = [];

    const listPosts = await listPostsAPI.getPostPending();
    const posts = [];

    if (listPosts.length === 0) return;

    for (const post of listPosts) {
        posts.push({
            key: post.id,
            id: post.id,
            username: post.user.name,
            title: post.title,
            address: post.address,
            created_at: formatDate(post.created_at),
            updated_at: formatDate(post.updated_at),
            view: 1000,
            sold_status: post.sold_status,
            status: post.status.name,
        });
    }

    data.value = posts;
};

fetchPostsPendingList();

const state = reactive({
    selectedRowKeys: [],
    loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const start = () => {
    state.loading = true;
    const updateStatus = async () => {
        for (const id of state.selectedRowKeys) {
            await updatePostAPI.updateStatus(id);
        }
        state.loading = false;
        state.selectedRowKeys = [];
        fetchPostsPendingList();
        messageAnt.success();
    };
    updateStatus();
};
const onSelectChange = (selectedRowKeys) => {
    state.selectedRowKeys = selectedRowKeys;
};

const pagination = reactive({
    pageSize: 10,
    showSizeChanger: true,
    responsive: true,
    showLessItems: true,
    onChange: (page, pageSize) => {},
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
            const deletePost = async () => {
                await deletePostAPI(id);
                fetchPostsPendingList();
                messageAnt.success();
            };
            deletePost();
        },
        onCancel() {},
        maskClosable: true,
    });
};
</script>

<script>
import { ref } from "vue";
import ThePageHeader from "../../../components/ThePageHeader.vue";

export default {
    components: {
        ThePageHeader,
    },
};
</script>
<style lang=""></style>
