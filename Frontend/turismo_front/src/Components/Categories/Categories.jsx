import styles from './Categories.module.css';
import TravelCard from '../TravelCard/TravelCard';

const categoriesData = [
  {
    id: 1,
    title: 'Paquete VIP',
    price: 149.00,
    imageUrl: 'https://places2explore.wordpress.com/wp-content/uploads/2011/06/brussels-gp-hdr-01.jpg?w=900&h=597',
    href: '/packages/vip',
  },
  {
    id: 2,
    title: 'Paquete económico',
    price: 99.00,
    imageUrl: 'https://i.pinimg.com/736x/4e/d0/e0/4ed0e0de1ef9bd790c28027baf46c0b7.jpg',
    href: '/packages/economic',
  },
  {
    id: 3,
    title: 'Paquete Business',
    price: 89.00,
    imageUrl: 'https://i.pinimg.com/736x/df/f8/a9/dff8a9cb71a0e89d88eae5874f67997b.jpg',
    href: '/packages/business',
  },
  {
    id: 4,
    title: 'Paquete romántico',
    price: 89.00,
    imageUrl: 'https://i.pinimg.com/736x/be/e4/d2/bee4d274242e6abfce5c11119ce090ac.jpg',
    href: '/packages/romantic',
  },
  {
    id: 5,
    title: 'Tours',
    price: 109.00,
    imageUrl: 'https://i.pinimg.com/736x/6b/8b/05/6b8b0507d4a0ada68150631eff6d4e85.jpg',
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