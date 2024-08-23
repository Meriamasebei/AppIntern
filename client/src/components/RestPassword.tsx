import axios from "axios";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import './RestPassword.css';

function ResetPassword() {
    const [token, setToken] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();


    useEffect(() => {
        const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcnllbS5zZWJlaWlAZ21haWwuY29tIiwiaWF0IjoxNzIzODAyMjE0LCJleHAiOjE3MjQ0MDcwMTR9.chITH4xFg0-xFfA_qZX71pxbqFR_o_XKtkjLl_BqxQU';
        console.log('Hardcoded Token:', hardcodedToken);
        setToken(hardcodedToken);
    }, []);
    

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!token) {
            setMessage("Invalid or missing token");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/reset-password', { token, newPassword });
            console.log('Response:', response.data); 
            if (response.data.success) { // Check if success flag is true
                setMessage(response.data.message);
                setTimeout(() => navigate('/dashboard'), 2000); // Redirect to dashboard after 2 seconds
            } else {
                setMessage(response.data.message);
            }
        } catch (err) {
            console.error('Error resetting password:', err);
            setMessage("Error resetting password");
        }
    };

    return (
        <MDBContainer
        fluid
        className="p-0 my-5"
        style={{
            background: 'linear-gradient(to bottom, #013a63 50%, #ffffff 50%)', // Marine blue and white split
            minHeight: '100vh' // Ensure it covers the full viewport height
        }}
    >
        <MDBRow className="justify-content-center align-items-center min-vh-100">
    <MDBCol md="6" lg="4">
        <div className="text-center text-secondary custom-padding">
            <h2 className="mt-1 mb-5 pb-1"   style={{ color: '#013a63 ' }}>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <MDBInput
                    wrapperClass="mb-4"
                    placeholder="New Password"
                    id='newPassword'
                    type='password'
                    onChange={handlePasswordChange}
                    value={newPassword}
                    required
                />
                <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Confirm Password"
                    id='confirmPassword'
                    type='password'
                    onChange={handleConfirmPasswordChange}
                    value={confirmPassword}
                    required
                />
                <MDBBtn 
                    type="submit" 
                    className="mb-4 w-100 "  style={{ backgroundColor: '#33006F', borderColor: '#33006F' }}
                >
                    Reset Password
                </MDBBtn>
            </form>
            {message && <h4 className="text-danger">{message}</h4>}
        </div>
    </MDBCol>
</MDBRow>

       
    </MDBContainer>
    
    

    );
}

export default ResetPassword;
