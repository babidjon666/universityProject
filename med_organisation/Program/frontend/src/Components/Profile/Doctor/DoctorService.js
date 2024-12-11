import axios from "axios";

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

export const createReferral = async (userId, testType, date) => {
    try {
        const response = await axios.post("http://localhost:5288/api/Test/CreateReferral", {
            userId: userId,
            testType: testType,
            date: date,
        });
        return response.data; 
    } catch (error) {
        console.error("Referral error:", error);
        throw error; 
    }
};

export const createCertificate = async (dateTime, userId, doctorId) => {
    try {
        const response = await axios.post("http://localhost:5288/api/Certificate/CreateCertificate", {
            dateTime: dateTime,
            userId: userId,
            doctorId: doctorId,
        });
        return response.data; 
    } catch (error) {
        console.error("Referral error:", error);
        throw error; 
    }
};
