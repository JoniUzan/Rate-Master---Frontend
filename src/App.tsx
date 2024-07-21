import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/self-made/Header";
import Footer from "./components/self-made/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/Contact";
import AuthLayout from "./components/self-made/AuthLayout";
import MainLayout from "./components/self-made/MainLayout";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route  path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/PricacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<Home />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

      </Routes>
      
    </>
  )
}

export default App