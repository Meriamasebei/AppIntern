import axios from "axios";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

function ResetPassword() {
    const [token, setToken] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        setToken(tokenFromUrl);
    }, [searchParams]);

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
        <MDBContainer fluid className="p-3 my-5">
            <MDBRow>
                <MDBCol md="6" className="mx-auto">
                    <form onSubmit={handleSubmit}>
                        <MDBInput 
                            type="password" 
                            label="New Password" 
                            value={newPassword} 
                            onChange={handlePasswordChange} 
                            required 
                        />
                        <MDBInput 
                            type="password" 
                            label="Confirm Password" 
                            value={confirmPassword} 
                            onChange={handleConfirmPasswordChange} 
                            required 
                        />
                        <MDBBtn type="submit" color="primary">Reset Password</MDBBtn>
                        {message && <p>{message}</p>}
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ResetPassword;
