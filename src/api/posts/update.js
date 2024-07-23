import apiURL from "../constants";

const updatePostAPI = {
	updateStatus: async (id) => {
		try {
			const response = await axios.patch(`${apiURL.baseURL}/posts/${id}`);
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
};

export default updatePostAPI;
