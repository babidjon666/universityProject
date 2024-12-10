import React, { useState, useEffect } from "react";
import { Avatar, List, Button } from "antd";
import { getClientsWithReferrals } from "./LaborantService";

import CheckReferrals from "./CheckReferrals";
import CreateTest from "./CreateTest";

export const ClientsWithRefs = () => {
    const [clients, setClients] = useState([]);
    const [isTestsModalVisible, setIsTestsModalVisible] = useState(false);
    const [isCreateTestVisible, setIsCreateTestVisible] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await getClientsWithReferrals();
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

    const showCreateTestsModal = (clientId) => {
        setSelectedClientId(clientId);
        setIsCreateTestVisible(true);
    };

    const closeCreateTestsModal = () => {
        setIsTestsModalVisible(false);
        setIsCreateTestVisible(null);
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
                                        onClick={() => showTestsModal(item.id)}
                                    >
                                        Check Referrals
                                    </Button>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: "10px" }}
                                        onClick={() => showCreateTestsModal(item.id)}
                                    >
                                        Create Test
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </List.Item>
                )}
            />
            <CheckReferrals
                clientId={selectedClientId}
                visible={isTestsModalVisible}
                onClose={closeTestsModal}
            />
            <CreateTest
                clientId={selectedClientId}
                visible={isCreateTestVisible}
                onClose={closeCreateTestsModal}
            />
        </div>
    );
};