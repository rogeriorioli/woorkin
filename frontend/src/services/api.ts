import axios from 'axios';

const api = axios.create({
  baseURL: 'http://68.183.132.250:3333'
});

export default api;
