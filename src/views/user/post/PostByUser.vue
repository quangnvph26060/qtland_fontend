<template>
    <div class="w-100">
        <!-- begin::Form -->
        <div class="flex flex-col xl:flex-row w-100">
            <!-- begin::Main Column -->
            <div class="flex flex-col col-12 col-xl-4 gap-3 gap-lg-5">
                <Card>
                    <template #content>
                            <!-- begin:Statistic views -->
                            <div class="author flex items-center">
                                <a-avatar
                                    :size="64"
                                    :style="{
                                        backgroundColor: '#ADC178',
                                        verticalAlign: 'middle',
                                    }"
                                    class=""
                                >
                                    {{ store.user.name?.[0] }}
                                </a-avatar>
                                <div class="author ml-5">
                                    <h2>{{ store.user?.name }}</h2>
                                </div>
                            </div>
    
                            <!-- end::Statistic views -->
</template>
                </Card>
            </div>
            <!-- end::Main Column -->

            <!-- begin::Detail Column -->
            <div class="flex flex-col col-12 col-xl-8">
                <Card title="Tin đăng">
<template #content>
    <a-skeleton v-if="isLoading" :active="true" />
    <a-list item-layout="vertical" size="large" :data-source="data" :pagination="pagination" id="user-post" v-else>
        <template #renderItem="{ item }">
                                    <a-list-item
                                        key="item.title"
                                        class="flex n:flex-row-reverse md:flex-col-reverse p-0 n:w-100 md:w-[220px] md:mr-3 mb-3"
                                    >
                                        <router-link
                                            :to="{
                                                name: 'post-detail',
                                                params: { id: item.id },
                                            }"
                                        >
                                            <a-list-item-meta
                                                class="px-3 n:py-2 sm:py-3 border mb-0"
                                            >
                                                <template #title>
                                                    <a
                                                        :href="item.href"
                                                        class="line-clamp-2"
                                                        >{{ item.title }}</a
                                                    >
                                            </template>

                                            <template #description>
                                                <div class="flex space-x-4">
                                                    <div class="text-[#eb3131] text-base">
                                                        {{ formatMoney( item.price ) }}
                                                    </div>
                                                    <div class="text-[#eb3131] text-base">
                                                        {{ item.area }} m<sup>2</sup
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="mt-2 line-clamp-2">
                                                        {{ item.address }}
                                                    </div>
    
                                                    <!-- begin::Card Contact -->
                                                    <a-divider class="my-2" />
                                                    <div>
                                                        {{ item.created_at }}
                                                    </div>
                                                    <!-- end::Card Contact -->
</template>
                                        </a-list-item-meta>
                                    </router-link>

<template #extra>
    <router-link :to="{
                                                    name: 'post-detail',
                                                    params: { id: item.id },
                                                }">
                                                    <div class="gap-1 md:w-[220px] md:h-[220px]">
                                                        <div class="image-container">
                                                            <img :src="apiURL.URL+
                                                                item.post_image?.[0]
                                                                    ?.image_path
                                                            " class="n:w-[120px] h-[160px] md:w-[220px] md:h-[220px] object-cover" />
                                            </div>
                                        </div>
                                    </router-link>
                                </template>
                                </a-list-item>
                            </template>
                        </a-list>
                    </template>
                </Card>
            </div>
            <!-- end::Detail Column -->
        </div>
        <!-- end::Form -->
    </div>
</template>

<script setup>
import Card from "../../../components/base/card/Card.vue";
import auth from "../../../stores/auth";
import listPostsAPI from "../../../api/posts/index";
import getTimeSincePostCreation from "../../../utils/getTimeSincePostCreation";
import { ref, reactive, watch, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import formatMoney from "../../../utils/formatMoney";
import apiURL from "../../../api/constants";

const props = defineProps({
    rangeArea: String,
    rangePrice: String,
    dirs: String,
});

const isLoading = ref(false);
const store = auth();
const role_id = store.user.role_id;

const totalLand = ref(0);
const data = ref([]);
const route = useRoute();
const userId = route.params.id;

/**
 * Hàm lấy danh sách bài viết theo user id
 * @param
 * CreatedBy: youngbachhh (26/04/2024)
 */
const fetchPostByUser = async (userId) => {
    isLoading.value = true;
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
        status_id: "",
        user: "",
        comment: [],
        post_image: [],
    });
    const posts = [];

    for (let i = 0; i < listPosts.length; i++) {
        const post = listPosts[i];
        Object.keys(ans).forEach((key) => {
            ans[key] = post[key];
        });
        ans.created_at = getTimeSincePostCreation(post.created_at);
        posts.push({ ...ans });
    }

    data.value = posts;
    if (role_id === 4) {
        data.value = posts.filter((item) => item.price < 20000000000);
    }
    totalLand.value = data.value.length;
    isLoading.value = false;
};

fetchPostByUser(userId);

// Pagination
const pagination = reactive({
    pageSize: 10,
    showSizeChanger: true,
    responsive: true,
    showLessItems: true,
    onChange: (page, pageSize) => {},
});
</script>

<script>
export default {};
</script>

<style>
#user-post .ant-list-items {
    display: flex;
    flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
    #user-post .ant-list-items {
        display: block;
    }
}
</style>