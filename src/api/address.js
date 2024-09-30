import axios from "axios";
import apiURL from "./constants";
// const addressAPI = {
// 	/**
// 	 * Hàm này sẽ trả về danh sách các tỉnh/thành phố
// 	 *
// 	 * CreatedBy: youngbachhh (24/03/2024)
// 	 */
// 	getProvinces: async () => {
// 		try {
// 			const response = await axios.get(
// 				"https://vapi.vnappmob.com/api/province/"
// 			);

// 			return response.data.results;
// 		} catch (error) {
// 			throw error;
// 		}
// 	},

// 	/**
// 	 * Hàm này sẽ trả về danh sách các quận/huyện dựa vào id của tỉnh/thành phố
// 	 *
// 	 * CreatedBy: youngbachhh (24/03/2024)
// 	 */
// 	getDistrictsByProvinceId: async (provinceId) => {
// 		try {
// 			const response = await axios.get(
// 				`https://vapi.vnappmob.com/api/province/district/${provinceId}`
// 			);

// 			return response.data.results;
// 		} catch (error) {
// 			throw error;
// 		}
// 	},

// 	//
// 	/**
// 	 * Hàm này sẽ trả về danh sách các phường/xã dựa vào id của quận/huyện
// 	 *
// 	 * CreatedBy: youngbachhh (24/03/2024)
// 	 */
// 	getWardsByDistrictId: async (districtId) => {
// 		try {
// 			const response = await axios.get(
// 				`https://vapi.vnappmob.com/api/province/ward/${districtId}`
// 			);

// 			return response.data.results;
// 		} catch (error) {
// 			throw error;
// 		}
// 	},
// };

const addressAPI = {
	/**
	 * Hàm này sẽ trả về danh sách các tỉnh/thành phố từ API Laravel
	 *
	 * CreatedBy: youngbachhh (24/03/2024)
	 */
	getProvinces: async () => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/cities`);
			// console.log(response.data);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	/**
	 * Hàm này sẽ trả về danh sách các quận/huyện dựa vào id của tỉnh/thành phố từ API Laravel
	 *
	 * CreatedBy: youngbachhh (24/03/2024)
	 */
	getDistrictsByProvinceId: async (provinceId) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/cities/${provinceId}/districts`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	/**
	 * Hàm này sẽ trả về danh sách các phường/xã dựa vào id của quận/huyện từ API Laravel
	 *
	 * CreatedBy: youngbachhh (24/03/2024)
	 */
	getWardsByDistrictId: async (districtId) => {
		try {
			const response = await axios.get(`${apiURL.baseURL}/districts/${districtId}/wards`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};


export default addressAPI;
