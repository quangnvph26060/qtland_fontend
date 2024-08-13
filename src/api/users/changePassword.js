import apiURL from "../constants";

const changePasswordAPI = {
	changePassword: async (data) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/users/change-password`, data
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	},
	
};

export default changePasswordAPI;
