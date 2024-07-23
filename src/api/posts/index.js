import apiURL from "../constants";

const listPostsAPI = {
	getAllPosts: async () => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostPending: async () => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/pending`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostNotPending: async () => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/notPending`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostByFilter: async (arr) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/filter`, {
				params: {
					min_price: arr.min_price,
					max_price: arr.max_price,
					min_area: arr.min_area,
					max_area: arr.max_area,
					dirs: arr.dirs,
					address: arr.address === "" ? null : arr.address,
					page: arr.page,
					pageSize: arr.pageSize,
					priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
				},
			});
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostByUser: async (id) => {
		try {
			const response = await axios.get(
				`${apiURL.baseURL}/posts/user/${id}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostCountByUser: async (id) => {
		try {
			const response = await axios.get(
				`${apiURL.baseURL}/posts/user/${id}/count`
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
};

export default listPostsAPI;
