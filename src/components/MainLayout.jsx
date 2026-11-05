import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import LiveChat from './LiveChat';
import Navbar from './Navbar';
import Popup from './Popup';

function MainLayout() {
  return (
    <div className="site-shell">
      <Navbar />
      <div className="layout-main">
        <Outlet />
      </div>
      <Footer />
      <Popup />
      <LiveChat />
    </div>
  );
}

export default MainLayout;
