import apiURL from "../constants";

const updateReportAPI = {
	update: async (id, post) => {
		try {
			const response = await axios.put(
				`${apiURL.baseURL}/report/${id}`,
				post
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	},
};

export default updateReportAPI;
