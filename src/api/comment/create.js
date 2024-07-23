import apiURL from "../constants";

const createCommentAPI = async (comment) => {
	try {
		const response = await axios.post(
			`${apiURL.baseURL}/comments/`,
			comment
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default createCommentAPI;
