import apiURL from "../constants";

const createUserAPI = async (user) => {
	try {
		const response = await axios.post(`${apiURL.baseURL}/users/`, user);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default createUserAPI;
