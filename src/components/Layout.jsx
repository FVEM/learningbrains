import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <main className="flex-grow pt-14">
                {children}
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};

export default Layout;
