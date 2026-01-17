import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Project from "./pages/Project";
import Contact from "./pages/Contact";

import Personify from "./pages/projects/Personify";
import YearWrap from "./pages/projects/YearWrap";
import BrewNCrumbs from "./pages/projects/BrewNCrumbs";
import SmartHealth from "./pages/projects/SmartHealth";
import ItalianCuisine from "./pages/projects/ItalianCuisine";
import EyeOpener from "./pages/projects/EyeOpener"; // ✅ FIXED

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* APP LAYOUT */}
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/work/project-1" element={<Project />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/work/personify" element={<Personify />} />
            <Route path="/work/year-wrap" element={<YearWrap />} />
            <Route path="/work/brew-n-crumbs" element={<BrewNCrumbs />} />
            <Route path="/work/smart-health" element={<SmartHealth />} />
            <Route path="/work/italian-cuisine" element={<ItalianCuisine />} />
            <Route path="/work/eye-opener" element={<EyeOpener />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}