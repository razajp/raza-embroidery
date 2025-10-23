import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import { LockProvider } from "./context/LockContext";
import { ToastProvider } from "./context/ToastProvider";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import CustomerSummary from "./pages/Customer/Summary";
import CustomerAdd from "./pages/Customer/Add";
import CustomerShow from "./pages/Customer/Show";
import SupplierSummary from "./pages/Supplier/Summary";
import SupplierAdd from "./pages/Supplier/Add";
import SupplierShow from "./pages/Supplier/Show";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <LockProvider>
          <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />}  />
                    <Route path="/home" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/customers" element={<Navigate to="/customers/summary" replace />} />
                    <Route path="/customers/summary" element={<CustomerSummary />} />
                    <Route path="/customers/add" element={<CustomerAdd />} />
                    <Route path="/customers/show" element={<CustomerShow />} />
                    <Route path="/suppliers" element={<Navigate to="/suppliers/summary" replace />} />
                    <Route path="/suppliers/summary" element={<SupplierSummary />} />
                    <Route path="/suppliers/add" element={<SupplierAdd />} />
                    <Route path="/suppliers/show" element={<SupplierShow />} />
                  </Routes>
                </Layout>
          </BrowserRouter>
        </LockProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
