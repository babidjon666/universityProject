import React, { useState, useEffect } from 'react';
import { getCertificates, formatDate, downloadCertificate } from "./UserProfileService";
import { List, Button } from 'antd';
import { ToolOutlined, DownloadOutlined } from '@ant-design/icons';

export const Certificates = ({ id }) => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        fetchCertificates(id);
    }, [id]);

    const fetchCertificates = async (id) => {
        try {
            const response = await getCertificates(id);
            const certificatesData = response.$values;
            setCertificates(certificatesData);
        } catch (error) {
            console.error('Error fetching certificatesData:', error);
        }
    };

    return (
        <div className="section">
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                {/* Дополнительный контент, если нужно */}
            </div>
            <List
                pagination={{
                    position: 'bottom',
                    align: 'center',
                    pageSize: 5,
                }}
                dataSource={certificates}
                renderItem={(item, index) => (
                    <List.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ToolOutlined
                                style={{ fontSize: '40px', color: '#1890ff', marginRight: '20px' }}
                            />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    Certificate №{index + 1}:
                                </div>
                                <div style={{ fontSize: '14px', color: '#777' }}>
                                    <p><strong>From:</strong> {formatDate(item.dateTime)}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* Кнопка для скачивания */}
                            <Button
                                type="primary"
                                icon={<DownloadOutlined />}
                                onClick={() => downloadCertificate(item.id)}
                            >
                                Download
                            </Button>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};