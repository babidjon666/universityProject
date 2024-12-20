import axios from "axios";

// функция для получения клиентов c направлениями
export const getClientsWithReferrals = async () => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get(`http://localhost:5288/api/Test/GetUsersWithReferrals`,
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

// функция для создания Clinical Blood Test
export const createClinicalBloodTest = async (userId, redBloobCells, colorIndex, erythrocyteSedimentation, hemoglobin, platelets, leukocytes, basophils, eosinophils, monocytes, lymphocytes) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post("http://localhost:5288/api/Test/CreateClinicalBloodTest", {
            userId: userId,
            redBloobCells: redBloobCells,
            colorIndex: colorIndex,
            erythrocyteSedimentation: erythrocyteSedimentation,
            hemoglobin: hemoglobin,
            platelets: platelets,
            leukocytes: leukocytes,
            basophils: basophils,
            eosinophils: eosinophils,
            monocytes: monocytes,
            lymphocytes: lymphocytes
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

// функция для создания Clinical Urine Test
export const createClinicalUrineTest = async (userId, redBloobCells, urobilinogen, leukocytes, bilirubin, protien, acidity, density, nitrites, glucose, color) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post("http://localhost:5288/api/Test/CreateClinicalUrineTest", {
            userId: userId,
            redBloobCells: redBloobCells,
            urobilinogen: urobilinogen,
            leukocytes: leukocytes,
            bilirubin: bilirubin,
            protien: protien,
            acidity: acidity,
            density: density,
            nitrites: nitrites,
            glucose: glucose,
            color: color
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

// функция для создания HIV Test
export const createHIVTest = async (userId, result) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post("http://localhost:5288/api/Test/CreateHIVTest", {
            userId: userId,
            result: result,
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

// функция для создания Syphilis Test
export const createBloodTestForSyphilis = async (userId, result) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        } 

        const response = await axios.post("http://localhost:5288/api/Test/CreateSyphilisTest", {
            userId: userId,
            result: result,
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

// функция для создания Urine Test ForDrugs 
export const createUrineTestForDrugs = async (userId, nicotinAndMetabolites, alcohol, psychoactiveSubstances, narcoticSubctances) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post("http://localhost:5288/api/Test/CreateDrugsTest", {
            userId: userId,
            nicotinAndMetabolites: nicotinAndMetabolites,
            alcohol: alcohol,
            psychoactiveSubstances: psychoactiveSubstances,
            narcoticSubctances: narcoticSubctances,
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