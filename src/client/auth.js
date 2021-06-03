// Tasks API client
import axios from 'axios';
import apiConfig from '../config/config';

const apiPort = apiConfig.ApiPort;

export default {
    async login(user) {
        let res;
        try {
            res = await axios.post(`http://127.0.0.1:${apiPort}/api/auth/login`, user);
        } catch(err) {
            return err.response;
        }
        return res;
    },
    async refresh_token(token) {
        const res = await axios.get(`http://127.0.0.1:${apiPort}/api/auth/refresh-token`, token);
        return res;
    },
    async register(user) {
        const res = await axios.post(`http://127.0.0.1:${apiPort}/api/users`, user);
        return res;
    } 
}