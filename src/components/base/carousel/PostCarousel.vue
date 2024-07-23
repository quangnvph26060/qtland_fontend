<template>
    <div class="swiper-container">
		<swiper :breakpoints="{
			640: {
				slidesPerView: 2,
				spaceBetween: 10,
			  },
			768: {
			  slidesPerView: 5,
			  spaceBetween: 10
			}
		  }" :autoplay="true" :modules="[Autoplay]" class="mySwiper">
			
			  <swiper-slide v-for="item in data" :key="item.id">  
				 <div class="post_carousel-item">
						<a href="#"><img :src="item.post_image[0].image_path" alt="" class="post_carousel-img"></a>		
						<div class="post_carousel-paragrap">cscsscscs</div>
				</div>
				
				 </swiper-slide>  
			  </swiper>
			  <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
	</div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import listPostsAPI from "../../../api/posts/index";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import apiURL from "../../../api/constants";
import { Autoplay } from 'swiper/modules';

const props = defineProps({
    title: {
        type: String,
        default: null,
    },
    condition: {
        type: String,
        default: null,
    },
});

const imagesData = ref('');
const data = ref();
const filter = ref({
    "min_price": 0,
    "max_price": 60000000000,
    "min_area": 0,
    "max_area": 1000,
    "dirs": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
    ],
    "address": "",
    "sold_status": [],
    "priority_status": []
})

const fetchPostsList = async (filter, page = 1, pageSize = 10) => {
    data.value =[];
	let res;

	res = await listPostsAPI.getPostByFilter({
		...filter,
		page: page,
		pageSize: pageSize,
	});
    data.value = res.data;
}

onMounted(() => {
      fetchPostsList();

});
</script>

<script>
export default {};
</script>

<style scoped>
.mySwiper{
display: flex;
flex-direction: row;
}

.swiper-container {
	width: 100%;
	height: 100%;
  }
  
  .post_carousel-item {
	display: flex;
	justify-content: center;
	align-items: center;
  }
  
  .post_carousel-img {
	width: 100%;
	height: auto;
  }
</style>
