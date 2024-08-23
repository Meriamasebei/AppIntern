// src/components/Library.tsx
import React from 'react';
import { useGlobalContext } from './GlobalContex';

// Define the type of form data expected
interface FormData {
    field1: string;
    field2: string;
    // Add more fields as needed
}

const Library: React.FC = () => {
    const { formData } = useGlobalContext(); // Retrieve form data from context

    return (
        <div>
            <h2>Filled Form Data</h2>
            {formData ? (
                <div>
                    {/* Display form data safely */}
                    <p><strong>Field 1:</strong> {formData.field1}</p>
                    <p><strong>Field 2:</strong> {formData.field2}</p>
                    {/* Display more fields as needed */}
                </div>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default Library;
