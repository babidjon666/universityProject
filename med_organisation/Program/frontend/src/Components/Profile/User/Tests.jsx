import React, { useState, useEffect } from 'react';
import { getTests } from './UserProfileService';
import { List, Card, Tag } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';

export const Tests = ({ id }) => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        fetchTests(id);
    }, [id]);

    const fetchTests = async (id) => {
        try {
            const data = await getTests(id);
            console.log(data);

            const combinedTests = [
                ...data.clinicalBloodTestResults.$values,
                ...data.clinicalUrineTestResults.$values,
                ...data.bloodTestForHIVResults.$values,
                ...data.bloodTestForSyphilisResults.$values,
                ...data.urineAnalysisForDrugsAndPsychotropicsResults.$values,
            ];

            setTests(combinedTests);
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const renderBloodTestDetails = (item) => (
        <>
            <p>
                <strong>Red Blood Cells:</strong> {item.redBloobCells}
            </p>
            <p>
                <strong>Color Index:</strong> {item.colorIndex}
            </p>
            <p>
                <strong>Erythrocyte Sedimentation:</strong> {item.erythrocyteSedimentation}
            </p>
            <p>
                <strong>Hemoglobin:</strong> {item.hemoglobin}
            </p>
            <p>
                <strong>Platelets:</strong> {item.platelets}
            </p>
            <p>
                <strong>Leukocytes:</strong> {item.leukocytes}
            </p>
            <p>
                <strong>Basophils:</strong> {item.basophils}
            </p>
            <p>
                <strong>Eosinophils:</strong> {item.eosinophils}
            </p>
            <p>
                <strong>Monocytes:</strong> {item.monocytes}
            </p>
            <p>
                <strong>Lymphocytes:</strong> {item.lymphocytes}
            </p>
        </>
    );

    const renderUrineTestDetails = (item) => (
        <>
            <p>
                <strong>Red Blood Cells:</strong> {item.redBloobCells}
            </p>
            <p>
                <strong>Urobilinogen:</strong> {item.urobilinogen}
            </p>
            <p>
                <strong>Leukocytes:</strong> {item.leukocytes}
            </p>
            <p>
                <strong>Bilirubin:</strong> {item.bilirubin ? 'Positive' : 'Negative'}
            </p>
            <p>
                <strong>Protein:</strong> {item.protien}
            </p>
            <p>
                <strong>Acidity:</strong> {item.acidity}
            </p>
            <p>
                <strong>Density:</strong> {item.density}
            </p>
            <p>
                <strong>Nitrites:</strong> {item.nitrites ? 'Positive' : 'Negative'}
            </p>
            <p>
                <strong>Glucose:</strong> {item.glucose ? 'Positive' : 'Negative'}
            </p>
            <p>
                <strong>Color:</strong> {item.color}
            </p>
        </>
    );

    const renderBloodTestForHIVResults = (item) => (
        <>
            <p>
                <strong>Result:</strong> {item.result ? 'Positive' : 'Negative'}
            </p>
        </>
    );

    const renderBloodTestForSyphilis = (item) => (
        <>
            <p>
                <strong>Result:</strong> {item.result ? 'Positive' : 'Negative'}
            </p>
        </>
    );

    const renderDrugTest = (item) => (
        <>
            <p>
                <strong>Nicotin And Metabolites:</strong> {item.nicotinAndMetabolites ? 'Positive' : 'Negative'}
            </p>
            <p>
                <strong>Alcohol:</strong> {item.alcohol ? 'Positive' : 'Negative'}
            </p>
            <p>
                <strong>Psychoactive Substances:</strong> {item.psychoactiveSubstances ? 'Positive' : 'Negative'}
            </p>
            <p>
                <strong>Narcotic Subctances:</strong> {item.narcoticSubctances ? 'Positive' : 'Negative'}
            </p>
        </>
    );

    return (
        <div className="section">
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                }}
                pagination={{
                    position: 'bottom',
                    align: 'center',
                    pageSize: 4,
                }}
                dataSource={tests}
                renderItem={(item, index) => (
                    <List.Item>
                        <Card
                            title={
                                <>
                                    <ExperimentOutlined
                                        style={{
                                            fontSize: '20px',
                                            color: item.testType === 0 ? 'red' : '#faad14',
                                            marginRight: '10px',
                                        }}
                                    />
                                    Test №{index + 1} (
                                        {item.testType === 0 ? (
                                        <Tag color="red">Blood Test</Tag>
                                    ) : item.testType === 1 ? (
                                        <Tag color="gold">Urine Test</Tag>
                                    ) : item.testType === 2 ? (
                                        <Tag color="green">HIV Test</Tag>
                                    ) : item.testType === 3 ? (
                                        <Tag color="blue">Syphilis Test</Tag>
                                    ) : (
                                        <Tag color="grey">Drugs Test</Tag>
                                    )}
                                    )
                                </>
                            }
                            hoverable
                            style={{
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                textAlign: 'left',
                                width: '300px',
                                height: '500px'
                            }}
                        >
                            {item.testType === 0
                                ? renderBloodTestDetails(item)
                                : item.testType === 1
                                ? renderUrineTestDetails(item)
                                : item.testType === 2
                                ? renderBloodTestForHIVResults(item)
                                : item.testType === 3
                                ? renderBloodTestForSyphilis(item)
                                :  renderDrugTest(item)}
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};