import { useState } from "react";
import axios from "axios";
import { message } from 'antd';

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

export const validateLogin = (login) => {
    // Проверка: логин должен быть не менее 6 символов
    if (login.length < 6) {
        message.warning("Логин должен быть не менее 6 символов");
        return false;
    }

    // Регулярное выражение: только латинские буквы и цифры
    const loginRegex = /^[a-zA-Z0-9]+$/;
    if (!loginRegex.test(login)) {
        message.warning("Логин должен содержать только латинские буквы и цифры без спецсимволов");
        return false;
    }

    // Проверка на кириллицу (опционально, можно включить в предыдущее правило)
    const hasCyrillic = /[а-яА-ЯЁё]/;
    if (hasCyrillic.test(login)) {
        message.warning("Логин не должен содержать кириллические символы");
        return false;
    }

    return true;
};

export const validatePassword = (password) => {
    // Проверка: пароль должен быть не менее 6 символов
    if (password.length < 6) {
        message.warning("Пароль должен быть не менее 6 символов");
        return false;
    }

    // Проверка на пробелы
    if (/\s/.test(password)) {
        message.warning("Пароль не должен содержать пробелы");
        return false;
    }

    // Регулярное выражение: хотя бы одна буква, одна цифра и один спецсимвол
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!passwordRegex.test(password)) {
        message.warning("Пароль должен содержать хотя бы одну букву, одну цифру и один специальный символ");
        return false;
    }

    return true;
};