import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile, getRequests, createRequest, getReferrals} from './UserProfileService.js';
import { Button, Avatar, Menu, List, Modal, Tag, Form, Input, Select, message, DatePicker} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Patient } from './Patient.jsx';
import { Passport } from './Passport.jsx';
export const UsersProfile = () => {
    const [activeSection, setActiveSection] = useState('personalInfo');
    const [profile, setProfile] = useState(null);
    const [requests, setRequests] = useState([]);  // Состояние для заявок
    const [referrals, setReferrals] = useState([]);  // Состояние для направлений
    const [isModalVisible, setIsModalVisible] = useState(false);  // Состояние для отображения модалки
    const [form] = Form.useForm();  // Для работы с формой

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
        fetchRequests(id);  // Получаем заявки при монтировании компонента
        fetchReferrals(id);
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

    // Получение заявок
    const fetchRequests = async (id) => {
        try {
            const response = await getRequests(id);
            const requestsData = response.data.$values; // Получаем массив заявок
            setRequests(requestsData);  // Сохраняем в состоянии
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    // Получение заявок
    const fetchReferrals = async (id) => {
        try {
            const response = await getReferrals(id);
            const requestsData = response.$values; 
            setReferrals(requestsData);  // Сохраняем в состоянии
        } catch (error) {
            console.error("Error fetching referrals:", error);
        }
    };

    // Функция для навигации
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    // Функция для отображения модального окна с формой
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Функция для закрытия модального окна
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Функция для отправки формы
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

    // Функция для получения статуса
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

    return (
        <div className="dashboard-container">
            <div className="profile-header">
                <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${id}`}
                    size={100} // Увеличиваем размер аватара
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

                {activeSection === 'myReferrals' && (
                    <div className="section">
                        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                        </div>
                        <List
                            pagination={{
                                position: 'bottom',
                                align: 'center',
                                pageSize: 3,
                            }}
                            dataSource={referrals}  // Используем полученные направления
                            renderItem={(item, index) => (
                                <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <div style={{textAlign: 'left'}}>
                                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                Referral №{index + 1}: {item.descriptionOfGoal}
                                            </div>
                                            <div style={{ fontSize: '14px', color: '#777' }}>
                                                <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                                                <p><strong>Test Type:</strong>  {item.testType === 0 ? 'ClinicalBloodTest' : item.testType === 1 ? 'ClinicalUrineTests' : item.testType === 2 ? 'BloodTestForHIV' : item.testType === 3 ? 'BloodTestForSyphilis' : 'UrineTestForDrugs'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </List.Item>
                            )}
                        />
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
                                onClick={showModal}  // Открыть модалку при клике
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
                            dataSource={requests}  // Используем полученные заявки
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
                    </div>
                )}
            </div>
            <Modal
                title="Create Request"
                visible={isModalVisible}  // Управляем видимостью модалки
                onCancel={handleCancel}  // Закрытие модалки
                footer={null}  // Отключаем стандартные кнопки
                maskClosable={true}  // Закрытие по клику на фон
                centered  // Центрируем окно
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