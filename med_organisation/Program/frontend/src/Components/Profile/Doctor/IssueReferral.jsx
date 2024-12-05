import React, { useState } from "react";
import { Modal, Form, Select, DatePicker, message } from "antd";
import { createReferral } from "./DoctorService";

const IssueReferral = ({ visible, onClose, clientId }) => {
    const [form] = Form.useForm();

    const handleCreateReferral = async () => {
        try {
            const values = await form.validateFields();
            await createReferral(clientId, values.testType, values.date.format("YYYY-MM-DD"));
            message.success("Referral created successfully");
            onClose();
            form.resetFields();
        } catch (error) {
            console.error("Error creating referral:", error);
            message.error("Failed to create referral");
        }
    };

    return (
        <Modal
            title="Issue Referral"
            visible={visible}
            onCancel={onClose}
            onOk={handleCreateReferral}
            width="500px"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Test Type"
                    name="testType"
                    rules={[{ required: true, message: "Please select a test type!" }]}
                >
                    <Select placeholder="Select test type">
                        <Select.Option value={0}>Clinical Blood Test</Select.Option>
                        <Select.Option value={1}>Clinical Urine Tests</Select.Option>
                        <Select.Option value={2}>Blood Test for HIV</Select.Option>
                        <Select.Option value={3}>Blood Test for Syphilis</Select.Option>
                        <Select.Option value={4}>Urine Test for Drugs</Select.Option>
                    </Select>
                </Form.Item>
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

export default IssueReferral;