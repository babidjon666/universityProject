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

// функция для получения всех свободных докторов
export const getFreeDoctors = async (requestId) => {
    try {
        const response = await axios.get(`http://localhost:5288/api/Request/GetFreeDoctors?requestId=${requestId}`);
        return response.data; 
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};

// функция для установки доктора
export const setDoctorSerivce = async (doctorId, requestId) => {
    try {
        const response = await axios.post("http://localhost:5288/api/Request/SetDoctor", {
            doctorId: doctorId,
            requestId: requestId,
        });
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для отмены заяявки
export const cancelRequest = async (requestId) => {
    try {
        const response = await axios.put(`http://localhost:5288/api/Request/CancelRequest?requestId=${requestId}`);
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для получения настроек
export const getSettings = async () => {
    try {
        const response = await axios.get(`http://localhost:5288/api/Settings/GetAllSettings`);
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для удаления настроек
export const deleteSetting = async (settingId) => {
    try {
        const response = await axios.delete(`http://localhost:5288/api/Settings/DeleteSettings?settingId=${settingId}`);
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для добавления настроек
export const createSetting = async (deadlines, terms) => {
    try {
        const response = await axios.post("http://localhost:5288/api/Settings/CreateSettings", {
            deadlines: deadlines,
            terms: terms,
        });
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};