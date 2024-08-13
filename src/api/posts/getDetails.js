import { reactive } from "vue";
import apiURL from "../constants";

const getPostAPI = {
	getById: async (id) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
	getpostById: async (id) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/posts/postbyid/${id}`);
			return response;  
		} catch (error) {
			if(error.response.status === 404){
			
			}
			console.error('An error occurred:', error);
		}
	},
};

export default getPostAPI;
