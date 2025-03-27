import { Link } from "react-router-dom";
import style from './Footer.module.css';
import logo from '../../assets/Logo_Final.png';

const Footer = () => {
  return (
    <div className={style.footerWrapper}>
      <div className={style.logo}>
        <img src={logo} alt="Globe On Click" />
      </div>
      <footer className={style.footer}>
        <p className={style.copyright}>Copyright © 2025 Globe On Click</p>
        <Link to="/PrivacyPolicy" className={style.privacyLink}>
          Políticas de Privacidad
        </Link>
      </footer>
    </div>
  );
}

export default Footer;
