// Tasks API client
import axios from 'axios';
import apiConfig from '../config/config';

const apiPort = apiConfig.ApiPort;

export default {
     async getTasks() {
        const res = await axios.get(`http://127.0.0.1:${apiPort}/api/tasks`, { 'Set-cookie': `JWT=${localStorage.getItem("AccessToken")}` });
        return res;
    },
    async getOneTask(id) {
        const res = await axios.get(`http://127.0.0.1:${apiPort}/api/tasks/${id}`);
        return res;
    },
    async createTask(task) {
        const res = await axios.post(`http://127.0.0.1:${apiPort}/api/tasks`, task);
        return res;
    },
    async deleteTask(id) {
        await axios.delete(`http://127.0.0.1:${apiPort}/api/tasks/${id}`);
    },
    async editTask(id, task) {
        const res = await axios.put(`http://127.0.0.1:${apiPort}/api/tasks/${id}`, task);
        return res;
    } 
}