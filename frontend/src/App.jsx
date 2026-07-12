import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Gateway from "./pages/Gateway";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";

import QAQCAndAuditing from "./pages/Services/QAQCAndAuditing";
import ProjectManagement from "./pages/Services/ProjectManagement";
import CostConsultancy from "./pages/Services/CostConsultancy";
import QSAndAuditing from "./pages/Services/QSAndAuditing";
import EHSAuditing from "./pages/Services/EHSAuditing";
import ProjectExecution from "./pages/Services/ProjectExecution";
import ProjectPlanning from "./pages/Services/ProjectPlanning";
import ServicesPage from "./pages/Services";
import Projects from "./pages/Projects";
import Careers from "./pages/Careers";
import ContractManagement from "./pages/Services/ContractManagement";
import EPC from "./pages/Services/EPC";
import BlogPage from "./pages/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";
import AdminPortal from "./pages/Admin/AdminPortal";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ChatbotWidget from "./components/ChatbotWidget";
import { CompanyProvider } from "./context/CompanyContext";

// Layout wrapper — wraps brand-specific pages with Navbar, Footer, and context.
// brand prop is passed explicitly ("pmc" or "epc") — no longer read from URL params.
const BrandLayout = ({ brand }) => (
  <CompanyProvider brand={brand}>
    <Navbar />
    <Outlet />
    <Footer />
    <ToastContainer position="top-right" autoClose={3000} theme="light" />
  </CompanyProvider>
);

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/mano-admin-portal-dashboard-secure') ||
                      location.pathname.startsWith('/admin') ||
                      location.pathname.startsWith('/admin-portal-dashboard-secure');

  return (
    <>
      <Routes>
        {/* Gateway as Root */}
        <Route path="/" element={<Gateway />} />

        {/* Admin Portal — isolated layout, no Navbar/Footer */}
        <Route path="/mano-admin-portal-dashboard-secure" element={<AdminPortal />} />
        <Route path="/mano-admin-portal-dashboard-secure/*" element={<AdminPortal />} />

        {/* Admin URL aliases — all redirect to the correct admin route */}
        <Route path="/admin" element={<Navigate to="/mano-admin-portal-dashboard-secure" replace />} />
        <Route path="/admin/*" element={<Navigate to="/mano-admin-portal-dashboard-secure" replace />} />
        <Route path="/admin-portal-dashboard-secure" element={<Navigate to="/mano-admin-portal-dashboard-secure" replace />} />
        <Route path="/admin-portal-dashboard-secure/*" element={<Navigate to="/mano-admin-portal-dashboard-secure" replace />} />

        {/* PMC Division — explicit fixed routes, no dynamic /:brand wildcard */}
        <Route path="/pmc" element={<BrandLayout brand="pmc" />}>
          <Route index element={<LandingPage />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/project-management" element={<ProjectManagement />} />
          <Route path="services/project-planning" element={<ProjectPlanning />} />
          <Route path="services/project-execution" element={<ProjectExecution />} />
          <Route path="services/cost-consultancy" element={<CostConsultancy />} />
          <Route path="services/contract-management" element={<ContractManagement />} />
          <Route path="services/qa-audit" element={<QAQCAndAuditing />} />
          <Route path="services/qs-billing-audit" element={<QSAndAuditing />} />
          <Route path="services/ehs-audit" element={<EHSAuditing />} />
          <Route path="services/epc" element={<EPC />} />
          <Route path="projects" element={<Projects />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetail />} />
        </Route>

        {/* EPC Division — explicit fixed routes, no dynamic /:brand wildcard */}
        <Route path="/epc" element={<BrandLayout brand="epc" />}>
          <Route index element={<LandingPage />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/project-management" element={<ProjectManagement />} />
          <Route path="services/project-planning" element={<ProjectPlanning />} />
          <Route path="services/project-execution" element={<ProjectExecution />} />
          <Route path="services/cost-consultancy" element={<CostConsultancy />} />
          <Route path="services/contract-management" element={<ContractManagement />} />
          <Route path="services/qa-audit" element={<QAQCAndAuditing />} />
          <Route path="services/qs-billing-audit" element={<QSAndAuditing />} />
          <Route path="services/ehs-audit" element={<EHSAuditing />} />
          <Route path="services/epc" element={<EPC />} />
          <Route path="projects" element={<Projects />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetail />} />
        </Route>

        {/* Catch-all redirect to Gateway */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdminPath && <ChatbotWidget />}
    </>
  );
}

export default App;
