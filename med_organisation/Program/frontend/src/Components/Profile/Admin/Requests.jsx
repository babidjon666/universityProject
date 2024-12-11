import React, { useState, useEffect } from 'react';
import { Button, Avatar, List, Modal, Select, message } from 'antd';
import { getAllWaitingRequests, getFreeDoctors, setDoctorSerivce, cancelRequest } from './AdminProfileService.js';
import { Patient } from "../User/Patient.jsx"

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    // Fetch all requests
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

    // Fetch available doctors for the selected request
    const fetchDoctors = async (requestId) => {
        try {
            const response = await getFreeDoctors(requestId);
            const doctorsData = response.$values;
            setDoctors(doctorsData);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            message.error('Failed to load doctors.');
        }
    };

    // Handle opening request modal
    const handleOpenRequest = async (request) => {
        setSelectedRequest(request);
        fetchDoctors(request.id);
        setIsModalVisible(true);
    };

    // Close the modal
    const handleCancelModal = () => {
        setIsModalVisible(false);
        setSelectedDoctor(null);
    };

    // Accept the request
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

    // Cancel the request
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

    return (
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
                                    <Button
                                        type="primary"
                                        style={{ alignSelf: 'center' }}
                                        onClick={() => console.log(123)}
                                    >
                                        Check Documents
                                    </Button>
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

            {/* Modal for Request Details */}
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

export default Requests;