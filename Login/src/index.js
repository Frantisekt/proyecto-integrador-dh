import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.scss";

const root = document.getElementById('app');
if (root) {
    ReactDOM.createRoot(root).render(<App />);
} else {
    console.error("El contenedor 'root' no se encuentra en el HTML.");
}
