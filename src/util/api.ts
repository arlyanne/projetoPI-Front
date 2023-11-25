import axios from 'axios';

console.log(localStorage.getItem('token'))

const api = axios.create({
 baseURL: 'http://localhost:8080',
 headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
 },
});

export default api;