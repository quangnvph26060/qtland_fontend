import apiURL from "../constants";

const listCLientAPI = {
	getAllClient: async (params = {}) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/client`, {
				params: {
					page: params.page || 1,
					pageSize: params.pageSize || 10,
				}
			});
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getAllClientByUser: async (id, params = {}) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/client/user/${id}`, {
				params: {
					page: params.page || 1,
					pageSize: params.pageSize || 10,
				}
			});
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	deleteClientAPI : async (id) => {
		try {
			const response = await axios.delete(`${apiURL.baseURL}/client/${id}`);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
	exportAllClient: async () => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/client/export/client`, {
				responseType: 'blob' 
			  });
			  return response;
		} catch (error) {
			console.log(error);
		}
	},
	
};

export default listCLientAPI;
