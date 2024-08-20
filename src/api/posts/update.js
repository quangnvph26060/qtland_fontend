import apiURL from "../constants";
import listPostsAPI from "./index.js";
const updatePostAPI = {
	updateStatus: async (id) => {
		try {
			const response = await axios.patch(`${apiURL.baseURL}/posts/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
	updateStatus2: async (id) => {
		try {
			const response = await axios.patch(`${apiURL.baseURL}/posts/status2/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
	update: async (id, post) => {
		try {
			const response = await axios.put(
				`${apiURL.baseURL}/posts/${id}`,
				post
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	},
	updateSold: async (id, value) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/posts/sold_status/${id}`, value
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	},
	updateSoldStatus: async (id, value, user_id, status) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/posts/soldstatus/${id}`, {
					sold_status: value,
					status_id : status
				}
			);
			if(response.status == 200){
				window.handleStatusUpdated();
				
			}
			return response;
		} catch (error) {
			console.error(error);
		}
	},
	updatepending: async (id, value, note) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/posts/pending/${id}`,{
					status_id : value,
					note : note,
				}
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	},
};

export default updatePostAPI;
