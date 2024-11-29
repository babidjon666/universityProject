import React, { useState } from "react";
import "./authstyles.css"; // Импорт файла CSS

export const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleShowRegistration = (e) => {
        e.preventDefault();
        setShowLogin(false);
    };

    const handleShowLogin = (e) => {
        e.preventDefault();
        setShowLogin(true);
    };

    return (
        <div>
            <div className="form-container" id="auth-container">
                {showLogin ? (
                    <form id="auth-form">
                        <h2>Login</h2>
                        <div className="form-group">
                            <label htmlFor="auth-email">Email</label>
                            <input
                                type="email"
                                id="auth-email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="auth-password">Password</label>
                            <input
                                type="password"
                                id="auth-password"
                                placeholder="Enter your password"
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
                        <div className="form-group">
                            <label htmlFor="reg-name">Name</label>
                            <input
                                type="text"
                                id="reg-name"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-email">Email</label>
                            <input
                                type="email"
                                id="reg-email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-password">Password</label>
                            <input
                                type="password"
                                id="reg-password"
                                placeholder="Enter your password"
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
