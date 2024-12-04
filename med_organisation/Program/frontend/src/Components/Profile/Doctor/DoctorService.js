import axios from "axios";
import dayjs from 'dayjs';

// функция для получения клиентов доктора
export const getClients = async (doctorId) => {
    try {
        const response = await axios.get(`http://localhost:5288/api/Test/GetMyClients?doctorId=${doctorId}`);
        return response.data; 
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};
