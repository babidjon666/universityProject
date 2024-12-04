import React, { useState, useEffect } from 'react';
import { Avatar, Menu, Modal, Button, List, Input, Form } from 'antd';
import { getClients } from './DoctorService';

export const Clients = ( {id} ) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients(id);
    }, []);

    const fetchClients = async (doctorId) => {
        try {
            const response = await getClients(doctorId);
            const settingsData = response.$values;
            setClients(settingsData);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    return(
        <div className="section">
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        </div>
        <List
            pagination={{
                position: 'bottom',
                align: 'center',
                pageSize: 4,
            }}
            dataSource={clients}
            renderItem={(item, index) => (
                <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>  {/* Центрируем по вертикали */}
                    <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} size={80} style={{ marginRight: '20px' }} />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                {item.name} {item.surname}
                            </div>
                            <div style={{ fontSize: '14px', color: '#777' }}>
                            <Button
                                type="primary"
                                style={{ alignSelf: 'center' }}
                            >
                                Check Patient
                            </Button>
                            <Button
                                type="primary"
                                style={{ alignSelf: 'center' }}
                            >
                                Check Passport
                            </Button>
                            <Button
                                type="primary"
                                style={{ alignSelf: 'center' }}
                            >
                                Issue referral
                            </Button>
                            <Button
                                type="primary"
                                style={{ alignSelf: 'center' }}
                            >
                                Issue certificate
                            </Button>
                            </div>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    </div>
    );
};