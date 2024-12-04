import React, { useState, useEffect } from 'react';
import { Avatar, Menu, Modal, Button, List, Input, Form } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getClients } from './DoctorService';

export const DoctorProfile = () => {
    const [activeSection, setActiveSection] = useState('MyClients');
    const { id } = useParams();
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);

    // Change active section
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    useEffect(() => {
        fetchClients(id);
    }, []);

    const handleLogout = () => {
        Modal.confirm({
            title: 'Exit',
            content: 'Are you sure you want to leave the page?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                navigate(`/login`, { replace: true });
            },
        });
    };

    const fetchClients = async (doctorId) => {
        try {
            const response = await getClients(doctorId);
            const settingsData = response.$values;
            setClients(settingsData);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
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
                <h2>Doctor Profile</h2>
            </div>

            <Menu
                onClick={({ key }) => handleSectionChange(key)}
                selectedKeys={[activeSection]}
                mode="horizontal"
                style={{ marginBottom: '20px' }}
            >
                <Menu.Item key="MyClients">My Clients</Menu.Item>
                <Menu.Item key="logout" onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>

            <div className="dashboard-content">
                {activeSection === 'MyClients' && (
                    <div className="section">
                        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                        </div>
                        <List
                            pagination={{
                                position: 'bottom',
                                align: 'center',
                                pageSize: 4,
                            }}
                            dataSource={clients}
                            renderItem={(item, index) => (
                                <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>  {/* Центрируем по вертикали */}
                                    <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} size={80} style={{ marginRight: '20px' }} />
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                {item.name} {item.surname}
                                            </div>
                                            <div style={{ fontSize: '14px', color: '#777' }}>
                                            <Button
                                                type="primary"
                                                style={{ alignSelf: 'center' }}
                                            >
                                                Check Patient
                                            </Button>
                                            <Button
                                                type="primary"
                                                style={{ alignSelf: 'center' }}
                                            >
                                                Check Passport
                                            </Button>
                                            <Button
                                                type="primary"
                                                style={{ alignSelf: 'center' }}
                                            >
                                                Issue referral
                                            </Button>
                                            <Button
                                                type="primary"
                                                style={{ alignSelf: 'center' }}
                                            >
                                                Issue certificate
                                            </Button>
                                            </div>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                )}

            </div>
        </div>
    );
};