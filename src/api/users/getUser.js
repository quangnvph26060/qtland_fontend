import apiURL from "../constants";

const getUserAPI = {
	getById: async (id) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/users/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
	getByToken: async (token) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/user`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
	getNameById: async (id) => {
		try {
			const response = await axios.get(
				`${apiURL.baseURL}/users/${id}/name`
			);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
};

export default getUserAPI;
