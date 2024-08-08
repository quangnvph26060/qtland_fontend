<template>
  <div class="h-[67px]" id="user_sliderbar_detail mt-4">
    <div class=" fixed-top min-h-[50px] mt-[100px] bg-primary-white-color w-100">
      <div class="flex flex-wrap align-items-center border-t-[1px] ml-auto mr-auto w-[100%]">
        <div class="menu-tabs col-12 d-flex justify-content-center" style="padding: 5px; max-width: 720px; ">
          <a-tabs :activeKey="activeKey" @change="handleTabChange" style=" font-weight: 600; ">
            <a-tab-pane key="1" tab="Thông tin mô tả"  >
              <div class="tab-content" >
                <!-- Add content or import component here -->
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Đặc điểm">
              <div class="tab-content">
                <!-- Add content or import component here -->
              </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="Bình luận">
              <div  class="tab-content">
                <!-- Add content or import component here -->
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount } from "vue";

const activeKey = ref("");
const isScrolling = ref(false);

const handleTabChange = (key) => {
  activeKey.value = key;
  let sectionId = '';
  
  switch (key) {
    case '1':
      sectionId = 'description-section';
      break;
    case '2':
      sectionId = 'features-section';
      break;
    case '3':
      sectionId = 'comments-section';
      break;
    default:
      return;
  }

  const section = document.getElementById(sectionId);
  if (section) {
    isScrolling.value = true;
    const offset = 100; // Điều chỉnh theo chiều cao của header cố định hoặc khoảng cách mong muốn
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    setTimeout(() => {
      isScrolling.value = false;
    }, 300); // Thay đổi thời gian nếu cần
  }
};
const handleScroll = () => {
  if (isScrolling.value) return; // Tránh cập nhật khi đang cuộn

  const scrollPosition = window.scrollY;
  const offset = 130; // Điều chỉnh theo chiều cao của header cố định hoặc khoảng cách mong muốn

  const descriptionSection = document.getElementById('description-section');
  const featuresSection = document.getElementById('features-section');
  const commentsSection = document.getElementById('comments-section');

  if (descriptionSection && featuresSection && commentsSection) {
    const descriptionTop = descriptionSection.getBoundingClientRect().top + window.scrollY;
    const featuresTop = featuresSection.getBoundingClientRect().top + window.scrollY;
    const commentsTop = commentsSection.getBoundingClientRect().top + window.scrollY;

    if (scrollPosition + offset >= commentsTop - 200 ) {
      activeKey.value = "3";
    } else if (scrollPosition + offset >= featuresTop ) {
      activeKey.value = "2";
    } else if (scrollPosition + offset >= descriptionTop  ) {
      activeKey.value = "1";
    } else {
      activeKey.value = "";
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped>

</style>
