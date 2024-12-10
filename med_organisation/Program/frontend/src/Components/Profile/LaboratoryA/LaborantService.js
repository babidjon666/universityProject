import axios from "axios";

// функция для получения клиентов c направлениями
export const getClientsWithReferrals = async () => {
    try {
        const response = await axios.get(`http://localhost:5288/api/Test/GetUsersWithReferrals`);
        return response.data; 
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};

// функция для создания Clinical Blood Test
export const createClinicalBloodTest = async (userId, redBloobCells, colorIndex, erythrocyteSedimentation, hemoglobin, platelets, leukocytes, basophils, eosinophils, monocytes, lymphocytes) => {
    try {
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
        });
        return response.data; 
    } catch (error) {
        console.error("Referral error:", error);
        throw error; 
    }
};

// функция для создания Clinical Urine Test
export const createClinicalUrineTest = async (userId, redBloobCells, urobilinogen, leukocytes, bilirubin, protien, acidity, density, nitrites, glucose, color) => {
    try {
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
        });
        return response.data; 
    } catch (error) {
        console.error("Referral error:", error);
        throw error; 
    }
};

// функция для создания HIV Test
export const createHIVTest = async (userId, result) => {
    try {
        const response = await axios.post("http://localhost:5288/api/Test/CreateHIVTest", {
            userId: userId,
            result: result,
        });
        return response.data; 
    } catch (error) {
        console.error("Referral error:", error);
        throw error; 
    }
};

// функция для создания Syphilis Test
export const createBloodTestForSyphilis = async (userId, result) => {
    try {
        const response = await axios.post("http://localhost:5288/api/Test/CreateSyphilisTest", {
            userId: userId,
            result: result,
        });
        return response.data; 
    } catch (error) {
        console.error("Referral error:", error);
        throw error; 
    }
};

// функция для создания Urine Test ForDrugs 
export const createUrineTestForDrugs = async (userId, nicotinAndMetabolites, alcohol, psychoactiveSubstances, narcoticSubctances) => {
    try {
        const response = await axios.post("http://localhost:5288/api/Test/CreateDrugsTest", {
            userId: userId,
            nicotinAndMetabolites: nicotinAndMetabolites,
            alcohol: alcohol,
            psychoactiveSubstances: psychoactiveSubstances,
            narcoticSubctances: narcoticSubctances,
        });
        return response.data; 
    } catch (error) {
        console.error("Referral error:", error);
        throw error; 
    }
};