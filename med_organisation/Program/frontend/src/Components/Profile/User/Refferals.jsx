import React, { useState, useEffect } from 'react';
import { getReferrals } from './UserProfileService';
import { Button, Avatar, Menu, List, Modal, Tag, Form, Input, Select, message, DatePicker} from 'antd';

export const Refferals = ({id}) => {
    const [referrals, setReferrals] = useState([]);  

    useEffect(() => {
        fetchReferrals(id);
    }, [id]);

    const fetchReferrals = async (id) => {
        try {
            const response = await getReferrals(id);
            const requestsData = response.$values; 
            setReferrals(requestsData);  
        } catch (error) {
            console.error("Error fetching referrals:", error);
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
                pageSize: 3,
            }}
            dataSource={referrals} 
            renderItem={(item, index) => (
                <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <div style={{textAlign: 'left'}}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Referral №{index + 1}: {item.descriptionOfGoal}
                            </div>
                            <div style={{ fontSize: '14px', color: '#777' }}>
                                <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                                <p><strong>Test Type:</strong>  {item.testType === 0 ? 'Clinical Blood Test' : item.testType === 1 ? 'Clinical Urine Test' : item.testType === 2 ? 'Blood Test For HIV' : item.testType === 3 ? 'Blood TestFor Syphilis' : 'Urine Test For Drugs'}</p>
                            </div>
                        </div>
                    </div>
                    
                </List.Item>
            )}
        />
    </div>
    );
};