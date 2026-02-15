import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout'; // Keep for pure layout usage if needed, mostly used by LanguageLayout now
import LanguageLayout from './components/LanguageLayout';
import Home from './pages/Home';
import About from './pages/About';
import Results from './pages/Results';
import Partners from './pages/Partners';
import News from './pages/News';
import Resources from './pages/Resources';
import Impact from './pages/Impact';
import Contact from './pages/Contact';

import ScrollToTop from './components/ScrollToTop';

// Redirects root "/" to users browser language or default "en"
const RootRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'es', 'it', 'sk', 'de', 'pt'];
    const targetLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
    navigate(`/${targetLang}`, { replace: true });
  }, [navigate]);
  return null;
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        {/* All routes wrapped with Language Parameter */}
        <Route path="/:lang" element={<LanguageLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="results" element={<Results />} />
          <Route path="partners" element={<Partners />} />
          <Route path="news" element={<News />} />
          <Route path="resources" element={<Resources />} />
          <Route path="impact" element={<Impact />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
