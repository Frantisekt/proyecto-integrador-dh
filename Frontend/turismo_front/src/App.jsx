import Package from "./Components/pages/package/Package";
import Layout from "./Components/layout/Layout";
import Home from "./Components/pages/home/Home";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./Components/pages/admin/AdminPanel";
import LoginComponent from "./Components/auth/LoginComponent.jsx";
import AdminPage from "./Components/pages/adminPanel/AdminPage.jsx";
import UserManagement from "./Components/pages/userManagement/UserManagement.jsx";
import CategoryManagement from "./Components/pages/categoryManagement/CategoryManagement.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<h1>Not Found 404</h1>} />
          <Route index element={<Home />} />
          <Route path="travelPackage" element={<Package />} />
          <Route path="admin/packages" element={<AdminPanel />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/categories" element={<CategoryManagement />} />
          <Route path="auth" element={<LoginComponent />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
