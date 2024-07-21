import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/Contact";
import AuthLayout from "./components/self-made/AuthLayout";
import MainLayout from "./components/self-made/MainLayout";
import { useAuth } from "./context/userProvider";
import Business from "./pages/Business";

function App() {
  // home, login ,register
  function RequireUnAuth({ children }: { children: React.ReactNode }) {
    const { loggedInUser } = useAuth();

    if (loggedInUser === undefined) {
      return null;
    }

    if (loggedInUser !== null) {
      return <Navigate to="/Business" replace />;
    }

    return children;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/PricacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/Business" element={<Business />}>
            {/* <Route path="/:id" element={<BusinessDetail />} />   */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="auth"
          element={
            <RequireUnAuth>
              <AuthLayout />
            </RequireUnAuth>
          }
        >
          <Route index element={<Home />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
