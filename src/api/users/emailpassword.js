import axios from 'axios';
import apiURL from "../constants";
import { message } from 'ant-design-vue';
const sendEmailPasswordAPI = async (emailData) => {
    try {
        const response = await axios.post(`${apiURL.baseURL}/send-email-password`, emailData);
        return response;
    } catch (error) {
        message.error(
            "Email chưa được đăng ký !."
          );
        throw error; // Đảm bảo ném lỗi để xử lý ở nơi gọi hàm
    }
};

export default sendEmailPasswordAPI;