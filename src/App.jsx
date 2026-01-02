import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PortfolioCategory from './pages/PortfolioCategory';
import About from './pages/About';
import Contact from './pages/Contact';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Observer);

function App() {
  useEffect(() => {
    // Configure GSAP defaults
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.8,
    });
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="portfolio/:category" element={<PortfolioCategory />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
