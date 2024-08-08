import apiURL from "../constants";

const createReportAPI = async (post) => {
	try {
		const response = await axios.post(`${apiURL.baseURL}/report/`, post);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default createReportAPI;
