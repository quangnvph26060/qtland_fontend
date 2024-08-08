import apiURL from "../constants";

const createImageAPI = {
	reportImage: async (formData) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/uploadMultiplereport`,
				formData
			);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
	updateReportImage: async (formData) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/updateMultiplereport`,
				formData
			);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
	
};

export default createImageAPI;
