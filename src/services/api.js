import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/applications';

const api = {
    getAllApplications: () => axios.get(API_BASE_URL),
    getApplicationByID: (id) => axios.get(`${API_BASE_URL}/${id}`),
    createApplication: (data) => axios.post(API_BASE_URL, data),
    updateApplication: (id, data) => axios.put(`${API_BASE_URL}/${id}`, data),
    deleteApplication: (id) => axios.delete(`${API_BASE_URL}/${id}`),
    searchByStatus: (status) => axios.get(`${API_BASE_URL}/search/status/${status}`),
    searchByPosition: (title) => axios.get(`${API_BASE_URL}/search/position`, {
        params: { title }
    }),
    searchByCompany: (name) => axios.get(`${API_BASE_URL}/search/company`, {
        params: { name }
    }),
}

export default api;