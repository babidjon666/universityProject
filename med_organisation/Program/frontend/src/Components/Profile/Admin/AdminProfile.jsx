import React, { useState } from 'react';
import { Avatar, Menu, Modal} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import Requests from './Requests.jsx';
import { Setting } from './Setting.jsx';

export const AdminProfile = () => {
    const [activeSection, setActiveSection] = useState('settings');
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
                <h2>Admin Profile</h2>
            </div>

            <Menu
                onClick={({ key }) => handleSectionChange(key)}
                selectedKeys={[activeSection]}
                mode="horizontal"
                style={{ marginBottom: '20px' }}
            >
                <Menu.Item key="settings">Settings</Menu.Item>
                <Menu.Item key="requests">Requests</Menu.Item>
                <Menu.Item key="logout" onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>

            <div className="dashboard-content">
                {activeSection === 'settings' && (
                    <Setting/>
                )}
                {activeSection === 'requests' && <Requests />}
            </div>
        </div>
    );
};