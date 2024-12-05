import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile } from './UserProfileService.js';
import { Avatar, Menu, Modal} from 'antd';

import { Terms } from './Terms.jsx';
import { Requests } from './Requests.jsx';
import { Refferals } from './Refferals.jsx';
import { PersonalInfo } from './PersonalInfo.jsx';
import { Tests } from './Tests.jsx';

export const UsersProfile = () => {
    const [activeSection, setActiveSection] = useState('personalInfo');
    const [profile, setProfile] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
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

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

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
                    size={100} 
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
                <Menu.Item key="terms">Terms</Menu.Item>
                <Menu.Item key="myTests">My Tests</Menu.Item>
                <Menu.Item key="myReferrals">My Referrals</Menu.Item>
                <Menu.Item key="myRequests">My Requests</Menu.Item>
                <Menu.Item key="logout" onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>

            <div className="dashboard-content">
                {activeSection === 'personalInfo' && profile && (
                    <PersonalInfo profile={profile} patient={patient} passport={passport} fetchProfile={fetchProfile}/>
                )}

                {activeSection === 'terms' && (
                    <Terms/>
                )}

                {activeSection === 'myTests' && (
                    <Tests id={id}/>
                )}
                {activeSection === 'myReferrals' && (
                    <Refferals id={id}/>
                )}

                {activeSection === 'myRequests' && (
                    <Requests id={id}/>
                )}
            </div>
        </div>
    );
};