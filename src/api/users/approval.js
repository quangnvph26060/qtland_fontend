import apiURL from "../constants";

const approvaluserAPI = async (id, user) => {
	try {
		const response = await axios.post(`${apiURL.baseURL}/users/approval/update/${id}`, user );
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default approvaluserAPI;