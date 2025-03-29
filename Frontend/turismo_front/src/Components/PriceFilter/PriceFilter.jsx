import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TourCard from '../TourCard/TourCard';
import styles from './PriceFilter.module.css';
import { authService } from '../services/authService';

const SORT_OPTIONS = {
  PRICE_LOW: "price_asc",
  PRICE_HIGH: "price_desc",
  NAME_ASC: "name_asc",
  NAME_DESC: "name_desc",
};

const PriceFilter = () => {
    const [priceRanges, setPriceRanges] = useState([]);
    const [selectedRanges, setSelectedRanges] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState(SORT_OPTIONS.PRICE_LOW);

    // Función para obtener los headers de autenticación
    const getHeaders = () => {
        const headers = {
            'Content-Type': 'application/json',
            ...authService.getAuthHeader()
        };
        return headers;
    };

    // Cargar los rangos de precios predefinidos
    useEffect(() => {
        const defaultRanges = [
            { id: 1, minPrice: 0, maxPrice: 1000, label: 'Hasta $1,000' },
            { id: 2, minPrice: 1001, maxPrice: 5000, label: '$1,001 - $5,000' },
            { id: 3, minPrice: 5001, maxPrice: 10000, label: '$5,001 - $10,000' },
            { id: 4, minPrice: 10001, maxPrice: Infinity, label: 'Más de $10,000' }
        ];
        setPriceRanges(defaultRanges);
        setLoading(false);
    }, []);

    // Buscar paquetes cuando cambian los rangos seleccionados
    useEffect(() => {
        const fetchPackages = async () => {
            if (selectedRanges.length === 0) {
                setFilteredPackages([]);
                return;
            }

            setLoading(true);
            try {
                // Encontrar el rango mínimo y máximo seleccionado
                const minPrice = Math.min(...selectedRanges.map(range => range.minPrice));
                const maxPrice = Math.max(...selectedRanges.map(range => range.maxPrice));

                const response = await axios.post('/api/price-ranges/search', 
                    {
                        minPrice: minPrice,
                        maxPrice: maxPrice === Infinity ? Number.MAX_SAFE_INTEGER : maxPrice,
                        page: 0,
                        size: 50
                    },
                    {
                        headers: getHeaders()
                    }
                );

                let packages = response.data;
                packages = sortPackages(packages, sortBy);
                
                setFilteredPackages(packages);
            } catch (err) {
                console.error('Error al cargar los paquetes:', err);
                setError('No se pudieron cargar los paquetes. Por favor, intenta de nuevo.');
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [selectedRanges, sortBy]);

    const sortPackages = (packages, sortOption) => {
        if (!Array.isArray(packages)) {
            console.warn('Los paquetes no son un array:', packages);
            return [];
        }

        const sorted = [...packages];
        switch (sortOption) {
            case SORT_OPTIONS.PRICE_LOW:
                return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
            case SORT_OPTIONS.PRICE_HIGH:
                return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
            case SORT_OPTIONS.NAME_ASC:
                return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
            case SORT_OPTIONS.NAME_DESC:
                return sorted.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
            default:
                return sorted;
        }
    };

    const handleRangeSelect = (range) => {
        setSelectedRanges(prev => {
            const isSelected = prev.some(r => r.id === range.id);
            return isSelected 
                ? prev.filter(r => r.id !== range.id)
                : [...prev, range];
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.filterSection}>
                <div className={styles.filterHeader}>
                    <h3 className={styles.filterTitle}>Filtrar por precio</h3>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.sortSelect}
                    >
                        <option value={SORT_OPTIONS.PRICE_LOW}>Precio: Menor a Mayor</option>
                        <option value={SORT_OPTIONS.PRICE_HIGH}>Precio: Mayor a Menor</option>
                        <option value={SORT_OPTIONS.NAME_ASC}>Nombre: A-Z</option>
                        <option value={SORT_OPTIONS.NAME_DESC}>Nombre: Z-A</option>
                    </select>
                </div>

                <div className={styles.rangeCheckboxes}>
                    {priceRanges.map(range => (
                        <label 
                            key={range.id} 
                            className={`${styles.rangeLabel} ${
                                selectedRanges.some(r => r.id === range.id) ? styles.selected : ''
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={selectedRanges.some(r => r.id === range.id)}
                                onChange={() => handleRangeSelect(range)}
                                className={styles.rangeCheckbox}
                            />
                            <span className={styles.rangeLabelText}>
                                {range.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.packagesSection}>
                {loading ? (
                    <div className={styles.loading}>Cargando paquetes...</div>
                ) : error ? (
                    <div className={styles.error}>
                        {error}
                        <button 
                            onClick={() => {
                                setError(null);
                                if (selectedRanges.length > 0) {
                                    fetchPackages();
                                }
                            }}
                            className={styles.retryButton}
                        >
                            Intentar de nuevo
                        </button>
                    </div>
                ) : filteredPackages.length === 0 ? (
                    <div className={styles.noResults}>
                        {selectedRanges.length === 0 
                            ? 'Selecciona un rango de precios para ver los paquetes'
                            : 'No hay paquetes disponibles en este rango de precios'}
                    </div>
                ) : (
                    <div className={styles.packagesGrid}>
                        {filteredPackages.map(pkg => (
                            <TourCard
                                key={pkg.packageId}
                                packageId={pkg.packageId}
                                title={pkg.title}
                                imageUrl={pkg.mediaPackages?.[0]?.mediaUrl || "https://via.placeholder.com/150"}
                                description={pkg.description}
                                price={pkg.price}
                                link={`/tour/${pkg.packageId}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PriceFilter;