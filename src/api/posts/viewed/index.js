import apiURL from "../../constants";

const viewedPostsAPI = {
	recordView: async (postId, userId) => {
		try {
			const response = await axios.post(`${apiURL.baseURL}/post-views`, {
				post_id: postId,
				user_id: userId,
			});
			return response.data;
		} catch (error) {
			console.error("Error recording view", error);
		}
	},
	getViewCounts: async (postId) => {
		try {
			const response = await axios.get(
				`${apiURL.baseURL}/posts/${postId}/views`
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching view count", error);
		}
	},
};

export default viewedPostsAPI;
