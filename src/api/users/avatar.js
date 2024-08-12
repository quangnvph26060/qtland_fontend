import apiURL from "../constants";

const updateUserAPI = {
	updateUser: async (avater) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/posts/avater/update-avatar`, avater
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	},
};

export default updateUserAPI;
