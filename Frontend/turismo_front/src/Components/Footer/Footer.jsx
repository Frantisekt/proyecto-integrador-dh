import style from './Footer.module.css';

const Footer = () => {
  return (
    <div className={style.footerWrapper}>
      <div className={style.logo}>
        <img src="src/assets/Logo_Final.png" alt="Globe On Click" />
      </div>
      <footer className={style.footer}>
        <p className={style.copyright}>Copyright © 2025 Globe On Click</p>
      </footer>
    </div>
  );
}

export default Footer;
