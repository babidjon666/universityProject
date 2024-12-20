import axios from "axios";
import dayjs from 'dayjs';

// функция для получения пользователя
export const getProfile = async (userId) => {
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

// функция для редактирования патента
export const editPatient = async (oldPatientId, documentNumber, serie, iNN, patentTerritory, issuedBy, nationality, dateOfIssue) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post("http://localhost:5288/api/Profile/EditPatient", {
            oldPatientId: oldPatientId,
            documentNumber: documentNumber,
            serie: serie,
            iNN: iNN,
            patentTerritory: patentTerritory,
            issuedBy: issuedBy,
            nationality: nationality,
            dateOfIssue: dateOfIssue,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для редактирования пасспорта
export const editPassport = async (oldPassportId, documentNumber, serie, sex, placeOfBirthday, codeOfState, nationality, issuingAuthority, placeOfResidence, dateOfBirth, dateOfIssue, dateOfExpiry) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post("http://localhost:5288/api/Profile/EditPassport", {
            oldPassportId: oldPassportId,
            documentNumber: documentNumber,
            serie: serie,
            sex: sex,
            placeOfBirthday: placeOfBirthday,
            codeOfState: codeOfState,
            nationality: nationality,
            issuingAuthority: issuingAuthority,
            placeOfResidence: placeOfResidence,
            dateOfBirth: dateOfBirth,
            dateOfIssue: dateOfIssue,
            dateOfExpiry: dateOfExpiry,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Passport error:", error);
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

// функция для получения заявок
export const getRequests = async (userId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get(`http://localhost:5288/api/Request/GetUsersRequest?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response; 
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};

// функция для редактирования патента
export const createRequest = async (userId, descriptionOfGoal, date, time) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post("http://localhost:5288/api/Request/CreateRequest", {
            userId: userId,
            descriptionOfGoal: descriptionOfGoal,
            date: date,
            time: time,
            requestStatus: 0
        },
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Patient error:", error);
        throw error; 
    }
};

// функция для получения направлений для пользователя

export const getReferrals = async (userId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }
        
        const response = await axios.get(`http://localhost:5288/api/Test/GetReferralForTesting?userId=${userId}`,
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
        console.error("Login error:", error);
        throw error; 
    }
};

// функция для получения анализов
export const getTests = async (userId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get(`http://localhost:5288/api/Test/GetUsersTests?userId=${userId}`,
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

// функция для получения справок
export const getCertificates = async (userId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get(`http://localhost:5288/api/Certificate/GetUsersCertificate?userId=${userId}`,
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

// Функция для скачивания справки
export const downloadCertificate = async (certificateId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get(
            `http://localhost:5288/api/Certificate/DownloadCertificate?certificateId=${certificateId}`,
            {
                responseType: 'blob', 
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            },
 
            );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Certificate_${certificateId}.pdf`); 
        document.body.appendChild(link);
        link.click();
        link.remove(); 
    } catch (error) {
        console.error("Error downloading certificate:", error);
        throw error;
    }
};