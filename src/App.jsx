import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Gateway from "./pages/Gateway";
import LandingPage from "./pages/LandingPage"
import AboutUs from "./pages/AboutUs"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import QAQCAndAuditing from "./pages/Services/QAQCAndAuditing"
import ProjectManagement from "./pages/Services/ProjectManagement"
import CostConsultancy from "./pages/Services/CostConsultancy"

import QSAndAuditing from "./pages/Services/QSAndAuditing"
import EHSAuditing from "./pages/Services/EHSAuditing"
import ProjectExecution from "./pages/Services/ProjectExecution"
import ProjectPlanning from "./pages/Services/ProjectPlanning"
import ServicesPage from "./pages/Services"
import Projects from "./pages/Projects"
import Careers from "./pages/Careers"
import ContractManagement from './pages/Services/ContractManagement';
import EPC from './pages/Services/EPC';
import BlogPage from "./pages/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ChatbotWidget from "./components/ChatbotWidget";
import { CompanyProvider } from "./context/CompanyContext";

// Wrapper for Brand Routes
const BrandLayout = () => {
  return (
    <CompanyProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </CompanyProvider>
  );
};

function App() {
  return (
    <>
      <Routes>
        {/* Gateway as Root */}
        <Route path="/" element={<Gateway />} />

        {/* Dynamic Brand Parameter: :brand will be "pcpl" or "ppl" */}
        <Route path="/:brand" element={<BrandLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/qa-audit" element={<QAQCAndAuditing />} />
          <Route path="services/project-management" element={<ProjectManagement />} />
          <Route path="services/cost-consultancy" element={<CostConsultancy />} />

          <Route path="services/qs-billing-audit" element={<QSAndAuditing />} />
          <Route path="services/ehs-audit" element={<EHSAuditing />} />
          <Route path="services/contract-management" element={<ContractManagement />} />
          <Route path="services/epc" element={<EPC />} />

          <Route path="services/project-execution" element={<ProjectExecution />} />
          <Route path="services/project-planning" element={<ProjectPlanning />} />
          <Route path="projects" element={<Projects />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetail />} />
        </Route>

        {/* Catch-all redirect to Gateway */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatbotWidget />
    </>
  )
}

export default App
