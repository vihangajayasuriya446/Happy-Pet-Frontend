import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material'; 


const OwnerForm: React.FC = () => {
    const [owner, setOwner] = useState({ ownerName: '', address: '', contactNumber: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/v1/addowner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(owner),
        });
        if (response.ok) {
            navigate('/owners');
        }
    };

    return (
        <Box>
        <form onSubmit={handleSubmit}>
            <input type="text" value={owner.ownerName} onChange={e => setOwner({ ...owner, ownerName: e.target.value })} placeholder="Owner Name" />
            <input type="text" value={owner.address} onChange={e => setOwner({ ...owner, address: e.target.value })} placeholder="Address" />
            <input type="text" value={owner.contactNumber} onChange={e => setOwner({ ...owner, contactNumber: e.target.value })} placeholder="Contact Number" />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => navigate('/owners')}>View Owners</button>
        </form>
    </Box>
    );
};

export default OwnerForm;
