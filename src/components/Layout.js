import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <SideNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
