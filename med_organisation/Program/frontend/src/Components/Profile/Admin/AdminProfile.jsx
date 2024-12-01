import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Avatar, Menu, List, Modal, Select, message } from 'antd';
import { getAllWaitingRequests } from './AdminProfileService.js';

export const AdminProfile = () => {
    const [activeSection, setActiveSection] = useState('settings');
    const [requests, setRequests] = useState([]); // Состояние для заявок
    const [selectedRequest, setSelectedRequest] = useState(null); // Для хранения текущей заявки
    const [isModalVisible, setIsModalVisible] = useState(false); // Состояние модального окна
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Состояние для выбранного доктора
    const [doctors, setDoctors] = useState([]); // Список докторов
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequests(); // Получение заявок при монтировании
        fetchDoctors(); // Получение списка докторов
    }, []);

    // Функция для получения заявок
    const fetchRequests = async () => {
        try {
            const response = await getAllWaitingRequests();
            const requestsData = response.$values; // Предполагаем, что структура данных такая же
            setRequests(requestsData);
        } catch (error) {
            console.error('Error fetching requests:', error);
            message.error('Failed to load requests.');
        }
    };

    // Функция для получения списка докторов
    const fetchDoctors = async () => {
        try {
            // Симуляция API вызова
            const response = [
                { id: 1, name: 'Dr. John Smith' },
                { id: 2, name: 'Dr. Jane Doe' },
                { id: 3, name: 'Dr. Alice Johnson' },
            ];
            setDoctors(response);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    // Функция для открытия модального окна
    const handleOpenRequest = (request) => {
        setSelectedRequest(request);
        setIsModalVisible(true);
    };

    // Функция для закрытия модального окна
    const handleCancelModal = () => {
        setIsModalVisible(false);
        setSelectedDoctor(null); // Сбросить выбор доктора
    };

    // Функция для принятия заявки
    const handleAcceptRequest = async () => {
        if (!selectedDoctor) {
            message.warning('Please select a doctor.');
            return;
        }
        try {
            message.success('Request accepted.');
            fetchRequests(); // Обновить список заявок
            handleCancelModal(); // Закрыть модалку
        } catch (error) {
            console.error('Error accepting request:', error);
            message.error('Failed to accept request.');
        }
    };

    // Функция для отмены заявки
    const handleCancelRequest = async () => {
        try {
            message.success('Request cancelled.');
            fetchRequests(); // Обновить список заявок
            handleCancelModal(); // Закрыть модалку
        } catch (error) {
            console.error('Error cancelling request:', error);
            message.error('Failed to cancel request.');
        }
    };

    // Функция для навигации между секциями
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    // Функция для выхода из профиля
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
                handleSectionChange('settings');
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
                    <div className="section-container">
                        {/* Дополнительный контент для настроек */}
                    </div>
                )}

                {activeSection === 'requests' && (
                    <div className="section">
                        <List
                            pagination={{
                                position: 'bottom',
                                align: 'center',
                                pageSize: 3,
                            }}
                            dataSource={requests}
                            renderItem={(item, index) => (
                                <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} size={80} style={{ marginRight: '20px' }} />
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                Request №{index + 1}: {item.descriptionOfGoal}
                                            </div>
                                            <div style={{ fontSize: '14px', color: '#777' }}>
                                                <p><strong>Appointment date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                                                <p><strong>Appointment time:</strong> {item.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type="primary"
                                        style={{ alignSelf: 'center' }}
                                        onClick={() => handleOpenRequest(item)}
                                    >
                                        Open
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </div>
                )}
            </div>

            {/* Модальное окно */}
            <Modal
                title={`Request №${selectedRequest?.id}`}
                visible={isModalVisible}
                onCancel={handleCancelModal}
                footer={null}
                centered
            >
                <p><strong>Goal:</strong> {selectedRequest?.descriptionOfGoal}</p>
                <p><strong>Date:</strong> {new Date(selectedRequest?.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedRequest?.time}</p>
                <Select
                    placeholder="Select a doctor"
                    style={{ width: '100%', marginBottom: '20px' }}
                    value={selectedDoctor}
                    onChange={(value) => setSelectedDoctor(value)}
                >
                    {doctors.map((doctor) => (
                        <Select.Option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </Select.Option>
                    ))}
                </Select>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handleCancelModal}>Exit</Button>
                    <Button onClick={handleCancelRequest}>Cancel Request</Button>
                    <Button
                        type="primary"
                        onClick={handleAcceptRequest}
                        disabled={!selectedDoctor}
                    >
                        Accept
                    </Button>
                </div>
            </Modal>
        </div>
    );
};