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
            <div v-else class="flex w-full justify-between">
                <span>Hiện có {{ total }} bất động sản </span>
                <div>
                    <a-select ref="select" v-model:value="value1" style="width: 120px" :options="options1" @focus="focus" @change="handleChange">
                    </a-select>
                </div>
            </div>
            <!-- end::Total land -->
        </div>
        <!-- end::Content Navbar -->
    
        <!-- begin::Main Content -->
        <div class="space-y-10 mb-5">
            <!-- begin::Content Item -->
            <a-skeleton v-if="isLoading" :active="true" />
            <a-list item-layout="vertical" size="large" :data-source="data" :pagination="pagination" v-else>
                <template #header>
                                				<div class="text-xl font-semibold">Danh sách bài viết</div>
</template>

<template #renderItem="{ item, index }">
    <div :key="item.id" class="w-full md:w-1/4 p-2 post-container">
        <div class="border rounded-lg overflow-hidden flex flex-row h-full post-item">
            <router-link :to="{ name: 'post-detail', params: { id: item.id } }" class="block">
                <div class="relative h-48">
                    <img :src="item.post_image?.[0]?.image_path" class="w-full h-full object-cover" alt="Post Image" />
                    <div v-if="item.priority_status !== 'không yêu cầu'" class="absolute top-2 left-2 px-2 py-1 text-white bg-red-500 rounded">
                        {{ item.priority_status }}
                    </div>
                </div>
                <div class="p-4">
                    <h2 class="text-lg font-semibold line-clamp-2">
                        {{ item.title }}
                    </h2>
                    <div class="flex align-items-center">
                        <div class="text-red-500 text-base mr-1">
                            {{ formatMoney(item.price) }} -
                        </div>
                        
                        <div class="text-red-500 text-base">
                            {{ item.area }} m<sup>2</sup>
                        </div>
                    </div>
                    <div class="mt-2 line-clamp-2">{{ item.address }}</div>
                    <a-divider class="my-3" />
                    <div class="flex items-center">
                        <a-avatar class="me-2" :style="{
                                							  backgroundColor: '#ADC178',
                                							  verticalAlign: 'middle',
                                							}">
                            {{ item.user.name[0] }}
                        </a-avatar>
                        <div class="flex flex-col">
                            <div>{{ item.user.name }}</div>
                            <div>{{ item.created_at }}</div>
                        </div>
                    </div>
                </div>
            </router-link>
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
	<SidebarFilter class="fixed right-[14.5vw] sidebar-filter" />
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
} from "vue";
import formatMoney from "../../../utils/formatMoney";
import auth from "../../../stores/auth";
import router from "../../../router";
import filterRange from "../../../stores/filterRange";
import { gsap } from "gsap";
import apiURL from "../../../api/constants";

const text5 = ref(null);

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

        tl_5.staggerFrom(
            $text5,
            0.5, { opacity: 0, x: 40, ease: "power1.out" },
            0.1,
            "+=1.2"
        ).staggerTo(
            $text5,
            0.5, { opacity: 0, x: -40, ease: "power1.out" },
            0.1,
            "+=1.5"
        );
    }
});
const filterStore = filterRange();
const openBanner = ref(true);

let filter = filterStore.getAll;

onBeforeUnmount(() => {
    filterStore.resetFilters();
});

const props = defineProps({
    rangeArea: String,
    rangePrice: String,
    dirs: String,
    address: String,
});

const store = auth();
const role_id = store.user.role_id;

const total = ref(0);
const data = ref([]);

const isLoading = ref(false);

if (!store.token) {
    router.push({ name: "login" });
}

// Lọc bài viết theo ưu tiên
const value1 = ref("all");
const options1 = ref([{
        value: "all",
        label: "Tất cả",
    },
    {
        value: "hot",
        label: "HOT",
    },
    {
        value: "tăng chào",
        label: "Tăng chào",
    },
    {
        value: "quy hoạch",
        label: "Quy hoạch",
    },
    {
        value: "giảm chào",
        label: "Giảm chào",
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

const fetchPostsFilter = async (
    filter,
    page = 1,
    pageSize = 10,
    priority = "all"
) => {
    isLoading.value = true;
    data.value = [];

    let listPosts;
    let res;

    res = await listPostsAPI.getPostByFilter({
        ...filter,
        page: pageFilter.value,
        pageSize: pageSizeFilter.value,
        priority: value1.value,
    });
    listPosts = res.data;

    const ans = reactive({
        id: "",
        title: "",
        description: "",
        price: "",
        direction: "",
        area: "",
        address: "",
        created_at: "",
        views_count: 0,
        sold_status: "",
        status_id: "",
        priority_status: "",
        user: "",
        comment: [],
        post_image: [],
    });
    const posts = [];
    if (listPosts.length === 0) {
        isLoading.value = false;
        return;
    }
    for (let i = 0; i < listPosts.length; i++) {
        const post = listPosts[i];
        Object.keys(ans).forEach((key) => {
            ans[key] = post[key];
        });
        ans.created_at = getTimeSincePostCreation(post.created_at);
        posts.push({ ...ans });
    }

    data.value = posts;

    if (role_id == 4) {
        data.value = posts.filter((item) => item.price < 20000000000);
    }

    // if (role_id == 2) {
    // 	data.value = posts.filter(
    // 		(item) => {
    // 			item.user.id == store.user.id || item.user.role_id == 1
    //         }
    // 	);
    // }

    total.value = res.total;

    isLoading.value = false;
};

fetchPostsFilter(filter);

// Hàm lấy màu tag theo trạng thái ưu tiên
const getColorTagByPriorityStatus = (priority_status) => {
    switch (priority_status) {
        case "hot":
            return "hot-priority";
        case "tăng chào":
            return "high-priority";
        case "giảm chào":
            return "low-priority";
        case "quy hoạch":
            return "medium-priority";
        default:
            return "";
    }
};

const pagination = reactive({
    showSizeChanger: false,
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
            priority: value1.value,
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
});

watch(pageFilter, (newVal) => {
    pagination.current = newVal;
});
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
.sidebar-filter{
    max-width: 150px;
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
    display: flex !important;
    flex-wrap: wrap !important;
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
