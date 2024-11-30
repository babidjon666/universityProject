import React, { useState } from "react";
import { loginUser, registerUser } from "./Auth";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import "./authstyles.css";

export const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const [error, setError] = useState("");
    const navigate = useNavigate(); // Хук для навигации

    const handleShowRegistration = (e) => {
        e.preventDefault();
        setShowLogin(false);
    };

    const handleShowLogin = (e) => {
        e.preventDefault();
        setShowLogin(true);
    };

    const validateLogin = (login) => {
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

    const validatePassword = (password) => {
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Сброс ошибки перед запросом

        try {
            const result = await loginUser(login, password);
            console.log("Login successful:", result);

            // Перенаправление на страницу профиля
            navigate("/profile");
            message.success("Успешный вход!");
        } catch (error) {
            message.success("Неправильный логин или пароль!");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // Сброс ошибки перед запросом

        if (!validateLogin(login) || !validatePassword(password)) {
            return;
        }

        // Проверка на совпадение паролей
        if (password !== repeatPassword) {
            message.warning("Пароли не совпадают")
            return;
        }

        try {
            const result = await registerUser(name, surname, login, password);
            console.log("Register successful:", result);

            // Показ формы логина
            setShowLogin(true)
            message.success("Пользователь зарегестрирован!");
        } catch (error) {
            message.error("Логин занят!")
        }
    };

    return (
        <div>
            <div className="form-container" id="auth-container">
                {showLogin ? (
                    <form id="auth-form" onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <div className="form-group">
                            <label htmlFor="auth-email">Login</label>
                            <input
                                type="text"
                                id="auth-login"
                                placeholder="Enter your login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="auth-password">Password</label>
                            <input
                                type="password"
                                id="auth-password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit">Login</button>
                        </div>
                        <div className="toggle-link">
                            <span>
                                Don’t have an account?{" "}
                                <a href="#" onClick={handleShowRegistration}>
                                    Register
                                </a>
                            </span>
                        </div>
                    </form>
                ) : (
                    <form id="registration-form" onSubmit={handleRegister}>
                        <h2>Registration</h2>
                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                id="auth-login"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Surname">Surname</label>
                            <input
                                type="text"
                                id="auth-login"
                                placeholder="Enter your surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Login">Login</label>
                            <input
                                type="text"
                                id="auth-login"
                                placeholder="Enter your password"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input
                                type="password"
                                id="auth-login"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="RepeatPassword">Repeat Password</label>
                            <input
                                type="password"
                                id="auth-login"
                                placeholder="Repeat your password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit">Register</button>
                        </div>
                        <div className="toggle-link">
                            <span>
                                Already have an account?{" "}
                                <a href="#" onClick={handleShowLogin}>
                                    Login
                                </a>
                            </span>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};