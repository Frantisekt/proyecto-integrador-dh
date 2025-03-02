import Package from "./Components/pages/package/Package";
import Layout from "./Components/layout/Layout";
import Home from "./Components/pages/home/Home";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./Components/pages/admin/AdminPanel";
import LoginComponent from "./Components/auth/LoginComponent.jsx";
import AdminLoginComponent from "./Components/auth/AdminLoginComponent.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<h1>Not Found 404</h1>} />
          <Route index element={<Home />} />
          <Route path="travelPackage" element={<Package />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="auth" element={<LoginComponent />} />
          <Route path="administrador" element={<AdminLoginComponent />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
