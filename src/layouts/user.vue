<template lang="">
	<a-layout class="min-h-screen">
		<a-layout-header style="background: #fff; padding: 0">
			<TheHeader />
		</a-layout-header>
		<template  v-if="showContent">
  			<div>
				<template v-if="!postId">
					<TheSearchBar />
				</template>
				<template v-if="postId">
					<TheSearchDetail />
				</template>
			</div>
		</template>
		<a-layout>
			<a-layout-content>
				<TheContent />
			</a-layout-content>
		</a-layout>

		<a-layout-footer class="text-center bg-[#]" :style="footerStyle">
            <div class="text-white text-lg">
                 {{  keyword }}
            </div>
        </a-layout-footer>
	</a-layout>
</template>

<script setup>
import { ref, h , onMounted, watch} from "vue";
import Config from "../api/config/config.js";
import { useRoute } from "vue-router";
const route = useRoute();
const postId = ref(null);
const showContent = ref(true);

const updatePostId = () => {
 if (route.path.startsWith('/post-detail')) {
    postId.value = route.params.id || null;
    showContent.value = true; // Show content if in post-detail
  } else if (route.path.startsWith('/post-create') || route.path.startsWith('/client-report-create')) {
    postId.value = null;
    showContent.value = false; // Hide content if in post-create
  } else {
    postId.value = null;
    showContent.value = true; // Default to show content if other paths
  }
};

onMounted(() => {
  updatePostId();
});

watch(() => route.path, () => {
  updatePostId();
}, { immediate: true });



const { getconfig, responseConfig, updateConfig } = Config();
const keyword = ref("");
onMounted(async () => {
    await getconfig();
    const configData = responseConfig.data;
    
    if (configData) {
      keyword.value = configData.keyword;
    //   alert(keyword.value );
    }
  });
const footerStyle = {
	textAlign: "center",
	color: "#fff",
	backgroundColor: "#8b3035",
};
</script>

<script>
import TheHeader from "../components/User/TheHeader.vue";
import TheSearchBar from "../components/User/TheSearchBar.vue";
import TheSearchDetail from "../components/User/TheSearchDetail.vue";
import ThePageHeader from "../components/ThePageHeader.vue";
import TheContent from "../components/User/TheContent.vue";

export default {
	components: {
		TheHeader,
		TheSearchBar,
		ThePageHeader,
		TheContent,
		TheSearchDetail
	},
};
</script>
<style></style>
