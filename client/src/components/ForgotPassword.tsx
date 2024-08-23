import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
            setMessage(response.data.message);
            navigate('/verify-otp', { state: { email } });
        } catch (err) {
            console.error('Error sending OTP email:', err);
            setMessage("Error sending OTP email");
        }
    };

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
                <MDBCol col='12' className="d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">Forgot Password</h4>
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                wrapperClass="mb-4"
                                placeholder="Enter your email"
                                id='email'
                                type='email'
                                onChange={handleEmailChange}
                                value={email}
                                required
                            />
                            <MDBBtn type="submit" className="mb-4 w-100 btn btn-primary">Send OTP</MDBBtn>
                        </form>
                        {message && <h4 className="text-info">{message}</h4>}
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ForgotPassword;
