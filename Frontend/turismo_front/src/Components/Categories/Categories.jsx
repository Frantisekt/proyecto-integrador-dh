import styles from './Categories.module.css';
import TravelCard from '../TravelCard/TravelCard';

const categoriesData = [
  {
    id: 1,
    title: 'Paquete VIP',
    price: 149.00,
    imageUrl: '/path-to-vip-image.jpg',
    href: '/packages/vip',
  },
  {
    id: 2,
    title: 'Paquete económico',
    price: 99.00,
    imageUrl: '/path-to-economic-image.jpg',
    href: '/packages/economic',
  },
  {
    id: 3,
    title: 'Paquete Business',
    price: 89.00,
    imageUrl: '/path-to-business-image.jpg',
    href: '/packages/business',
  },
  {
    id: 4,
    title: 'Paquete romántico',
    price: 89.00,
    imageUrl: '/path-to-romantic-image.jpg',
    href: '/packages/romantic',
  },
  {
    id: 5,
    title: 'Tours',
    price: 109.00,
    imageUrl: '/path-to-tours-image.jpg',
    href: '/tours',
  },
];

const Categories = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <span className={styles.subtitle}>CATEGORIES</span>
        <h2 className={styles.title}>Categorías</h2>
      </div>
      
      <div className={styles.grid}>
        {categoriesData.map((category) => (
          <TravelCard
            key={category.id}
            {...category}
            className={styles[`card${category.id}`]}
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;