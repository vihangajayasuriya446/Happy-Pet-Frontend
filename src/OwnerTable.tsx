// src/components/OwnerTable.tsx
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
