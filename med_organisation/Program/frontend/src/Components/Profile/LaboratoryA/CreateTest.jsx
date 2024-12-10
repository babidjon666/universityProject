import React, { useState } from "react";
import { Modal, Form, Select, Input, Button, message, Checkbox } from "antd";
import { createClinicalBloodTest, createClinicalUrineTest, createHIVTest, createBloodTestForSyphilis, createUrineTestForDrugs } from "./LaborantService";

const CreateTest = ({ clientId, visible, onClose }) => {
    const [form] = Form.useForm();
    const [testType, setTestType] = useState(null);

    const handleCreateTest = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form values:", values);

            switch (testType) {
                case 0:
                    await createClinicalBloodTest(
                        clientId,
                        values.redBloobCells,
                        values.colorIndex,
                        values.erythrocyteSedimentation,
                        values.hemoglobin,
                        values.platelets,
                        values.leukocytes,
                        values.basophils,
                        values.eosinophils,
                        values.monocytes,
                        values.lymphocytes
                    );
                    setTestType(null);
                    break;
                case 1:
                    await createClinicalUrineTest(
                        clientId,
                        values.redBloobCells,
                        values.urobilinogen,
                        values.leukocytes,
                        values.bilirubin,
                        values.protien,
                        values.acidity,
                        values.density,
                        values.nitrites,
                        values.glucose,
                        values.color
                    );
                    setTestType(null);
                    break;
                case 2:
                    await createHIVTest(clientId, values.result);
                    setTestType(null);
                    break;

                case 3:
                    await createBloodTestForSyphilis(clientId, values.result);
                    setTestType(null);
                    break;    

                case 4:
                    await createUrineTestForDrugs(
                        clientId, 
                        values.nicotinAndMetabolites, 
                        values.alcohol, 
                        values.psychoactiveSubstances, 
                        values.narcoticSubctances);
                    setTestType(null);
                    break;  
            }

            message.success("Test created successfully");
            form.resetFields();
            onClose();
        } catch (error) {
            console.error("Error creating test:", error);
            message.error("Failed to create test");
        }
    };

    const renderFields = () => {
        switch (testType) {
            case 0: // Clinical Blood Test
                return (
                    <>
                        <Form.Item name="redBloobCells" label="Red Blood Cells" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="colorIndex" label="Color Index" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="erythrocyteSedimentation" label="Erythrocyte Sedimentation" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="hemoglobin" label="Hemoglobin" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="platelets" label="Platelets" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="leukocytes" label="Leukocytes" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="basophils" label="Basophils" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="eosinophils" label="Eosinophils" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="monocytes" label="Monocytes" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="lymphocytes" label="Lymphocytes" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </>
                );
            case 1: // Clinical Urine Test
                return (
                    <>
                        <Form.Item name="redBloobCells" label="Red Blood Cells" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="urobilinogen" label="Urobilinogen" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="leukocytes" label="Leukocytes" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="bilirubin" label="Bilirubin" valuePropName="checked">
                            <Checkbox>Positive</Checkbox>
                        </Form.Item>
                        <Form.Item name="protien" label="Protien" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="acidity" label="Acidity" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="density" label="Density" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="nitrites" label="Nitrites" valuePropName="checked" >
                        <Checkbox>Positive</Checkbox>
                        </Form.Item>
                        <Form.Item name="glucose" label="Glucose" valuePropName="checked" r>
                            <Checkbox>Positive</Checkbox>
                        </Form.Item>
                        <Form.Item name="color" label="Color" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </>
                );
            case 2: // HIV Test
                return (
                    <>
                        <Form.Item name="result" label="Result" valuePropName="checked">
                            <Checkbox>Positive</Checkbox>
                        </Form.Item>
                    </>
                );
            case 3: // Syphilis Test
                return (
                    <>
                        <Form.Item name="result" label="Result" valuePropName="checked">
                            <Checkbox>Positive</Checkbox>
                        </Form.Item>
                    </>
                );
            case 4: // Drug Test
                return (
                    <>
                        <Form.Item name="nicotinAndMetabolites" label="Nicotin And Metabolites" valuePropName="checked">
                            <Checkbox>Positive</Checkbox>
                        </Form.Item>
                        <Form.Item name="alcohol" label="Alcohol" valuePropName="checked">
                            <Checkbox>Positive</Checkbox>
                        </Form.Item>
                        <Form.Item name="psychoactiveSubstances" label="Psychoactive Substances" valuePropName="checked">
                            <Checkbox>Positive</Checkbox>
                        </Form.Item>
                        <Form.Item name="narcoticSubctances" label="Drug Subctances" valuePropName="checked">
                            <Checkbox>Positive</Checkbox>
                        </Form.Item>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Modal
            title="Create Test"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleCreateTest}>
                    Create
                </Button>
            ]}
            width={500}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Test Type"
                    name="testType"
                    rules={[{ required: true, message: "Please select a test type!" }]}
                >
                    <Select
                        placeholder="Select test type"
                        onChange={(value) => {
                            setTestType(value);
                            form.setFieldValue({ testType: value});
                            form.resetFields(['otherFields']); // Reset fields when test type changes
                        }}
                        value = {testType}
                    >
                        <Select.Option value={0}>Clinical Blood Test</Select.Option>
                        <Select.Option value={1}>Clinical Urine Test</Select.Option>
                        <Select.Option value={2}>HIV Test</Select.Option>
                        <Select.Option value={3}>Syphilis Test</Select.Option>
                        <Select.Option value={4}>Drug Test</Select.Option>
                    </Select>
                </Form.Item>
                {renderFields()}
            </Form>
        </Modal>
    );
};

export default CreateTest;