import apiURL from "../constants";

const createPostAPI = async (post) => {
	try {
		const response = await axios.post(`${apiURL.baseURL}/posts/`, post);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default createPostAPI;
