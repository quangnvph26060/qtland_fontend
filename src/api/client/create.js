import apiURL from "../constants";

const createClientAPI = async (client) => {
	try {
		const response = await axios.post(`${apiURL.baseURL}/client/`, client);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default createClientAPI;