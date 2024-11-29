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
	getPostsByUser: async (arr) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/postsold/user`, {
				params: {
					min_price: arr.min_price,
					max_price: arr.max_price,
					min_area: arr.min_area,
					max_area: arr.max_area,
					dirs: arr.dirs,
					address: arr.address === "" ? null : arr.address,
					page: arr.page,
					pageSize: arr.pageSize,
					// priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
					classrank: arr.classrank,
					user_id: arr.user_id
				},
			});
	
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
					// priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
					classrank: arr.classrank,
				},
			});
	
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostByFilterByUserID: async (id, arr) => {
		
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/filter/admin/user/${id}`, {
				params: {
					min_price: arr.min_price,
					max_price: arr.max_price,
					min_area: arr.min_area,
					max_area: arr.max_area,
					dirs: arr.dirs,
					address: arr.address === "" ? null : arr.address,
					page: arr.page,
					pageSize: arr.pageSize,
					// priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
					classrank: arr.classrank,
				},
			});
	
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostByFilterstatus4ByUserID: async (id, arr) => {
		
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/filter/admin/status4/user/${id}`, {
				params: {
					min_price: arr.min_price,
					max_price: arr.max_price,
					min_area: arr.min_area,
					max_area: arr.max_area,
					dirs: arr.dirs,
					address: arr.address === "" ? null : arr.address,
					page: arr.page,
					pageSize: arr.pageSize,
					// priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
					classrank: arr.classrank,
				},
			});
	
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostByFiltersoldByUserID: async (id, arr) => {
		
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/filter/admin/sold/user/${id}`, {
				params: {
					min_price: arr.min_price,
					max_price: arr.max_price,
					min_area: arr.min_area,
					max_area: arr.max_area,
					dirs: arr.dirs,
					address: arr.address === "" ? null : arr.address,
					page: arr.page,
					pageSize: arr.pageSize,
					// priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
					classrank: arr.classrank,
				},
			});
	
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostByFilterstatus3ByUserID: async (id, arr) => {
		
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/filter/admin/status3/user/${id}`, {
				params: {
					min_price: arr.min_price,
					max_price: arr.max_price,
					min_area: arr.min_area,
					max_area: arr.max_area,
					dirs: arr.dirs,
					address: arr.address === "" ? null : arr.address,
					page: arr.page,
					pageSize: arr.pageSize,
					// priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
					classrank: arr.classrank,
				},
			});
	
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostByFilterstatus2ByUserID: async (id, arr) => {
		
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/filter/admin/status2/user/${id}`, {
				params: {
					min_price: arr.min_price,
					max_price: arr.max_price,
					min_area: arr.min_area,
					max_area: arr.max_area,
					dirs: arr.dirs,
					address: arr.address === "" ? null : arr.address,
					page: arr.page,
					pageSize: arr.pageSize,
					// priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
					classrank: arr.classrank,
				},
			});
	
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostByFilterByUser: async (id, arr) => {
		
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/filter/user/${id}`, {
				params: {
					min_price: arr.min_price,
					max_price: arr.max_price,
					min_area: arr.min_area,
					max_area: arr.max_area,
					dirs: arr.dirs,
					address: arr.address === "" ? null : arr.address,
					page: arr.page,
					pageSize: arr.pageSize,
					// priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
					classrank: arr.classrank,
				},
			});
	
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostBySoldFilter: async (arr) => {
		
		try {
			const id = localStorage.getItem('user_id');
			const response = await axios.get(`${apiURL.baseURL}/posts/filtersold`, {
				params: {
					min_price: arr.min_price,
					max_price: arr.max_price,
					min_area: arr.min_area,
					max_area: arr.max_area,
					min_front: arr.min_front,
					max_front: arr.max_front,
					dirs: arr.dirs,
					address: arr.address === "" ? null : arr.address,
					page: arr.page,
					pageSize: arr.pageSize,
					// priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
					classrank: arr.classrank,
					id: id
				},
				
			});
	
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostBySoldFilterByUser: async (id, arr) => {
		
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/filterSoldUser/user/${id}`, {
				params: {
					min_price: arr.min_price,
					max_price: arr.max_price,
					min_area: arr.min_area,
					max_area: arr.max_area,
					dirs: arr.dirs,
					address: arr.address === "" ? null : arr.address,
					page: arr.page,
					pageSize: arr.pageSize,
					// priority: arr.priority,
					searchConditions: arr.searchConditions,
					sold_status: arr.sold_status,
					priority_status: arr.priority_status,
					classrank: arr.classrank,
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
	getPostByUserHT: async (id) => {
		try {
			const response = await axios.get(
				`${apiURL.baseURL}/posts/userht/${id}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostStatusByUser: async (id) => {
		try {
			const response = await axios.get(
				`${apiURL.baseURL}/posts/user-status/${id}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	
	getPostStatus2ByUser: async (id) => {
		try {
			const response = await axios.get(
				`${apiURL.baseURL}/posts/user-status2/${id}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostStatus3ByUser: async (id) => {
		try {
			const response = await axios.get(
				`${apiURL.baseURL}/posts/user-status3/${id}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getPostSoldByUser: async (id) => {
		try {
			const response = await axios.get(
				`${apiURL.baseURL}/posts/user-sold/${id}`
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
