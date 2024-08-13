import axios from 'axios';
import apiURL from "../constants";

const sendEmailAPI = async (emailData) => {
    try {
        const response = await axios.post(`${apiURL.baseURL}/send-email`, emailData);
        return response;
    } catch (error) {
        console.log(error);
        throw error; // Đảm bảo ném lỗi để xử lý ở nơi gọi hàm
    }
};

export default sendEmailAPI;