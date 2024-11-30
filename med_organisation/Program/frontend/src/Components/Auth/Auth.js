import { useState } from "react";
import axios from "axios";

export const useAuth = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleShowRegistration = (e) => {
        e.preventDefault();
        setShowLogin(false);
    };

    const handleShowLogin = (e) => {
        e.preventDefault();
        setShowLogin(true);
    };

    return {
        showLogin,
        handleShowRegistration,
        handleShowLogin,
    };
};

export const loginUser = async (login, password) => {
    try {
        const response = await axios.post("http://localhost:5288/api/Auth/Login", {
            login: login,
            password: password,
        });
        return response.config.data; // Возвращаем данные ответа сервера
    } catch (error) {
        console.error("Login error:", error);
        throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
    }
};

export const registerUser = async (userName, surname, login, password) => {
    try {
        const response = await axios.post("http://localhost:5288/api/Auth/Register", {
            name: userName,
            surname: surname,
            login: login,
            password: password,
        });
        return response.config.data; // Возвращаем данные ответа сервера
    }   catch (error) {
        console.error("Login error:", error);
        throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
    }
};