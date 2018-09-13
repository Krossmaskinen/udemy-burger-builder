import axios from 'axios';

const axiosInstance = axios.create({
    baseUrl: 'https://react-my-burger-d7777.firebaseio.com/'
});

export default axiosInstance;