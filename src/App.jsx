import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import StockReport from "./pages/StockReport";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 flex items-center justify-between shadow-lg">
        <h1 className="text-xl font-bold text-teal-400">Inventory System</h1>
        <div className="flex gap-6 font-medium">
          <Link className="hover:text-teal-400 transition" to="/">Products</Link>
          <Link className="hover:text-teal-400 transition" to="/create">Create</Link>
          <Link className="hover:text-teal-400 transition" to="/stock-in">Stock In</Link>
          <Link className="hover:text-teal-400 transition" to="/stock-out">Stock Out</Link>
          <Link className="hover:text-teal-400 transition" to="/report">Report</Link>
        </div>
      </nav>

      <div className="p-8 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/stock-in" element={<StockIn />} />
          <Route path="/stock-out" element={<StockOut />} />
          <Route path="/report" element={<StockReport />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
