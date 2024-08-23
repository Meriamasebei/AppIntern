// src/components/Form.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from './GlobalContex';
 
const Form: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, watch} = useForm();
    const { setFormData } = useGlobalContext(); // Assuming you have a context to set form data
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (data: any) => {
        setFormData(data); 
        setIsSubmitted(true); 
        console.log("Form submitted successfully", data);
    };

        // Watch form values
        const field1Value = watch('field1');
        const field2Value = watch('field2');

    return (
        <div>
            <h2>Fill out the form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Field 1 */}
                <div>
                    <label htmlFor="field1">Field 1</label>
                    <input
                        {...register('field1', { required: "Field 1 is required" })}
                        placeholder="Enter Field 1"
                    />
                    {/* Safely display the error message */}
                    {errors.field1 && <p>{(errors.field1 as any).message}</p>}
                </div>

                {/* Field 2 */}
                <div>
                    <label htmlFor="field2">Field 2</label>
                    <input
                        {...register('field2', { required: "Field 2 is required" })}
                        placeholder="Enter Field 2"
                    />
                    {/* Safely display the error message */}
                    {errors.field2 && <p>{(errors.field2 as any).message}</p>}
                </div>

                {/* Additional dynamic fields can be added here */}
                
                <button type="submit">Show Filled Form</button>
            </form>

            {/* Conditionally render the submitted form data */}
            {isSubmitted && (
                <div className="submitted-form-data">
                    <h3>Submitted Form Data:</h3>
                    <p><strong>Field 1:</strong> {field1Value}</p>
                    <p><strong>Field 2:</strong> {field2Value}</p>
                    {/* Add more fields as necessary */}
                </div>
            )}
        </div>
    );
};

export default Form;
