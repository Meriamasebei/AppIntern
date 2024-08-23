import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard'; 
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from './pages/GlobalContex';


function App() {
  return (
    <GlobalProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} /> 
          </Route>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
