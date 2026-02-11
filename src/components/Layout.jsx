import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-secondary/30">
      <Header />
      <main className="flex-grow pt-[84px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
