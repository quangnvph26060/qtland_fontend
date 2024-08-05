<template lang="">
	<a-layout class="min-h-screen">
		<a-layout-header style="background: #fff; padding: 0">
			<TheHeader />
		</a-layout-header>
		<TheSearchBar />

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
import { ref, h , onMounted} from "vue";
import Config from "../api/config/config.js";
 const { getconfig, responseConfig, updateConfig } = Config();
  const keyword = ref("");
 onMounted(async () => {
    await getconfig();
    const configData = responseConfig.data;
    console.log(configData);
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
import ThePageHeader from "../components/ThePageHeader.vue";
import TheContent from "../components/User/TheContent.vue";

export default {
	components: {
		TheHeader,
		TheSearchBar,
		ThePageHeader,
		TheContent,
	},
};
</script>
<style></style>
