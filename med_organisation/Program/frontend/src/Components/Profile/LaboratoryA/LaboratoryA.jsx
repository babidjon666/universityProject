import React, { useState } from 'react';
import { Avatar, Menu, Modal} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { ClientsWithRefs } from './ClientsWithRef'; 

export const LaboratoryA = () => {
    const [activeSection, setActiveSection] = useState('Clients');
    const { id } = useParams();
    const navigate = useNavigate();
    
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
                <h2>Laborant Profile</h2>
            </div>

            <Menu
                onClick={({ key }) => handleSectionChange(key)}
                selectedKeys={[activeSection]}
                mode="horizontal"
                style={{ marginBottom: '20px' }}
            >
                <Menu.Item key="Clients">Clients</Menu.Item>
                <Menu.Item key="logout" onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>

            <div className="dashboard-content">
                {activeSection === 'Clients' && (
                    <ClientsWithRefs/>
                )}
            </div>
        </div>
    );
};