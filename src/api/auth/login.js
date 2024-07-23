import apiURL from "../constants";

const login = async (email, password) => {
	try {
		const response = await axios.post(`${apiURL.baseURL}/auth/login`, {
			email,
			password,
		});
		return response;
	} catch (error) {
		console.log("Thông tin đăng nhập không chính xác!");
	}
};

export default login;
