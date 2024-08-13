import axios from 'axios';
import apiURL from "../constants";

const listUsersRoleAPI = async () => {
    try {
        const response = await axios.get(`${apiURL.baseURL}/users/user-role/role`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users by role:", error);
        throw error; 
    }
};

const listUsersAPI = async () => {
    try {
        const response = await axios.get(`${apiURL.baseURL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error; 
    }
};

export { listUsersRoleAPI, listUsersAPI };