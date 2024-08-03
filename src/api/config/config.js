import { ref, reactive, inject } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios';
import { useStore } from "vuex";
import { forEach } from 'lodash-es';
import apiURL  from "../constants.js";
export default function Config() {
    const API_BACK_END = apiURL.baseURL;
    const headers = {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const responseConfig = reactive({
        data: [],
      
    })
    const getconfig = async () => {
        try {
            const response = await axios.get(`${API_BACK_END}/config`, { headers });
                 
            if (response.status === 200) {
                responseConfig.data = response.data.data;
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const updateConfig = async (newConfigData) => {
        try {
            const response = await axios.post(`${API_BACK_END}/config`, newConfigData, { headers });
            if (response.status === 200) {
                responseConfig.data = response.data.data; 
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        getconfig,
        updateConfig,
        responseConfig
    };
}