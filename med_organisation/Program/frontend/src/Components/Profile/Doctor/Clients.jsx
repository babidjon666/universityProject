import React, { useState, useEffect } from "react";
import { Avatar, List, Button } from "antd";
import { getClients } from "./DoctorService";

import CheckTests from "./CheckTests"; // Импортируем новый компонент
import IssueReferral from "./IssueReferral";
import CreateCertificate from "./CreateCertificate";

export const Clients = ({ id }) => {
    const [clients, setClients] = useState([]);
    const [isTestsModalVisible, setIsTestsModalVisible] = useState(false);
    const [isReferralModalVisible, setReferralIsModalVisible] = useState(false);
    const [isCertificateModalVisible, setCertificateIsModalVisible] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);

    useEffect(() => {
        fetchClients(id);
    }, [id]);

    const fetchClients = async (doctorId) => {
        try {
            const response = await getClients(doctorId);
            const settingsData = response.$values;
            setClients(settingsData);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const showTestsModal = (clientId) => {
        setSelectedClientId(clientId);
        setIsTestsModalVisible(true);
    };

    const closeTestsModal = () => {
        setIsTestsModalVisible(false);
        setSelectedClientId(null);
    };

    const showReferralModal = (clientId) => {
        setSelectedClientId(clientId);
        setReferralIsModalVisible(true);
    };

    const closeReferralModal = () => {
        setReferralIsModalVisible(false);
        setSelectedClientId(null);
    };

    const showCertificateModal = (clientId) => {
        setSelectedClientId(clientId);
        setCertificateIsModalVisible(true);
    };

    const closeCertificateModal = () => {
        setCertificateIsModalVisible(false);
        setSelectedClientId(null);
    };
    return (
        <div className="section">
            <List
                pagination={{
                    position: "bottom",
                    align: "center",
                    pageSize: 4,
                }}
                dataSource={clients}
                renderItem={(item, index) => (
                    <List.Item
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                                size={80}
                                style={{ marginRight: "20px" }}
                            />
                            <div style={{ textAlign: "left" }}>
                                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                                    {item.name} {item.surname}
                                </div>
                                <div style={{ fontSize: "14px", color: "#777" }}>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: "10px" }}
                                        onClick={() => showReferralModal(item.id)}
                                    >
                                        Issue Referral
                                    </Button>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: "10px" }}
                                        onClick={() => showTestsModal(item.id)}
                                    >
                                        Check Tests
                                    </Button>
                                    <Button 
                                    type="primary" 
                                    style={{ marginRight: "10px" }}
                                    onClick={() => showCertificateModal(item.id)}
                                    >
                                        Issue Certificate
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </List.Item>
                )}
            />

            <CheckTests
                clientId={selectedClientId}
                visible={isTestsModalVisible}
                onClose={closeTestsModal}
            />
            <IssueReferral
                clientId={selectedClientId}
                visible={isReferralModalVisible}
                onClose={closeReferralModal}
            />
            <CreateCertificate
                clientId={selectedClientId}
                visible={isCertificateModalVisible}
                onClose={closeCertificateModal}
                doctorId={id}
            />
        </div>
    );
};