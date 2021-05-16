import axios from 'axios';

export default {
    async getTasks() {
        const res = await axios.get("http://127.0.0.1:8080/api/tasks");
        return res.data;
    },
    async getOneTask(id) {
        const res = await axios.get(`http://127.0.0.1:8080/api/tasks/${id}`);
        return res.data;
    },
    async createTask(task) {
        const res = await axios.post("http://127.0.0.1:8080/api/tasks", task);
        return res.data;
    },
    async deleteTask(id) {
        await axios.delete(`http://127.0.0.1:8080/api/tasks/${id}`);
    },
    async editTask(id, task) {
        const res = await axios.put(`http://127.0.0.1:8080/api/tasks/${id}`, task);
        return res.data;
    } 
}