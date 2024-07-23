import apiURL from "../constants";

const getImageDetailAPI = async (postId) => {
	try {
		const response = await axios.get(`${apiURL.baseURL}/images/${postId}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export default getImageDetailAPI;
