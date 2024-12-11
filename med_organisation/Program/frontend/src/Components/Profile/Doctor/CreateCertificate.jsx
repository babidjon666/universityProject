import React, { useState } from "react";
import { Modal, Form, Select, DatePicker, message } from "antd";
import { createCertificate } from "./DoctorService";

const CreateCertificate = ({ visible, onClose, clientId, doctorId}) => {
    const [form] = Form.useForm();

    const handleCreateCertificate = async () => {
        try {
            const values = await form.validateFields();
            await createCertificate(values.date.format("YYYY-MM-DD"), clientId, doctorId);
            message.success("Certificate created successfully");
            onClose();
            form.resetFields();
        } catch (error) {
            console.error("Error creating referral:", error);
            message.error("Failed to create referral");
        }
    };

    return (
        <Modal
            title="CreateCertificate"
            visible={visible}
            onCancel={onClose}
            onOk={handleCreateCertificate}
            width="500px"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: "Please select a date!" }]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateCertificate;