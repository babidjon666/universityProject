// src/Profile/User/CheckTests.jsx

import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Tests } from "../User/Tests";

const CheckTests = ({ clientId, visible, onClose }) => {
    return (
        <Modal
            title="Client Tests"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={1300}
        >
            {clientId && <Tests id={clientId} />}
        </Modal>
    );
};

export default CheckTests;