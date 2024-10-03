import axios from 'axios';
import apiURL from "../constants";

const listUsersRoleAPI = async (params = {}) => {
    try {
        const response = await axios.get(`${apiURL.baseURL}/users/user-role/role`, {
            params: {
                page: params.page || 1,
                pageSize: params.pageSize || 10,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users by role:", error);
        throw error; 
    }
};

const listUsersAPI = async (params = {}) => {
    try {
        const response = await axios.get(`${apiURL.baseURL}/users`, {
            params: {
                page: params.page || 1,
                pageSize: params.pageSize || 10,
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error; 
    }
};

const listUsersCTVAPI = async (params = {}) => {
    try {
        const response = await axios.get(`${apiURL.baseURL}/users/cong-tac-vien`, {
            params: {
                page: params.page || 1,
                pageSize: params.pageSize || 10,
                user_id: params.user_id
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all cong tac vien:", error);
        throw error; 
    }
};

export { listUsersRoleAPI, listUsersAPI, listUsersCTVAPI };