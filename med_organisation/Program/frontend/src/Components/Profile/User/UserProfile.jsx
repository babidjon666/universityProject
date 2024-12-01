import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile } from './UserProfileService.js';
import { Button, Avatar, Menu, List, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Patient } from './Patient.jsx';
import { Passport } from './Passport.jsx';

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
        documentNumber: '',
        serie: '',
        sex: false,
        placeOfBirthday: '',
        codeOfState: '',
        nationality: '',
        issuingAuthority: '',
        placeOfResidence: '',
        dateOfBirth: null,
        dateOfIssue: null,
        dateOfExpiry: null,
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

    const { id } = useParams();
    const navigate = useNavigate();

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

            setPassport({
                documentNumber: profileData.profile.passport.documentNumber,
                serie: profileData.profile.passport.serie,
                sex: profileData.profile.passport.sex,
                placeOfBirthday: profileData.profile.passport.placeOfBirthday,
                codeOfState: profileData.profile.passport.codeOfState,
                nationality: profileData.profile.passport.nationality,
                issuingAuthority: profileData.profile.passport.issuingAuthority,
                placeOfResidence: profileData.profile.passport.placeOfResidence,
                dateOfBirth: profileData.profile.passport.dateOfBirth,
                dateOfIssue: profileData.profile.passport.dateOfIssue,
                dateOfExpiry: profileData.profile.passport.dateOfExpiry,
            });

        } catch (error) {
            console.error('Ошибка при получении профиля:', error);
        }
    };

    // Функция для навигации
    const handleSectionChange = (section) => {
        setActiveSection(section);
        console.log(profile);
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
                        <Passport passport={passport} profile={profile} fetchProfile={fetchProfile} />
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
                        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                            <Button 
                                type="primary" 
                                size="large" 
                                icon={<PlusOutlined />} 
                                style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            >
                                Create request
                            </Button>
                        </div>
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