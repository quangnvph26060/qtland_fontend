import apiURL from "../constants";

const deleteReportAPI = async (id) => {
	try {
		const response = await axios.delete(`${apiURL.baseURL}/report/${id}`);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default deleteReportAPI;
