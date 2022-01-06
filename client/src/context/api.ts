import axios from 'axios';
import { GeneralObject } from '../shared/types';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    withCredentials: true
})

const api = {
    get: (endpoint: string) => axiosInstance.get(endpoint),
    create: (endpoint: string, data: GeneralObject) => axiosInstance.post(endpoint, data),
    update: (endpoint: string, data: GeneralObject) => axiosInstance.patch(endpoint, data),
    delete: (endpoint: string) => axiosInstance.delete(endpoint)
}

export default api;