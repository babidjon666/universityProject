import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Refferals } from "../User/Refferals";

const CheckReferrals = ({ clientId, visible, onClose }) => {
    return (
        <Modal
            title="Client Referrals"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={1300}
        >
            {clientId && <Refferals id={clientId} />}
        </Modal>
    );
};

export default CheckReferrals;