import apiURL from "../constants";

const getPostAPI = {
	getById: async (id) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
};

export default getPostAPI;
