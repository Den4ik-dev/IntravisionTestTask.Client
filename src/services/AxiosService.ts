import axios from 'axios';

const API_URL = 'https://localhost:7127';

const api = axios.create({ withCredentials: true, baseURL: API_URL });

export default api;
