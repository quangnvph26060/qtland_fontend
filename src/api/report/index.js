import apiURL from "../constants";

const listReportAPI = {
	getAllReport: async () => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/report`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getReportByUser: async (id) => {
		try {
			const response = await axios.get(
				`${apiURL.baseURL}/report/user/${id}`
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

export default listReportAPI;
