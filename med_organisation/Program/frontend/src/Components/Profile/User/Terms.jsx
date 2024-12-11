import React, { useState, useEffect } from 'react';
import { getSettings } from "./UserProfileService";
import { List} from 'antd';
import { ToolOutlined } from '@ant-design/icons';

export const Terms = () => {
    const [settings, setSettings] = useState([]); 

    useEffect(() => {
        fetchSettings();
    },[]);

    const fetchSettings = async () => {
        try {
            const response = await getSettings();
            const settingsData = response.$values;
            setSettings(settingsData);
        } catch (error) {
            console.error('Error fetching settingsData:', error);
        }
    };

    return (
        <div className="section">
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        </div>
        <List
            pagination={{
                position: 'bottom',
                align: 'center',
                pageSize: 3,
            }}
            dataSource={settings}
            renderItem={(item, index) => (
                <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}> 
                        <ToolOutlined 
                            style={{ fontSize: '40px', color: '#1890ff', marginRight: '20px' }} 
                        />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Terms №{index + 1}: 
                            </div>
                            <div style={{ fontSize: '14px', color: '#777' }}>
                                <p><strong>DeadLines:</strong> {item.deadlines}</p>
                                <p><strong>Terms:</strong> {item.terms}</p>
                            </div>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    </div>
    );
};