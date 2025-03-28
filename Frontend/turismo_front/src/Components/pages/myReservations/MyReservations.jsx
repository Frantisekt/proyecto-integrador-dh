import { useState, useEffect } from 'react';
import { reservationService } from '../../services/reservationService';
import { authService } from '../../services/authService';
import Swal from 'sweetalert2';
import styles from './MyReservations.module.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const MyReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, confirmed, completed
    const [sortBy, setSortBy] = useState('date'); // date, price
    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const userData = authService.getCurrentUser();
            const data = await reservationService.getUserReservations(userData.userId);
            setReservations(data);
            calculateTotalSpent(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
            Swal.fire('Error', 'No se pudieron cargar las reservaciones', 'error');
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalSpent = (reservations) => {
        const total = reservations.reduce((acc, res) => acc + (res.totalAmount || 0), 0);
        setTotalSpent(total);
    };

    const handleCancelReservation = async (reservationId) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, cancelar reserva',
                cancelButtonText: 'No, mantener reserva'
            });

            if (result.isConfirmed) {
                await reservationService.deleteReservation(reservationId);
                await fetchReservations(); // Recargar la lista
                Swal.fire('Cancelada', 'La reserva ha sido cancelada', 'success');
            }
        } catch (error) {
            console.error('Error canceling reservation:', error);
            Swal.fire('Error', 'No se pudo cancelar la reserva', 'error');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return styles.statusPending;
            case 'CONFIRMED': return styles.statusConfirmed;
            case 'COMPLETED': return styles.statusCompleted;
            case 'CANCELLED': return styles.statusCancelled;
            default: return '';
        }
    };

    if (loading) return <div className={styles.loading}>Cargando...</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Mis Reservas</h2>
            
            <div className={styles.summary}>
                <div className={styles.summaryItem}>
                    <span>Total gastado:</span>
                    <strong>${totalSpent.toFixed(2)}</strong>
                </div>
                <div className={styles.summaryItem}>
                    <span>Total reservas:</span>
                    <strong>{reservations.length}</strong>
                </div>
            </div>

            <div className={styles.filters}>
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="all">Todas</option>
                    <option value="pending">Pendientes</option>
                    <option value="confirmed">Confirmadas</option>
                    <option value="completed">Completadas</option>
                </select>

                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="date">Ordenar por fecha</option>
                    <option value="price">Ordenar por precio</option>
                </select>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.reservationsTable}>
                    <thead>
                        <tr>
                            <th>Paquete</th>
                            <th>Huéspedes</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation.reservationId}>
                                <td>{reservation.packageTitle}</td>
                                <td>
                                    {reservation.numberOfAdults} adultos, 
                                    {reservation.numberOfChildren} niños, 
                                    {reservation.numberOfInfants} infantes
                                </td>
                                <td>${reservation.totalAmount}</td>
                                <td>
                                    <span className={getStatusColor(reservation.confirmationStatus)}>
                                        {reservation.confirmationStatus}
                                    </span>
                                </td>
                                <td className={styles.actions}>
                                    <button 
                                        onClick={() => handleCancelReservation(reservation.reservationId)}
                                        className={styles.cancelButton}
                                    >
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReservations;
