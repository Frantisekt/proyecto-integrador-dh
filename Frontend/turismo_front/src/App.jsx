import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Package from "./Components/pages/package/Package";
import Layout from "./Components/layout/Layout";
import Home from "./Components/pages/home/Home";
import Footer from "./Components/Footer/Footer";
import AdminPanel from "./Components/pages/admin/AdminPanel";
import LoginComponent from "./Components/auth/LoginComponent.jsx";
import AdminLoginComponent from "./Components/auth/AdminLoginComponent.jsx";
import AdminPage from "./Components/pages/adminPanel/AdminPage.jsx";
import UserManagement from "./Components/pages/userManagement/UserManagement.jsx";
import CategoryManagement from "./Components/pages/categoryManagement/CategoryManagement.jsx";
import UserRegistry from "./Components/pages/userRegistry/UserRegistry.jsx";
import UserList from "./Components/pages/userList/UserList.jsx";
import EditUser from "./Components/pages/editUser/EditUser.jsx"; 
import CategoryRegistry from "./Components/pages/CategoryRegistry/CategoryRegistry.jsx";
import CategoryList from "./Components/pages/categoryList/CategoryList.jsx";
import EditCategory from "./Components/pages/editCategory/EditCategory.jsx";
import CategoryTours from "./Components/pages/CategoryTours/CategoryTours.jsx";
import ProtectedRoute from "./Components/auth/ProtectedRoute.jsx";
import Products from "./Components/pages/Product/Product.jsx";
import Favorites from "./Components/pages/Favorites/Favorites.jsx";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy.jsx";
import SearchResults from "./Components/pages/SearchResuts/SearchResults.jsx";

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();
  
  // Rutas en las que NO queremos mostrar el footer
  const noFooterRoutes = [
    "/admin/packages",
    "/admin",
    "/admin/login",
    "/admin/users",
    "/admin/categories",
    "/admin/users/register",
    "/admin/users/list",
    "/admin/users/edit/:id",
    "/admin/categories/add",
    "/admin/categories/list",
    "/admin/categories/edit/:id"
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<h1>Not Found 404</h1>} />
          <Route index element={<Home />} />
          <Route path="travelPackage" element={<Package />} />
          <Route path="/packages/:categoryId" element={<CategoryTours />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tour/:id" element={<Package />} />
          <Route path="admin/login" element={<AdminLoginComponent />} />
          <Route path="auth" element={<LoginComponent />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/search-results" element={<SearchResults />} />

          
          {/* Rutas protegidas de administrador */}
          <Route path="admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          <Route path="admin/packages" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="admin/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          <Route path="admin/categories" element={<ProtectedRoute><CategoryManagement /></ProtectedRoute>} />
          <Route path="admin/users/register" element={<ProtectedRoute><UserRegistry /></ProtectedRoute>} />
          <Route path="admin/users/list" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="admin/users/edit/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
          <Route path="admin/categories/add" element={<ProtectedRoute><CategoryRegistry /></ProtectedRoute>} />
          <Route path="admin/categories/list" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
          <Route path="admin/categories/edit/:id" element={<ProtectedRoute><EditCategory /></ProtectedRoute>} />
        </Route>
      </Routes>
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
