import React, { useState } from 'react';
import "./UsersProfileStyles.css";

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('personalInfo');

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleLogout = () => {
        alert('You have been logged out.');
        // Redirect to login page or perform logout logic here
        window.location.href = 'login.html'; // Example redirect to login page
    };

    return (
        <div className="dashboard-container">
            <h2>Patient Dashboard</h2>
            <nav className="dashboard-nav">
                <button className="nav-button" onClick={() => handleSectionChange('personalInfo')}>
                    Personal Info
                </button>
                <button className="nav-button" onClick={() => handleSectionChange('myTests')}>
                    My Tests
                </button>
                <button className="nav-button" onClick={() => handleSectionChange('myReferrals')}>
                    My Referrals
                </button>
                <button className="nav-button" onClick={() => handleSectionChange('myRequests')}>
                    My Requests
                </button>
                <button className="nav-button logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <div className="dashboard-content">
                {activeSection === 'personalInfo' && (
                    <div className="section">
                        <h3>Personal Info</h3>
                        <p>Name: John Doe</p>
                        <p>Email: johndoe@example.com</p>
                        <p>Phone: +123456789</p>
                    </div>
                )}
                {activeSection === 'myTests' && (
                    <div className="section">
                        <h3>My Tests</h3>
                        <p>No test results available yet.</p>
                    </div>
                )}
                {activeSection === 'myReferrals' && (
                    <div className="section">
                        <h3>My Referrals</h3>
                        <p>No referrals at the moment.</p>
                    </div>
                )}
                {activeSection === 'myRequests' && (
                    <div className="section">
                        <h3>My Requests</h3>
                        <p>No requests have been submitted.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
