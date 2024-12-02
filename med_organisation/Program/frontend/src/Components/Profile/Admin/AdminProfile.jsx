import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Avatar, Menu, List, Modal, Select, message } from 'antd';
import { getAllWaitingRequests, getFreeDoctors, setDoctorSerivce, cancelRequest } from './AdminProfileService.js';

export const AdminProfile = () => {
    const [activeSection, setActiveSection] = useState('settings');
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequests();
    }, []);

    // Получение заявок
    const fetchRequests = async () => {
        try {
            const response = await getAllWaitingRequests();
            const requestsData = response.$values;
            setRequests(requestsData);
        } catch (error) {
            console.error('Error fetching requests:', error);
            message.error('Failed to load requests.');
        }
    };

    const fetchDoctors = async (requestId) => {
        try {
            const response = await getFreeDoctors(requestId);
            const requestsData = response.$values;
            console.log(requestsData);
            setDoctors(requestsData);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            message.error('Failed to load doctors.');
        }
    };

    // Открытие модального окна и загрузка списка докторов
    const handleOpenRequest = async (request) => {
        setSelectedRequest(request);
        fetchDoctors(request.id)
        setIsModalVisible(true);
    };

    // Закрытие модального окна
    const handleCancelModal = () => {
        setIsModalVisible(false);
        setSelectedDoctor(null);
    };

    // Принятие заявки
    const handleAcceptRequest = async () => {
        if (!selectedDoctor) {
            message.warning('Please select a doctor.');
            return;
        }
        try {
            await setDoctorSerivce(selectedDoctor, selectedRequest.id);
            message.success('Request accepted.');
            fetchRequests();
            handleCancelModal();
        } catch (error) {
            console.error('Error accepting request:', error);
            message.error('Failed to accept request.');
        }
    };

    // Отмена заявки
    const handleCancelRequest = async () => {
        try {
            await cancelRequest(selectedRequest.id);
            message.success('Request cancelled.');
            fetchRequests();
            handleCancelModal();
        } catch (error) {
            console.error('Error cancelling request:', error);
            message.error('Failed to cancel request.');
        }
    };

    // Смена секции
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    // Выход из профиля
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
                    <div className="section-container">
                        {/* Контент для настроек */}
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
                            Dr {doctor.name} {doctor.surname}
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