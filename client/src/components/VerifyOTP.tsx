import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

function VerifyOTP() {
    const [otp, setOtp] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const email = (location.state as { email: string }).email;

    const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!/^\d{6}$/.test(otp)) {  // Basic validation for 6-digit OTP
            setMessage("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/verify-otp', { email, otp });
            if (response.status === 200) {
                navigate('/reset-password', { state: { email } });
            } else {
                setMessage(response.data.message || "Verification failed");
            }
        } catch (err) {
            console.error('Error validating OTP:', err);
            setMessage("Error validating OTP");
        }
    };

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
                <MDBCol col='12' className="d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">Verify OTP</h4>
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                wrapperClass="mb-4"
                                placeholder="Enter OTP"
                                id='otp'
                                type='text'
                                onChange={handleOtpChange}
                                value={otp}
                                required
                                maxLength={6} // Enforce 6 digits
                            />
                            <MDBBtn type="submit" className="mb-4 w-100 btn btn-primary">Verify OTP</MDBBtn>
                        </form>
                        {message && <div className="text-info">{message}</div>} {/* Use <div> instead of <p> */}
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default VerifyOTP;
