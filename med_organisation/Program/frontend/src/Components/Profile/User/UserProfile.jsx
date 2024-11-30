import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProfile } from "./UserProfileService.js";
import {
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Select
} from 'antd';

import { Patient } from "./Patient.jsx"

export const UsersProfile = () => {
    const [activeSection, setActiveSection] = useState('personalInfo');
    const [profile, setProfile] = useState(null);

    const [passport, setPassport] = useState({
        passportNumber: '',
        issuedBy: '',
        issueDate: '',
        expirationDate: ''
    });

    const [patient, setPatient] = useState({
        documentNumber: '',
        serie: '',
        iNN: '',
        patentTerritory: '',
        issuedBy: '',
        nationality: '', 
        dateOfIssue: null 
    });
    
    const [isEditingPassport, setIsEditingPassport] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 6 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
    };

    useEffect(() => { 
        fetchProfile();
    }, [id]);

    const fetchProfile = async () => { // функция для получения профиля
        try {
            const profileData = await getProfile(id);
            setProfile(profileData);
            
            setPatient({
                documentNumber: profileData.profile.patient.documentNumber,
                serie: profileData.profile.patient.serie,
                iNN: profileData.profile.patient.inn,
                patentTerritory: profileData.profile.patient.patentTerritory,
                issuedBy: profileData.profile.patient.issuedBy,
                nationality: profileData.profile.patient.nationality,
                dateOfIssue: profileData.profile.patient.dateOfIssue,
            });
            

        } catch (error) {
            console.error("Ошибка при получении профиля:", error);
        }
    };
    // Функция для навигации
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    // Функция, чтобы выйти и не вернуться назад
    const handleLogout = () => {
        navigate(`/login`, { replace: true });
    };

    // Функция для отмены редактирования паспорта
    const handleCancelEditingPassport = () => {
        setIsEditingPassport(false); 
    };

    return (
        <div className="dashboard-container">
            <h2>My Profile</h2>
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
                {activeSection === 'personalInfo' && profile && (
                    <div className="section-container">
                        <div className="personal-info">
                            <h3 className="personal-info-header">Personal Info</h3>
                            <div className="personal-info-content">
                                <p>
                                    <span className="personal-info-label">Name:</span> {profile.name}
                                </p>
                                <p>
                                    <span className="personal-info-label">Surname:</span> {profile.surname}
                                </p>
                                <p>
                                    <span className="personal-info-label">Login:</span> {profile.login}
                                </p>
                            </div>
                        </div>
                        <Patient patient={patient} profile={profile} fetchProfile={fetchProfile} />
                        <div className="passport-info">
                            <h4>Passport</h4>
                            {isEditingPassport ? (
                                <Form
                                    {...formItemLayout}
                                    form={form}
                                    style={{ maxWidth: 600 }}
                                    initialValues={{
                                        passportNumber: passport.passportNumber,
                                        issuedBy: passport.issuedBy,
                                        issueDate: passport.issueDate,
                                        expirationDate: passport.expirationDate,
                                    }}
                                >
                                    <Form.Item
                                        label="Passport Number"
                                        name="passportNumber"
                                        rules={[{ required: true, message: 'Please input passport number!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Issued By"
                                        name="issuedBy"
                                        rules={[{ required: true, message: 'Please input the issuer!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Issue Date"
                                        name="issueDate"
                                        rules={[{ required: true, message: 'Please input the issue date!' }]}
                                    >
                                        <DatePicker />
                                    </Form.Item>

                                    <Form.Item
                                        label="Expiration Date"
                                        name="expirationDate"
                                        rules={[{ required: true, message: 'Please input expiration date!' }]}
                                    >
                                        <DatePicker />
                                    </Form.Item>

                                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                                            Save
                                        </Button>
                                        <Button type="default" onClick={handleCancelEditingPassport}>
                                            Cancel
                                        </Button>
                                    </Form.Item>
                                </Form>
                            ) : (
                                <div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p>Passport Number: {passport.passportNumber}</p>
                                        <p>Issued By: {passport.issuedBy}</p>
                                        <p>Issue Date: {passport.issueDate}</p>
                                        <p>Expiration Date: {passport.expirationDate}</p>
                                    </div>
                                    <button type="button" onClick={() => setIsEditingPassport(true)}>
                                        Edit Passport Info
                                    </button>
                                </div>
                            )}
                        </div>
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