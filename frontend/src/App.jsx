import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CustomerSummary from "./pages/Customer/Summary";
import { ThemeProvider } from "./context/ThemeContext";
import { LockProvider } from "./context/LockContext";
import { ToastProvider } from "./context/ToastProvider";
import CustomerAdd from "./pages/Customer/Add";
import CustomerShow from "./pages/Customer/Show";
import Settings from "./pages/Settings";

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
                  </Routes>
                </Layout>
          </BrowserRouter>
        </LockProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
