<template>
    <div class="w-100">
      <!-- begin::Form -->
      <div class="flex flex-col xl:flex-row w-100">
        <!-- begin::Detail Column -->
        <div
          class="flex flex-col col-12 col-xl-12 gap-lg-12 px-4"
          style="background-color: white"
        >
          <div class=" mt-5">
            <form
              class="p-4 mx-auto bg-white rounded-lg shadow-md"
              @submit.prevent="handleSubmit"
            >
              <div class="form-group mb-4">
                <label for="title" class="font-bold text-gray-700"
                  >Tên website</label
                >
                <input
                  type="text"
                  class="form-control mt-2 p-2 border border-gray-300 rounded-md w-full"
                  v-model="title"
                  id="title"
                  placeholder="Nhập tên website"
                />
              </div>
  
              <div class="form-group mb-4">
                <label for="description" class="font-bold text-gray-700"
                  >Mô tả</label
                >
                <input
                  type="text"
                  class="form-control mt-2 p-2 border border-gray-300 rounded-md w-full"
                  v-model="description"
                  id="description"
                  placeholder="Nhập mô tả"
                />
              </div>
  
              <div class="form-group mb-4">
                <label for="logo" class="font-bold text-gray-700">Logo</label>
                <input
                  type="file"
                  class="form-control mt-2 p-2 border border-gray-300 rounded-md w-full"
                  id="logo"
                  @change="onFileChange"
                />
                <img :src="logo" alt="Logo" class="app-header-logo-image w-[100px] h-[64px] mt-4" />
              </div>
  
              <div class="form-group mb-4">
                <label for="notes" class="font-bold text-gray-700">Footer</label>
                <textarea
                  class="form-control mt-2 p-2 border border-gray-300 rounded-md w-full"
                  id="notes"
                  rows="3"
                  v-model="keyword"
                  placeholder="Nhập thêm Footer"
                ></textarea>
              </div>
  
              <div class="flex justify-center">
                <button
                  type="submit"
                  class="btn btn-primary py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- end::Detail Column -->
      </div>
      <!-- end::Form -->
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, inject, onMounted } from "vue";
  import Config from "../../../api/config/config.js";
  import messageAnt from "../../../scripts/message";
  const title = ref("");
  const description = ref("");
  const keyword = ref("");
  const logo = ref(null);
  const { getconfig, responseConfig, updateConfig } = Config();
  
  const onFileChange = (e) => {
    logo.value = e.target.files[0];
  };
  
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("keyword", keyword.value);
    if (logo.value) {
      formData.append("logo", logo.value);
    }
  
    try {
      await updateConfig(formData);
      messageAnt.success("Cập nhật thành công");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      messageAnt.success("Đã xảy ra lỗi  khi cập nhật");
    }
  };
  
  onMounted(async () => {
    await getconfig();
    const configData = responseConfig.data;
    if (configData) {
      title.value = configData.title;
      description.value = configData.description;
      keyword.value = configData.keyword;
      logo.value = configData.logo;
      // alert(logo.value);
    }
  });
  </script>
  