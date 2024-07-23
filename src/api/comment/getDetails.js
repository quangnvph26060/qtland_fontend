import apiURL from "../constants";

const getCommentDetailsAPI = async (postId) => {
    try {
        const response = await axios.get(
            `${apiURL.baseURL}/comments/${postId}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default getCommentDetailsAPI;
