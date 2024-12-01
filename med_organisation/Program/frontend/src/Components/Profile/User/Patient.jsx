import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Select, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { editPatient, getNationalityName, formatDate } from './UserProfileService.js';

export const Patient = ({ patient, profile, fetchProfile }) => {
    const [isEditingPatient, setIsEditingPatient] = useState(false);
    const [form] = Form.useForm();

    // Функция для начала редактирования
    const handleStartEditing = () => {
        setIsEditingPatient(true);
    };

    // Функция для отмены редактирования
    const handleCancelEditingPatient = () => {
        setIsEditingPatient(false);
    };

    // Функция для отправки формы
    const handleSubmit = async (values) => {
        try {
            const payload = {
                oldPatientId: profile.profile.patient.id,
                documentNumber: values.documentNumber,
                serie: values.serie,
                iNN: values.iNN,
                patentTerritory: values.patentTerritory,
                issuedBy: values.issuedBy,
                nationality: parseInt(values.nationality, 10),
                dateOfIssue: values.dateOfIssue.format('YYYY-MM-DD'),
            };

            await editPatient(
                payload.oldPatientId,
                payload.documentNumber,
                payload.serie,
                payload.iNN,
                payload.patentTerritory,
                payload.issuedBy,
                payload.nationality,
                payload.dateOfIssue
            );

            setIsEditingPatient(false);
            message.success('Patient Updated!');
            fetchProfile();
        } catch (error) {
            console.error('Error updating patient:', error);
            message.error('Failed to update patient!');
        }
    };

    return (
        <div className="passport-info">
            <h4 className="personal-info-header">Patient</h4>

            {/* Если редактирование включено, показываем модальное окно */}
            <Modal
                title="Edit Patient Info"
                visible={isEditingPatient}
                onCancel={handleCancelEditingPatient}
                footer={null} // Отключаем стандартные кнопки
                centered
                maskClosable={true}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    style={{ maxWidth: 600, textAlign: 'left' }}
                    initialValues={{
                        documentNumber: patient.documentNumber,
                        serie: patient.serie,
                        iNN: patient.iNN,
                        patentTerritory: patient.patentTerritory,
                        issuedBy: patient.issuedBy,
                        nationality: `${patient.nationality}`,
                        dateOfIssue: patient.dateOfIssue ? dayjs(patient.dateOfIssue) : null,
                    }}
                >
                    <Form.Item
                        label="Number"
                        name="documentNumber"
                        rules={[
                            { required: true, message: 'Enter document number' },
                            { pattern: /^\d{9}$/, message: 'Document number must be exactly 9 digits' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Serie"
                        name="serie"
                        rules={[
                            { required: true, message: 'Enter series' },
                            { pattern: /^\d{2}$/, message: 'Serie must be exactly 2 digits' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Inn"
                        name="iNN"
                        rules={[
                            { required: true, message: 'Enter INN' },
                            { pattern: /^\d{12}$/, message: 'INN must be exactly 12 digits' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Territory"
                        name="patentTerritory"
                        rules={[
                            { required: true, message: 'Enter patent territory' },
                            { pattern: /^[A-Za-z\s]+$/, message: 'Territory must contain only letters and spaces' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="IssuedBy"
                        name="issuedBy"
                        rules={[
                            { required: true, message: 'Enter issuer' },
                            { pattern: /^[A-Za-z\s]+$/, message: 'Issued by must contain only letters and spaces' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Nationality"
                        name="nationality"
                        rules={[{ required: true, message: 'Select nationality' }]}
                    >
                        <Select style={{ width: '250px' }}>
                            <Select.Option value="0">Azerbaijan</Select.Option>
                            <Select.Option value="1">Tajikistan</Select.Option>
                            <Select.Option value="2">Uzbekistan</Select.Option>
                            <Select.Option value="3">Moldova</Select.Option>
                            <Select.Option value="4">Ukraine</Select.Option>
                            <Select.Option value="5">Kyrgyzstan</Select.Option>
                            <Select.Option value="6">Kazakhstan</Select.Option>
                            <Select.Option value="7">Armenia</Select.Option>
                            <Select.Option value="8">Belarus</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="DateOfIssue"
                        name="dateOfIssue"
                        rules={[{ required: true, message: 'Enter date of issue' }]}
                    >
                        <DatePicker style={{ width: '250px' }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                            Save
                        </Button>
                        <Button type="default" onClick={handleCancelEditingPatient}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Если не редактируем, показываем информацию пациента */}
            {!isEditingPatient && (
                <div>
                    <div className="personal-info-content">
                        <p><span className="personal-info-label">Document Number:</span> {patient.documentNumber}</p>
                        <p><span className="personal-info-label">Serie:</span> {patient.serie}</p>
                        <p><span className="personal-info-label">INN:</span> {patient.iNN}</p>
                        <p><span className="personal-info-label">Patent Territory:</span> {patient.patentTerritory}</p>
                        <p><span className="personal-info-label">Issued By:</span> {patient.issuedBy}</p>
                        <p><span className="personal-info-label">Nationality:</span> {getNationalityName(patient.nationality)}</p>
                        <p><span className="personal-info-label">Date Of Issue:</span> {formatDate(patient.dateOfIssue)}</p>
                    </div>
                    <button type="button" onClick={handleStartEditing}>
                        Edit Patient Info
                    </button>
                </div>
            )}
        </div>
    );
};