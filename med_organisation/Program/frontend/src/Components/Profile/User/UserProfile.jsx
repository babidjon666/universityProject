import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile } from './UserProfileService.js';
import { Button, DatePicker, Form, Input, Avatar, Menu, List, Modal } from 'antd';
import { Patient } from './Patient.jsx';

const data = [
    {
        title: 'Request 1',
    },
    {
        title: 'Request 2',
    },
    {
        title: 'Request 3',
    },
    {
        title: 'Request 4',
    },
];

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

    const fetchProfile = async () => {
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
            console.error('Ошибка при получении профиля:', error);
        }
    };

    // Функция для навигации
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    // Функция для выхода из профиля с подтверждением через Modal
    const handleLogout = () => {
        Modal.confirm({
            title: 'Exit',
            content: 'Are you sure you want to leave the page?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                navigate(`/login`, { replace: true });
            },
            onCancel: () => {
                handleSectionChange("personalInfo");
            },
        });
    };

    // Функция для отмены редактирования паспорта
    const handleCancelEditingPassport = () => {
        setIsEditingPassport(false);
    };

    return (
        <div className="dashboard-container">
            <div className="profile-header">
                <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${id}`}
                    size={64}
                    style={{
                        marginRight: '16px',
                        border: '2px solid #f0f0f0',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}
                />
                <h2>My Profile</h2>
            </div>

            <Menu
                onClick={({ key }) => handleSectionChange(key)}
                selectedKeys={[activeSection]}
                mode="horizontal"
                style={{ marginBottom: '20px' }}
            >
                <Menu.Item key="personalInfo">Personal Info</Menu.Item>
                <Menu.Item key="myTests">My Tests</Menu.Item>
                <Menu.Item key="myReferrals">My Referrals</Menu.Item>
                <Menu.Item key="myRequests">My Requests</Menu.Item>
                <Menu.Item key="logout" onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>

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
                        <List
                            pagination={{
                                position: 'bottom',
                                align: 'center',
                            }}
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};