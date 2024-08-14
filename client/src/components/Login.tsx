import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import login from '../assets/IconLogo.png';

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3000/api/auth/login', { email, password });

            if (result.data.accessToken) {
                // store tokens in cookies
                document.cookie = `accessToken=${result.data.accessToken}; path=/`;
                document.cookie = `refreshToken=${result.data.refreshToken}; path=/`;

                navigate('/dashboard');
            } else {
                setError("Login failed");
                console.error("Login failed:", result.data);
            }
        } catch (err) {
            setError("Error logging in");
            console.error('Error:', err);
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
                <MDBCol
                    col='10' md='6'
                    className="d-flex justify-content-center align-items-center"
                    style={{ backgroundImage: `url(${login})`, backgroundSize: '690px 650px', backgroundPosition: '30% 50%' }}
                >
                    <div className="text-center text-secondary custom-padding" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: '10px' }}>
                        <h4 className="mt-1 mb-5 pb-1">Login</h4>
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                wrapperClass="mb-4"
                                placeholder="Email"
                                id='email'
                                type='email'
                                onChange={handleEmailChange}
                                value={email}
                                required
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                placeholder="Password"
                                id='password'
                                type='password'
                                onChange={handlePasswordChange}
                                value={password}
                                required
                            />
                            <MDBBtn type="submit" className="mb-4 w-100 btn btn-secondary">Sign in</MDBBtn>
                        </form>
                        {error && <p className="text-danger">{error}</p>}
                        <a className="text-muted" href="#!" onClick={handleForgotPassword}>Forgot password?</a>
                    </div>
                </MDBCol>
                <MDBCol col='6' md='5'>
                    <div className="d-flex flex-row align-items-center justify-content-center" style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)', height: '80vh', borderRadius: '10px' }}>
                        <p className="lead fw-normal mb-0 me-3 text-white">Welcome back!</p>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;
