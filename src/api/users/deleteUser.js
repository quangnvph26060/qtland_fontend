import apiURL from "../constants";

const deleteUserAPI = async (id) => {
    try {
        const response = await axios.delete(`${apiURL.baseURL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default deleteUserAPI;
