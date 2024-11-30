import axios from "axios";
import dayjs from 'dayjs';

// функция для получения пользователя
export const getProfile = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5288/api/Profile/GetProfile?userId=${userId}`);
        return response.data; 
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};

// функция для редактирования патента
export const editPatient = async (oldPatientId, documentNumber, serie, iNN, patentTerritory, issuedBy, nationality, dateOfIssue) => {
    try {
        const response = await axios.post("http://localhost:5288/api/Profile/EditPatient", {
            oldPatientId: oldPatientId,
            documentNumber: documentNumber,
            serie: serie,
            iNN: iNN,
            patentTerritory: patentTerritory,
            issuedBy: issuedBy,
            nationality: nationality,
            dateOfIssue: dateOfIssue,
        });
        return response.data; 
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};

// функция для форматирование национальности 
export const getNationalityName = (nationality) => {
    const nationalities = [
        "Azerbaijan",
        "Tajikistan",
        "Uzbekistan",
        "Moldova",
        "Ukraine",
        "Kyrgyzstan",
        "Kazakhstan",
        "Armenia",
        "Belarus"
    ];
    return nationalities[nationality] || "Unknown";
};

// функция для форматирования даты
export const formatDate = (date) => {
        return date ? dayjs(date).format("DD/MM/YYYY") : "Not specified";
};
