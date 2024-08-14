import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await axios.post('http://localhost:3000/api/auth/logout', {}, {
                    withCredentials: true // Ensure cookies are sent
                });

                // Clear tokens from cookies
                document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                navigate('/login');
            } catch (err) {
                console.error('Error logging out:', err);
            }
        };

        performLogout();
    }, [navigate]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
}

export default Logout;