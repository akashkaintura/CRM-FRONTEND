import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, redirectPath = '/login' }) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} />;
    }

    return <Outlet />;  // Renders the nested route content
};

export default ProtectedRoute;
