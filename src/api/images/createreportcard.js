import apiURL from "../constants";

const createImageCardAPI = {
	reportImage: async (formData) => {
		try {
			const response = await axios.post(
				`${apiURL.baseURL}/updateMultiplecard`,
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
				`${apiURL.baseURL}/updateMultiplecard`,
				formData
			);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
	
};

export default createImageCardAPI;
