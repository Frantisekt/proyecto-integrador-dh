import styles from "./TravelCard.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; 

const TravelCard = ({ title, price, imageUrl, href, className }) => {
  return (
    <Link to={href} className={`${styles.card} ${className || ""}`}>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className={styles.image}
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.priceText}>Price starts from</p>
          <div className={styles.priceContainer}>
            <span className={styles.currency}>USD</span>
            <span className={styles.amount}>{price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

TravelCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TravelCard;
