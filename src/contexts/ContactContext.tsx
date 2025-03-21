import React, { useState, createContext } from 'react';

// Define the ContactRequest type directly here instead of importing it
export interface ContactRequest {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    petId?: number;
    status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
    submissionDate?: string;
}

interface ContactContextType {
    contactRequests: ContactRequest[];
    addContactRequest: (request: ContactRequest) => void;
}

export const ContactContext = createContext<ContactContextType>({
    contactRequests: [],
    addContactRequest: () => {},
});

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);

    const addContactRequest = (request: ContactRequest) => {
        setContactRequests(prev => [...prev, request]);
    };

    return (
        <ContactContext.Provider value={{ contactRequests, addContactRequest }}>
            {children}
        </ContactContext.Provider>
    );
};
