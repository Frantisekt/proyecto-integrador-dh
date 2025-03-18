import React, { useEffect } from "react";
import styles from "./PrivacyPolicy.module.css";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        };
    
        if (document.readyState === "complete") {
            scrollToTop();
        } else {
            window.onload = scrollToTop;
        }
    }, []);
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Política de Privacidad de Globe On Click</h1>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>1. Introducción</h2>
                <p>
                    En <strong>Globe On Click</strong>, nos comprometemos a proteger tu privacidad. 
                    Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestros servicios.
                </p>
                <p>Al acceder a nuestra plataforma y utilizar nuestros servicios, aceptas los términos descritos en esta política.</p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>2. Información que Recopilamos</h2>
                <p>Recopilamos diferentes tipos de información para ofrecerte una mejor experiencia en nuestro sitio web.</p>

                <h3 className={styles.subTitle}>a) Información Personal</h3>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Nombre completo</li>
                    <li className={styles.listItem}>Dirección de correo electrónico</li>
                    <li className={styles.listItem}>Número de teléfono</li>
                    <li className={styles.listItem}>Información de pago y facturación</li>
                    <li className={styles.listItem}>Datos de reservas de paquetes turísticos</li>
                </ul>

                <h3 className={styles.subTitle}>b) Información de Uso y Navegación</h3>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Dirección IP</li>
                    <li className={styles.listItem}>Tipo de navegador y dispositivo</li>
                    <li className={styles.listItem}>Páginas visitadas</li>
                    <li className={styles.listItem}>Tiempo de permanencia en el sitio</li>
                    <li className={styles.listItem}>Datos de ubicación (si se permite)</li>
                </ul>

                <h3 className={styles.subTitle}>c) Cookies y Tecnologías Similares</h3>
                <p>Utilizamos cookies y tecnologías de seguimiento para mejorar tu experiencia de usuario y ofrecerte contenido relevante. 
                    Puedes administrar las cookies desde la configuración de tu navegador.</p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>3. Uso de la Información</h2>
                <p>Usamos la información recopilada para los siguientes fines:</p>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Gestionar tus reservas y compras</li>
                    <li className={styles.listItem}>Mejorar nuestros servicios y la experiencia del usuario</li>
                    <li className={styles.listItem}>Enviar notificaciones sobre actualizaciones y promociones</li>
                    <li className={styles.listItem}>Personalizar el contenido que ves en nuestra plataforma</li>
                    <li className={styles.listItem}>Garantizar la seguridad y prevenir fraudes</li>
                    <li className={styles.listItem}>Cumplir con nuestras obligaciones legales</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>4. Protección de la Información</h2>
                <p>Implementamos medidas de seguridad para proteger tu información personal, como:</p>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Cifrado de datos</li>
                    <li className={styles.listItem}>Acceso restringido a la información</li>
                    <li className={styles.listItem}>Monitoreo constante para detectar amenazas de seguridad</li>
                </ul>
                <p>Aunque tomamos medidas para proteger tu información, recuerda que ningún sistema es completamente seguro.</p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>5. Compartición de Información con Terceros</h2>
                <p>No vendemos ni alquilamos tu información personal. Sin embargo, podemos compartir ciertos datos con terceros en los siguientes casos:</p>
                <ul className={styles.list}>
                    <li className={styles.listItem}><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a procesar pagos, gestionar reservas y ofrecer soporte.</li>
                    <li className={styles.listItem}><strong>Obligaciones legales:</strong> Si es necesario por ley o en respuesta a una solicitud gubernamental.</li>
                    <li className={styles.listItem}><strong>Prevención de fraudes:</strong> Para proteger los derechos y la seguridad de nuestros usuarios y nuestra empresa.</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>6. Tus Derechos y Opciones</h2>
                <p>Tienes derecho a:</p>
                <ul className={styles.list}>
                    <li className={styles.listItem}> Acceder a tu información personal</li>
                    <li className={styles.listItem}> Solicitar la corrección de datos incorrectos</li>
                    <li className={styles.listItem}> Eliminar tu información cuando ya no sea necesaria</li>
                    <li className={styles.listItem}> Gestionar la recepción de correos y notificaciones</li>
                </ul>
                <p>Para ejercer estos derechos, puedes contactarnos a través de nuestro soporte.</p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>7. Cambios en la Política de Privacidad</h2>
                <p>Nos reservamos el derecho de modificar esta política en cualquier momento. 
                    Te notificaremos sobre cambios importantes a través de nuestro sitio web o por correo electrónico.</p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>8. Contacto</h2>
                <p>Si tienes preguntas sobre nuestra política de privacidad, puedes escribirnos a:</p>
                <p className={styles.email}>📩 <strong>Correo:</strong> soporte@globeonclick.com</p>
            </section>

            <div className={styles.buttonContainer}>
                <button onClick={() => navigate("/")} className={styles.button}>Volver al Inicio</button>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
