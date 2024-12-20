import axios from "axios";

// функция для получения клиентов доктора
export const getClients = async (doctorId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get(`http://localhost:5288/api/Test/GetMyClients?doctorId=${doctorId}`,
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

export const createReferral = async (userId, testType, date) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }
        
        const response = await axios.post("http://localhost:5288/api/Test/CreateReferral", {
            userId: userId,
            testType: testType,
            date: date,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
        );
        return response.data; 
    } catch (error) {
        console.error("Referral error:", error);
        throw error; 
    }
};

export const createCertificate = async (dateTime, userId, doctorId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }
        
        const response = await axios.post("http://localhost:5288/api/Certificate/CreateCertificate", 
        {
            dateTime: dateTime,
            userId: userId,
            doctorId: doctorId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
        );
        return response.data; 
    } catch (error) {
        console.error("Referral error:", error);
        throw error; 
    }
};
