import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProfile, editPatient } from "./UserProfileService.js"; // Обновить сервис для сохранения данных
import {
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Select
} from 'antd';
import dayjs from 'dayjs';

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
    const getNationalityName = (nationality) => {
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

    const formatDate = (date) => {
        return date ? dayjs(date).format("DD/MM/YYYY") : "Not specified";
    };

    const [isEditingPassport, setIsEditingPassport] = useState(false);
    const [isEditingPatient, setIsEditingPatient] = useState(false);

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

    const handleSectionChange = (section) => {
        setActiveSection(section);
        console.log(patient)
    };

    const handleLogout = () => {
        navigate(`/login`, { replace: true });
    };

    // Функция для отмены редактирования паспорта
    const handleCancelEditingPassport = () => {
        setIsEditingPassport(false); 
    };

    // Функция для отмены редактирования патента
    const handleCancelEditingPatient = () => {
        setIsEditingPatient(false); 
    };

    return (
        <div className="dashboard-container">
            <h2>Профиль клиента</h2>
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
                            <h3>Personal Info</h3>
                            <div style={{ textAlign: 'left' }}>
                                <p>Name: {profile.name}</p>
                                <p>Surname: {profile.surname}</p>
                                <p>Login: {profile.login}</p>
                            </div>
                        </div>
                        <div className="passport-info">
                            <h4>Patient</h4>
                            {isEditingPatient ? (
                                <Form
                                {...formItemLayout}
                                form={form}
                                style={{ maxWidth: 600, textAlign: 'left' }}
                                initialValues={{
                                    documentNumber: patient.documentNumber,
                                    serie: patient.serie,
                                    iNN: patient.iNN,
                                    patentTerritory: patient.patentTerritory,
                                    issuedBy: patient.issuedBy,
                                    nationality: patient.nationality,
                                    dateOfIssue: patient.dateOfIssue ? dayjs(patient.dateOfIssue) : null, // Преобразование даты
                                }}
                                onFinish={async (values) => {
                                    try {
                                        // Преобразование значений для отправки на сервер
                                        const payload = {
                                            oldPatientId: profile.profile.patient.id,
                                            documentNumber: values.documentNumber,
                                            serie: values.serie,
                                            iNN: values.iNN,
                                            patentTerritory: values.patentTerritory,
                                            issuedBy: values.issuedBy,
                                            nationality: parseInt(values.nationality, 10), // Преобразуем в число
                                            dateOfIssue: values.dateOfIssue.format("YYYY-MM-DD"), // Форматируем дату
                                        };
                            
                                        await editPatient(
                                            payload.oldPatientId,
                                            payload.documentNumber,
                                            payload.serie,
                                            payload.iNN,
                                            payload.patentTerritory,
                                            payload.issuedBy,
                                            payload.nationality,
                                            payload.dateOfIssue
                                        );
                            
                                        setIsEditingPatient(false); // Завершаем редактирование
                                        message.success("Patient Uploaded!")
                                        fetchProfile();
                                        
                                    } catch (error) {
                                        console.error("Error updating patient:", error);
                                        message.error("Patient Uploaded Error!")
                                    }
                                }}
                            >
                                <Form.Item label="Number" name="documentNumber" rules={[{ required: true, message: 'Enter document number' }]}>
                                    <Input style={{ width: '250px' }} />
                                </Form.Item>
                                <Form.Item label="Serie" name="serie" rules={[{ required: true, message: 'Enter series' }]}>
                                    <Input style={{ width: '250px' }} />
                                </Form.Item>
                                <Form.Item label="Inn" name="iNN" rules={[{ required: true, message: 'Enter INN' }]}>
                                    <Input style={{ width: '250px' }} />
                                </Form.Item>
                                <Form.Item label="Territory" name="patentTerritory" rules={[{ required: true, message: 'Enter patent territory' }]}>
                                    <Input style={{ width: '250px' }} />
                                </Form.Item>
                                <Form.Item label="IssuedBy" name="issuedBy" rules={[{ required: true, message: 'Enter issuer' }]}>
                                    <Input style={{ width: '250px' }} />
                                </Form.Item>
                                <Form.Item label="Nationality" name="nationality" rules={[{ required: true, message: 'Select nationality' }]}>
                                    <Select style={{ width: '250px' }}>
                                        <Select.Option value="0">Azerbaijan</Select.Option>
                                        <Select.Option value="1">Tajikistan</Select.Option>
                                        <Select.Option value="2">Uzbekistan</Select.Option>
                                        <Select.Option value="3">Moldova</Select.Option>
                                        <Select.Option value="4">Ukraine</Select.Option>
                                        <Select.Option value="5">Kyrgyzstan</Select.Option>
                                        <Select.Option value="6">Kazakhstan</Select.Option>
                                        <Select.Option value="7">Armenia</Select.Option>
                                        <Select.Option value="8">Belarus</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="DateOfIssue" name="dateOfIssue" rules={[{ required: true, message: 'Enter date of issue' }]}>
                                    <DatePicker style={{ width: '250px' }} />
                                </Form.Item>
                            
                                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                    <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                                        Save
                                    </Button>
                                    <Button type="default" onClick={handleCancelEditingPatient}>
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </Form>
                            ) : (
                                <div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p>Document Number: {patient.documentNumber}</p>
                                        <p>Serie: {patient.serie}</p>
                                        <p>INN: {patient.iNN}</p>
                                        <p>Patent Territory: {patient.patentTerritory}</p>
                                        <p>Issued By: {patient.issuedBy}</p>
                                        <p>Nationality: {getNationalityName(patient.nationality)}</p>
                                        <p>Date Of Issue: {formatDate(patient.dateOfIssue)}</p>
                                    </div>
                                    <button type="button" onClick={() => setIsEditingPatient(true)}>
                                            Edit Patient Info
                                    </button>
                                </div>
                            )}
                        </div>
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