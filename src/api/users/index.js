import apiURL from "../constants";

const listUsersAPI = async () => {
    try {
        const response = await axios.get(`${apiURL.baseURL}/users`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default listUsersAPI;
