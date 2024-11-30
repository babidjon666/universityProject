import axios from "axios";

export const getProfile = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5288/api/Profile/GetProfile?userId=${userId}`);
        return response.data; // Возвращаем данные ответа сервера
    } catch (error) {
        console.error("Login error:", error);
        throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
    }
};

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
        return response.data; // Возвращаем данные ответа сервера
    } catch (error) {
        console.error("Login error:", error);
        throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
    }
};

