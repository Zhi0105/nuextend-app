import axios from 'axios'
import Config from 'react-native-config';

let apiClient

if(Config.API_URL) {
    apiClient = axios.create({
        baseURL: Config.API_URL,
        headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS", // Allow specified methods
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept", // Allow specified headers
        },
    });
}

export { apiClient }