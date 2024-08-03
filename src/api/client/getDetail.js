import apiURL from "../constants";

const getClientAPI = {
	getById: async (id) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/client/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
};

export default getClientAPI;
