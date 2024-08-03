import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "./style.css";
import router from "./router/index.js";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

import apiURL from "./api/constants.js";
import Config from './api/config/config.js';
// import CKEditor from "@ckeditor/ckeditor5-vue";

window.axios = axios;

router.beforeEach((to, from, next) => {
	window.scrollTo(0, 0);
	next();
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(Antd);
// app.use(CKEditor);
app.config.globalProperties.$apiURL = apiURL;
app.use(pinia);
app.use(router);
app.mount("#app");

async function updateTitle() {
	try {
	  const { getconfig, responseConfig } = Config();
	  await getconfig(); 
	  const configData = responseConfig.data; 
	  
	  if (configData && configData.title) {
		document.title = configData.title;
	  } else {
		document.title = 'Bật động sản'; 
	  }
	} catch (error) {
	  console.error('Error fetching config:', error);
	  document.title = 'Thuê văn phòng'; 
	}
  }
  
  // Gọi hàm để cập nhật title
  updateTitle();
