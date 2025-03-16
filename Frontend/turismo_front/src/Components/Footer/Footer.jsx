import style from './Footer.module.css'
import logo from "../../assets/Logo_Final.png";

const Footer = () => {
  return (
    <div className={style.footerWrapper}>
      <div className={style.logo}>
        <img src={logo || "/placeholder.svg"} alt="Globe on Click" className={style.logo} />
      </div>
      <footer className={style.footer}>
        <p className={style.copyright}>Copyright © 2025 Globe On Click</p>
      </footer>
    </div>
  );
}

export default Footer;
