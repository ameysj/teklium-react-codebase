import React from "react";
import Header from "../layouts/header/header";
import UtilityNav from "../layouts/utilityNav/utilityNav";
import Footer from "./footer/footer";
import Copyright from "./copyright/copyright";
import { Helmet } from "react-helmet";

function Layout(props) {
  const pageTitle = "welcome to Teklium"
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <UtilityNav />
      <Header />
      {props.children}
      <Footer />
      <Copyright />
    </>
  );
}
export default Layout;
