import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard'; 
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/RestPassword';
import VerifyOTP from './components/VerifyOTP';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from './components/Spinner';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard/*" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} /> 
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
