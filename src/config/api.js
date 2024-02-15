
import axios from 'axios';
const DEPLOYED='http://ecombackend.ap-south-1.elasticbeanstalk.com'
// const LOCALHOST='https://ecombackend-dgdu.onrender.com'
// const LOCALHOST='https://bb7c-2401-4900-1a5d-be2d-65a6-59a0-2605-beb4.ngrok-free.app'

const LOCALHOST='http://3.7.55.20:3002'

export const API_BASE_URL = LOCALHOST;  

const api = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem('jwt');

api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
