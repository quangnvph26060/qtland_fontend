import apiURL from "../constants";

const updateClientAPI = {
	update: async (id, client) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/client/${id}`,
				client
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	},
};

export default updateClientAPI;
