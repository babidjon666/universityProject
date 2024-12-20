import axios from "axios";

// функция для получения всех заявок, которые в ожидании
export const getAllWaitingRequests = async () => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }
        
        const response = await axios.get(`http://localhost:5288/api/Request/GetAllWaitingRequests`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data; 
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};

// функция для получения всех свободных докторов
export const getFreeDoctors = async (requestId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get(`http://localhost:5288/api/Request/GetFreeDoctors?requestId=${requestId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data; 
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};

// функция для установки доктора
export const setDoctorSerivce = async (doctorId, requestId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post("http://localhost:5288/api/Request/SetDoctor", {
            doctorId: doctorId,
            requestId: requestId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
    );
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для отмены заяявки
export const cancelRequest = async (requestId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.put(`http://localhost:5288/api/Request/CancelRequest?requestId=${requestId}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для получения настроек
export const getSettings = async () => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get(`http://localhost:5288/api/Settings/GetAllSettings`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для удаления настроек
export const deleteSetting = async (settingId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.delete(`http://localhost:5288/api/Settings/DeleteSettings?settingId=${settingId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для добавления настроек
export const createSetting = async (deadlines, terms) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post("http://localhost:5288/api/Settings/CreateSettings", {
            deadlines: deadlines,
            terms: terms,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
    );
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для получения документов пользователя
export const getDocuments = async (userId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get(`http://localhost:5288/api/Profile/GetProfile?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data; 
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};