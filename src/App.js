import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./Dashboard";
import OrdersManagement from "./OrdersManagement";
import ProductsManagement from "./ProductsManagement";

function App() {
  return (
    
    <BrowserRouter>
    <Navbar/>
          <Routes>
              <Route path="/" element={<Dashboard />} />
                <Route path="/productsmanagement" element={<ProductsManagement />} />
                <Route
                    path="/ordersmanagement"
                    element={<OrdersManagement />}
                />
                
            </Routes>
        </BrowserRouter>

  );
}

export default App;
