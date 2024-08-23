import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import login from "../assets/LogoFin.png";
import logo from "../assets/Logo shamash.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (result.data.accessToken) {
        // store tokens in cookies
        document.cookie = `accessToken=${result.data.accessToken}; path=/`;
        document.cookie = `refreshToken=${result.data.refreshToken}; path=/`;

        navigate("/dashboard");
      } else {
        setError("Login failed");
        console.error("Login failed:", result.data);
      }
    } catch (err) {
      setError("Error logging in");
      console.error("Error:", err);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol
          col="10"
          md="6"
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${login})`,
            backgroundSize:
              "820px 660px" /* or '900px 750px' depending on your needs */,
            backgroundPosition: "20% 80%" /* Adjust the position as needed */,
            backgroundRepeat:
              "no-repeat" /* To prevent the image from repeating */,
          }}
        >
          <div
            id="form"
            className="text-center text-secondary custom-paddinng"
            style={{
              backdropFilter: "blur(2px)", // Adjust the blur effect
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderRadius: "20px",
              padding: "100px", // Adjust padding to increase container size
              width: "38%", // Full width of its container
              maxWidth: "500px", // Optional: Set a maximum width
              margin: "0 auto",
              marginLeft:"250px"
             // Center align the container if it's not full width
            }}
          >
            <h2 className="mt-1 mb-5 pb-1" style={{ color: "#494995" }}>
              Login
            </h2>
            <form onSubmit={handleSubmit}
              >
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Email"
                id="email"
                type="email"
                onChange={handleEmailChange}
                value={email}
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Password"
                id="password"
                type="password"
                onChange={handlePasswordChange}
                value={password}
                required
              />
              <MDBBtn
                type="submit"
                className="mb-4 w-100 "
                style={{ backgroundColor: "#494995", borderColor: "#494995" }}
              >
                Sign In
              </MDBBtn>
              {/* Add the CSS styles here */}
            </form>
            {error && <p className="text-danger">{error}</p>}
          </div>
        </MDBCol>
        <MDBCol col="6" md="5">
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{
              background: "linear-gradient(to right, #ffffff, #ffffff)",
              height: "80vh",
              borderRadius: "0px",
              position: "relative",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                position: "absolute",
                top: "50px",
                left: "270px",
                width: "500px",
                height: "auto",
              }}
            />
            <h2 className="welcome">
              Welcome back!
            </h2>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
