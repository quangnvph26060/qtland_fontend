<template>
	<div class="flex justify-center">
		<a-carousel class="w-[90%] h-100" arrows autoplay={true} dots-class="slick-dots slick-thumb" draggable>
			<template #prevArrow>
					<div
						class="custom-slick-arrow bg-transparent"
						style="left: 50px"
					>
					<a-button >
						<LeftOutlined  style="margin-bottom:10px;"/>
					  </a-button>
						
					</div>
</template>

<template #nextArrow>
	<div class="custom-slick-arrow bg-transparent" style="right: 50px">
		<a-button>
			<RightOutlined />
		</a-button>
	
	</div>
</template>

<template #customPaging="props">
	<div class="">
		<a class="flex h-[100px] w-[100px] mt-2 ">
							<img
								:src="imagesData?.[props.i].image_path"
								width="200px"
								class="object-cover w-[200px] "
							/>
						</a>
	</div>
</template>

			<a-image
				v-for="item in imagesData"	
				:src="item.image_path"
				:preview="{ visible: false }"
				@click="visible = true"
				:previewMask="false"
			/>
		</a-carousel>
		<div class="hidden h-0">
			<a-image-preview-group
				:preview="{
					visible,
					onVisibleChange: (vis) => (visible = vis),
				}"
			>
				<a-image v-for="item in imagesData" :src="item.image_path" />
			</a-image-preview-group>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Button } from 'ant-design-vue';
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import getImageDetailAPI from "../../../api/images/getDetail";
import apiURL from "../../../api/constants";
const props = defineProps({
	postId: {
		type: String,
		required: true,
	},
	post_image: {
		type: Array,
		required: true,
	},
});

const emits = defineEmits(["update:isLoading"]);

const visible = ref(false);
const imagesData = ref(...props.post_image);

watch(
	() => props.post_image,
	(newValue, oldValue) => {
		imagesData.value = newValue;
		emits("update:isLoading", false);
	}
);
</script>

<script>
export default {};
</script>

<style scoped>
:deep(.slick-arrow.custom-slick-arrow) {
	width: 46px;
	height: 32px;
	border-radius: 8px;
	font-size: 25px;
	color: white !important;
	background-color: white;
	transition: ease all 0.5s;
	opacity: 0.3;
	z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
	display: none;
}

:deep(.slick-arrow.custom-slick-arrow .ant-btn span svg) {
	margin-bottom: 5px;
}

:deep(.slick-dots) {
	position: relative;
	height: auto;
}

:deep(.slick-thumb) {
	bottom: -10px;
	overflow-x: scroll;
}

:deep(.slick-thumb li) {
	width: 60px;
	height: 45px;
}

:deep(.slick-thumb li img) {
	border-radius: 5px;
	width: 100%;
	height: 100%;
	display: block;
	/* filter: grayscale(100%); */
}

:deep(.slick-thumb li.slick-active) {
	width: 60px;
	height: 45px;
}

:deep(.slick-thumb li.slick-active img) {
	filter: grayscale(0%);
}

.custom-slick-arrow {
	top: 35% !important;
	opacity: 1 !important;
	color: white !important;
	background-color: rgba(255, 255, 255, 0.4) !important;
}

.custom-slick-arrow:hover {
	color: #cfc9c9 !important;
	background-color: #8b3035 !important;
}

:deep(.ant-image-img) {
	width: 100%;
	object-fit: cover;
}

@media screen and (max-width: 768px) {
	:deep(.ant-image-img) {
		width: 300px !important;
		height: 300px !important;
	}
}

@media screen and (min-width: 768px) {
	:deep(.ant-image-img) {
		width: 800px !important;
		height: 500px !important;
	}
}
</style>
