import React, { useState, useEffect } from 'react';
import { getRequests, createRequest } from './UserProfileService';
import { Button, Avatar, List, Modal, Tag, Form, Input, Select, message, DatePicker} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const Requests = ({id}) => {
    const [requests, setRequests] = useState([]);  
    const [isModalVisible, setIsModalVisible] = useState(false);  
    const [form] = Form.useForm();  

    useEffect(() => {
        fetchRequests(id);  
    }, [id]);

    const fetchRequests = async (id) => {
        try {
            const response = await getRequests(id);
            const requestsData = response.data.$values; 
            console.log(requestsData);
            setRequests(requestsData);  
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async (values) => {
        const { description, date, time } = values;
        try {
            const newRequest = await createRequest(id, description, date, time);
            console.log('Request created:', newRequest);

            fetchRequests(id);
            setIsModalVisible(false);
            message.success("Request Created"); 
        } catch (error) {
            console.error('Error creating request:', error);
            message.error("Error"); 
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return 'orange'; // В ожидании
            case 1:
                return 'green'; // Принята
            case 2:
                return 'red'; // Отменена
            default:
                return 'default';
        }
    };
    
    return(
        <div className="section">
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <Button 
                type="primary" 
                size="large" 
                icon={<PlusOutlined />} 
                style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                onClick={showModal} 
            >
                Create request
            </Button>
        </div>
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
                        <div style={{textAlign: 'left'}}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Request №{index + 1}: {item.descriptionOfGoal}
                            </div>
                            <div style={{ fontSize: '14px', color: '#777' }}>
                                <p><strong>Appointment date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                                <p><strong>Appointment time:</strong> {item.time}</p>
                            </div>
                        </div>
                    </div>
                    <Tag color={getStatusColor(item.requestStatus)} style={{ fontSize: '16px', padding: '10px 20px' }}>
                        {item.requestStatus === 0 ? 'In Waiting' : item.requestStatus === 1 ? 'Accepted' : 'Cancelled'}
                    </Tag>
                </List.Item>
            )}
        />
        <Modal
                title="Create Request"
                visible={isModalVisible}  
                onCancel={handleCancel}  
                footer={null}  
                maskClosable={true}  
                centered  
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Goal description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter request description" />
                    </Form.Item>
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please input the date!' }]}
                    >
                        <DatePicker style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Time"
                        name="time"
                        rules={[{ required: true, message: 'Select time' }]}
                    >
                        <Select style={{ width: '250px' }}>
                            <Select.Option value="10:00 PM">10:00 PM</Select.Option>
                            <Select.Option value="11:00 PM">11:00 PM</Select.Option>
                            <Select.Option value="12:00 PM">12:00 PM</Select.Option>
                            <Select.Option value="13:00 PM">13:00 PM</Select.Option>
                            <Select.Option value="14:00 PM">14:00 PM</Select.Option>
                            <Select.Option value="15:00 PM">15:00 PM</Select.Option>
                            <Select.Option value="16:00 PM">16:00 PM</Select.Option>
                            <Select.Option value="17:00 PM">17:00 PM</Select.Option>
                            <Select.Option value="18:00 PM">18:00 PM</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
    </div> 
    );
};