import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import StockReport from "./pages/StockReport";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-900 text-white p-4 flex gap-6">
        <Link to="/">Products</Link>
        <Link to="/create">Create</Link>
        <Link to="/stock-in">Stock In</Link>
        <Link to="/stock-out">Stock Out</Link>
        <Link to="/report">Report</Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/stock-in" element={<StockIn />} />
          <Route path="/stock-out" element={<StockOut />} />
          <Route path="/report" element={<StockReport />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
