import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-4ec8f.firebaseio.com/'
});

export default instance;