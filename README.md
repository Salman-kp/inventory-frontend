✅ Inventory Management System – Frontend (Machine Test)

This repository contains the Frontend implementation of the Inventory Management System developed as part of a Machine Test Assignment.
The frontend is built using React + Vite + TailwindCSS and connects to a Golang (Gin) backend.

🚀 Tech Stack

React (Vite)

TailwindCSS

Axios

React Router

📁 Folder Structure
inventory-frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── pages/
│   │   ├── ProductList.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── CreateProduct.jsx
│   │   ├── StockIn.jsx
│   │   ├── StockOut.jsx
│   │   └── StockReport.jsx
│   │
│   ├── App.js
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js

⚙️ Setup & Run
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend must be running on:

http://localhost:8080

🔗 API Endpoints Used
Method	Endpoint
POST	/api/products
GET	/api/products
POST	/api/stock/in
POST	/api/stock/out
GET	/api/stock/report
🧩 Features Implemented

Product Creation with Variants & Sub-Variants

Product Listing with Stock

Full Product Details View (on click)

Stock In (Purchase)

Stock Out (Sale)

Stock Report with Date Filter

🧪 How to Test

Create a Product

Copy Product UUID & Sub-Variant UUID

Perform Stock In

Perform Stock Out

View Stock Report
