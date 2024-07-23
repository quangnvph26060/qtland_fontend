import apiURL from "../constants";

const deletePostAPI = async (id) => {
	try {
		const response = await axios.delete(`${apiURL.baseURL}/posts/${id}`);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default deletePostAPI;
