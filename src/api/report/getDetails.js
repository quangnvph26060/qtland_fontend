import apiURL from "../constants";

const getReportAPI = {
	getById: async (id) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/report/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
};

export default getReportAPI;
