import React from "react";
import Headers from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import {Toaster} from 'react-hot-toast'

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>

        <title>{title}</title>
      </Helmet>
      <Headers />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - Shop now",
  description: "mern stack Project",
  keywords: "mern,react,node,mongodb",
  author: "Paramnoor",
};

export default Layout;
