import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Partners from './pages/Partners';
import News from './pages/News';
import Results from './pages/Results';
import Impact from './pages/Impact';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter basename="/learningbrains/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="partners" element={<Partners />} />
          <Route path="news" element={<News />} />
          <Route path="results" element={<Results />} />
          <Route path="impact" element={<Impact />} />
          <Route path="resources" element={<Resources />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
