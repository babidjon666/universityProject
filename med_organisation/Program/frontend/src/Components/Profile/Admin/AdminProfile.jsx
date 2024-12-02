import React, { useState, useEffect } from 'react';
import { Avatar, Menu, Modal, Button, List, Input, Form } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import Requests from './Requests.jsx';
import { getSettings, deleteSetting, createSetting } from './AdminProfileService.js';
import { PlusOutlined, ToolOutlined } from '@ant-design/icons';

export const AdminProfile = () => {
    const [activeSection, setActiveSection] = useState('settings');
    const { id } = useParams();
    const navigate = useNavigate();

    const [settings, setSettings] = useState([]);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); 
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false); // Новое состояние для модалки создания
    const [settingToDelete, setSettingToDelete] = useState(null); 

    const [form] = Form.useForm(); // Для работы с формой

    // Change active section
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await getSettings();
            const settingsData = response.$values;
            setSettings(settingsData);
        } catch (error) {
            console.error('Error fetching settingsData:', error);
        }
    };

    const handleDelete = async (settingId) => {
        try {
            await deleteSetting(settingId);
            setSettings(prevSettings => prevSettings.filter(setting => setting.id !== settingId));
            setIsDeleteModalVisible(false); 
        } catch (error) {
            console.error('Error deleting setting:', error);
        }
    };

    const handleCreateSetting = async (values) => {
        try {
            // Вызываем createSetting с переданными значениями
            const { deadlines, terms } = values;
            await createSetting(deadlines, terms); 
            fetchSettings(); // Обновляем настройки после создания
            setIsCreateModalVisible(false); // Закрываем модалку
        } catch (error) {
            console.error('Error creating setting:', error);
        }
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

    const showDeleteModal = (settingId) => {
        setSettingToDelete(settingId);
        setIsDeleteModalVisible(true); 
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false); 
    };

    const showCreateModal = () => {
        setIsCreateModalVisible(true); // Показываем модалку создания
    };

    const handleCancelCreate = () => {
        setIsCreateModalVisible(false); // Закрываем модалку
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
                    <div className="section">
                        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                            <Button 
                                type="primary" 
                                size="large" 
                                icon={<PlusOutlined />} 
                                style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                onClick={showCreateModal} // Открыть модалку для создания
                            >
                                Create setting
                            </Button>
                        </div>
                        <List
                            pagination={{
                                position: 'bottom',
                                align: 'center',
                                pageSize: 3,
                            }}
                            dataSource={settings}
                            renderItem={(item, index) => (
                                <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>  {/* Центрируем по вертикали */}
                                        <ToolOutlined 
                                            style={{ fontSize: '40px', color: '#1890ff', marginRight: '20px' }} 
                                        />
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                Setting №{index + 1}: 
                                            </div>
                                            <div style={{ fontSize: '14px', color: '#777' }}>
                                                <p><strong>DeadLines:</strong> {item.deadlines}</p>
                                                <p><strong>Terms:</strong> {item.terms}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => showDeleteModal(item.id)} // Show modal on delete button click
                                        style={{ alignSelf: 'center' }}
                                    >
                                        Delete
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </div>
                )}

                {activeSection === 'requests' && <Requests />}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Delete Setting"
                visible={isDeleteModalVisible}
                onOk={() => handleDelete(settingToDelete)} // Call the delete handler on confirmation
                onCancel={handleCancelDelete} // Close the modal on cancel
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you want to delete this setting?</p>
            </Modal>

            {/* Create Setting Modal */}
            <Modal
                title="Create New Setting"
                visible={isCreateModalVisible}
                onCancel={handleCancelCreate} 
                footer={null}
                width={500}
            >
                <Form
                    form={form}
                    onFinish={handleCreateSetting}
                    layout="vertical"
                >
                    <Form.Item
                        label="Deadlines"
                        name="deadlines"
                        rules={[{ required: true, message: 'Please input the deadlines!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Terms"
                        name="terms"
                        rules={[{ required: true, message: 'Please input the terms!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};