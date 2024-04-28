import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../router/Routers";

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/login-client", "/login-sp","/signup-client","/signup-sp"];
  const hideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routers />
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
