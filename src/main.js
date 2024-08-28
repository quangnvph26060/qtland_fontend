import { createApp, onMounted } from "vue";
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
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.axios = axios;
window.Pusher = Pusher;
window.Echo = new Echo({
	broadcaster: 'pusher',
	key: '72b5ec4ddd643cd15ea0',
	cluster: 'mt1',
	forceTLS: true,
	broadcasterOptions: {
        authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth'
    }
});

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

		if (configData && configData.icon) {
			const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
			favicon.type = 'image/svg+xml';
			favicon.rel = 'icon';
			favicon.href = configData.icon;
			document.head.appendChild(favicon);
		} else {
			const defaultFavicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
			defaultFavicon.type = 'image/svg+xml';
			defaultFavicon.rel = 'icon';
			defaultFavicon.href = './src/assets/logo/logo-favicon.svg';
			document.head.appendChild(defaultFavicon);
		}
	} catch (error) {
		console.error('Error fetching config:', error);
		document.title = 'Thuê văn phòng';
	}
}

updateTitle();
