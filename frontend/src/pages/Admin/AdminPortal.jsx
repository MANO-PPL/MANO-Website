import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminPortal = () => {
    const [token, setToken] = useState(localStorage.getItem('mano_admin_token') || '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('mano_admin_token', token);
        } else {
            localStorage.removeItem('mano_admin_token');
        }
    }, [token]);

    const handleLogin = (authToken) => {
        setToken(authToken);
    };

    const handleLogout = () => {
        setToken('');
    };

    return (
        <div className="admin-portal-root min-h-[117.65vh] bg-[#0d1117] text-[#e6edf3] font-sans selection:bg-[#1f6feb] selection:text-white overflow-x-hidden antialiased" style={{ zoom: '85%' }}>
            {token ? (
                <AdminDashboard token={token} onLogout={handleLogout} />
            ) : (
                <AdminLogin onLogin={handleLogin} />
            )}
        </div>
    );
};

export default AdminPortal;
