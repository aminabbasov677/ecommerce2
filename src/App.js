import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Particles from "react-tsparticles";
import { tsParticles } from "tsparticles-engine";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import "./App.css";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const isFetching = useIsFetching();

  const particleOptions = {
    particles: {
      number: { value: 60 },
      color: { value: ["#00f3ff", "#9d00ff", "#39ff14", "#ff00ff"] },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 4 }, random: true },
      move: {
        enable: true,
        speed: { min: 0.3, max: 0.8 },
        direction: "none",
        random: true,
        outModes: { default: "out" },
      },
      opacity: { value: { min: 0.3, max: 0.6 }, random: true },
      links: {
        enable: true,
        distance: 150,
        color: "#00f3ff",
        opacity: 0.3,
        width: 1,
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.5 } },
        push: { quantity: 4 },
      },
    },
    background: { color: "transparent" },
    retina_detect: true,
  };

  const particlesInit = async () => {
    await tsParticles.load({ id: "tsparticles", options: particleOptions });
  };

  return (
    <div className="app-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
      />
      <Navbar />
      <main className="main-content">
        {isFetching ? <Loading /> : null}
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <AuthProvider>
            <Router>
              <ScrollToTop />
              <AppContent />
            </Router>
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
