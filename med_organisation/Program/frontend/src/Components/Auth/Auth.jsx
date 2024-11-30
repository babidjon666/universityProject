import React, { useState } from "react";
import { loginUser } from "./Auth";
import { useNavigate } from "react-router-dom";
import "./authstyles.css";

export const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Сброс ошибки перед запросом

        try {
            const result = await loginUser(login, password);
            console.log("Login successful:", result);

            // Перенаправление на страницу профиля
            navigate("/profile");
        } catch (error) {
            setError("Неправильный логин или пароль");
        }
    };

    return (
        <div>
            <div className="form-container" id="auth-container">
                {showLogin ? (
                    <form id="auth-form" onSubmit={handleLogin}>
                        <h2>Login</h2>
                        {error && <p className="error-message">{error}</p>}
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
                    <form id="registration-form">
                        <h2>Registration</h2>
                        {/* Добавьте логику для регистрации */}
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