import apiURL from "../constants";

const createImageAPI = {
	postImage: async (formData) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/uploadMultiple`,
				formData
			);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
	updatePostImage: async (formData) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/updateMultiple`,
				formData
			);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
	commentImage: async (formData) => {
		try {
			const response = await axios.put(
				`${apiURL.baseURL}/uploadMultipleCommentImg`,
				formData
			);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
};

export default createImageAPI;
