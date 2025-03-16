import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const adminData = authService.getAdminData();
                
                if (!adminData || !adminData.token) {
                    setIsAuthorized(false);
                    return;
                }

                // Verificar que sea un admin
                if (adminData.role !== 'ADMIN') {
                    setIsAuthorized(false);
                    authService.adminLogout(); // Limpiar datos si el rol no es correcto
                    return;
                }

                setIsAuthorized(true);
            } catch (error) {
                console.error('Error verificando autenticación:', error);
                setIsAuthorized(false);
                authService.adminLogout();
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>; // O tu componente de loading
    }

    if (!isAuthorized) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute; 