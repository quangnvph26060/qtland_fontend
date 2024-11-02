import apiURL from "../constants";

const updateUserAPI = async (id, user) => {
	try {
		const response = await axios.post(`${apiURL.baseURL}/users/${id}`, user
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default updateUserAPI;
