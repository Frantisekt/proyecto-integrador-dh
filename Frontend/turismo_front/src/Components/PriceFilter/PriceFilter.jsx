import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TourCard from '../TourCard/TourCard';
import styles from './PriceFilter.module.css';

const SORT_OPTIONS = {
    PRICE_LOW: 'price_asc',
    PRICE_HIGH: 'price_desc',
    NAME_ASC: 'name_asc',
    NAME_DESC: 'name_desc'
};

const PriceFilter = () => {
    const [priceRanges, setPriceRanges] = useState([]);
    const [selectedRanges, setSelectedRanges] = useState(() => {
        const saved = localStorage.getItem('selectedPriceRanges');
        return saved ? JSON.parse(saved) : [];
    });
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState(() => {
        return localStorage.getItem('packageSortPreference') || SORT_OPTIONS.PRICE_LOW;
    });
    const [isAnimating, setIsAnimating] = useState(false);

    // Cargar los rangos de precios al montar el componente
    useEffect(() => {
        const fetchPriceRanges = async () => {
            try {
                const response = await axios.get('/api/price-ranges');
                setPriceRanges(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los rangos de precios');
                console.error('Error:', err);
                setLoading(false);
            }
        };
        fetchPriceRanges();
    }, []);

    // Guardar preferencias en localStorage
    useEffect(() => {
        localStorage.setItem('selectedPriceRanges', JSON.stringify(selectedRanges));
        localStorage.setItem('packageSortPreference', sortBy);
    }, [selectedRanges, sortBy]);

    // Buscar paquetes cuando cambian los rangos seleccionados o el ordenamiento
    useEffect(() => {
        const fetchPackages = async () => {
            if (selectedRanges.length === 0) {
                setFilteredPackages([]);
                return;
            }

            setLoading(true);
            setIsAnimating(true);
            try {
                // Obtener todos los IDs de paquetes de los rangos seleccionados
                const packageIds = selectedRanges.reduce((ids, range) => {
                    if (range.packageIds) {
                        return [...ids, ...range.packageIds];
                    }
                    return ids;
                }, []);
                
                if (packageIds.length === 0) {
                    setFilteredPackages([]);
                    setLoading(false);
                    setIsAnimating(false);
                    return;
                }

                // Encontrar el rango mínimo y máximo seleccionado
                const minPrice = Math.min(...selectedRanges.map(range => range.minPrice));
                const maxPrice = Math.max(...selectedRanges.map(range => range.maxPrice));

                const response = await axios.post('/api/price-ranges/search', {
                    minPrice,
                    maxPrice
                });

                let packages = Array.isArray(response.data) ? response.data : [];
                packages = sortPackages(packages, sortBy);
                
                setFilteredPackages(packages);
            } catch (err) {
                setError('Error al cargar los paquetes');
                console.error('Error:', err);
            } finally {
                setLoading(false);
                setTimeout(() => setIsAnimating(false), 300);
            }
        };

        fetchPackages();
    }, [selectedRanges, sortBy]);

    const sortPackages = (packages, sortOption) => {
        if (!Array.isArray(packages)) {
            console.warn('packages no es un array:', packages);
            return [];
        }

        const sorted = [...packages];
        switch (sortOption) {
            case SORT_OPTIONS.PRICE_LOW:
                return sorted.sort((a, b) => a.price - b.price);
            case SORT_OPTIONS.PRICE_HIGH:
                return sorted.sort((a, b) => b.price - a.price);
            case SORT_OPTIONS.NAME_ASC:
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case SORT_OPTIONS.NAME_DESC:
                return sorted.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return sorted;
        }
    };

    const handleRangeSelect = (range) => {
        setSelectedRanges(prev => {
            const isSelected = prev.some(r => r.id === range.id);
            if (isSelected) {
                return prev.filter(r => r.id !== range.id);
            } else {
                return [...prev, range];
            }
        });
    };

    const handleClearFilters = () => {
        setSelectedRanges([]);
        setSortBy(SORT_OPTIONS.PRICE_LOW);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.filterSection}>
                <div className={styles.filterHeader}>
                    <h3 className={styles.filterTitle}>Filtrar por rango de precio</h3>
                    <div className={styles.filterControls}>
                        <select 
                            value={sortBy} 
                            onChange={handleSortChange}
                            className={styles.sortSelect}
                        >
                            <option value={SORT_OPTIONS.PRICE_LOW}>Precio: Menor a Mayor</option>
                            <option value={SORT_OPTIONS.PRICE_HIGH}>Precio: Mayor a Menor</option>
                            <option value={SORT_OPTIONS.NAME_ASC}>Nombre: A-Z</option>
                            <option value={SORT_OPTIONS.NAME_DESC}>Nombre: Z-A</option>
                        </select>
                        <button 
                            onClick={handleClearFilters}
                            className={styles.clearButton}
                            disabled={selectedRanges.length === 0}
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </div>
                <div className={styles.rangeCheckboxes}>
                    {priceRanges.map(range => (
                        <label key={range.id} className={`${styles.rangeLabel} ${selectedRanges.some(r => r.id === range.id) ? styles.selected : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedRanges.some(r => r.id === range.id)}
                                onChange={() => handleRangeSelect(range)}
                                className={styles.rangeCheckbox}
                            />
                            <span className={styles.rangeLabelText}>
                                ${range.minPrice.toLocaleString()} - ${range.maxPrice === 1.7976931348623157E308 ? '∞' : range.maxPrice.toLocaleString()}
                                <span className={styles.packageCount}>
                                    ({range.packageCount} {range.packageCount === 1 ? 'paquete' : 'paquetes'})
                                </span>
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.packagesSection}>
                {loading ? (
                    <div className={styles.loading}>Cargando paquetes...</div>
                ) : filteredPackages.length === 0 ? (
                    <div className={styles.noResults}>
                        {selectedRanges.length === 0 
                            ? 'Selecciona un rango de precios para ver los paquetes disponibles'
                            : 'No se encontraron paquetes en los rangos seleccionados'}
                    </div>
                ) : (
                    <div className={`${styles.packagesGrid} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
                        {filteredPackages.map(pkg => (
                            <TourCard
                                key={pkg.packageId}
                                packageId={pkg.packageId}
                                title={pkg.title}
                                imageUrl={pkg.mediaPackages?.[0]?.mediaUrl || "https://via.placeholder.com/150"}
                                description={pkg.description}
                                currency={`$${pkg.price.toLocaleString()}`}
                                link={`/tour/${pkg.packageId}`}
                                type={pkg.featured ? "featured" : "standard"}
                                initialIsFavorite={pkg.isFavorite}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PriceFilter; 