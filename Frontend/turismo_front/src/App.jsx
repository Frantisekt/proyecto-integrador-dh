import Package from "./Components/pages/package/Package";
import Layout from "./Components/layout/Layout";
import Home from "./Components/pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<h1>Not Found 404</h1>} />
          <Route index element={<Home />} />
          {/* <Route path="travelPackage/:id" element={<Package />} /> */} 
          <Route path="travelPackage" element={<Package />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
