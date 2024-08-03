import apiURL from "../constants";

const listCLientAPI = {
	getAllClient: async () => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/client`);
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
