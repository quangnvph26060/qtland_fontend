import apiURL from "../constants";

const updateUserAPI = async (id, data) => {
	try {
		const response = await axios.put(`${apiURL.baseURL}/users/${id}`, data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export default updateUserAPI;
