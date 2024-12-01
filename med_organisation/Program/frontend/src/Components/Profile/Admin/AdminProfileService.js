import axios from "axios";
import dayjs from 'dayjs';

// функция для получения всех заявок, которые в ожидании
export const getAllWaitingRequests = async () => {
    try {
        const response = await axios.get(`http://localhost:5288/api/Request/GetAllWaitingRequests`);
        return response.data; 
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};