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



import React, { useEffect, useState } from 'react';

interface Owner {
    id: number;
    ownerName: string;
    address: string;
    contactNumber: string;
}

const OwnerTable: React.FC = () => {
    const [owners, setOwners] = useState<Owner[]>([]);

    useEffect(() => {
        const fetchOwners = async () => {
            const response = await fetch('http://localhost:8080/api/v1/getowners');
            const data = await response.json();
            setOwners(data);
        };
        fetchOwners();
    }, []);

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:8080/api/v1/deleteowner/${id}`, { method: 'DELETE' });
        setOwners(owners.filter(owner => owner.id !== id));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Contact Number</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {owners.map(owner => (
                    <tr key={owner.id}>
                        <td>{owner.ownerName}</td>
                        <td>{owner.address}</td>
                        <td>{owner.contactNumber}</td>
                        <td><button onClick={() => handleDelete(owner.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OwnerTable;