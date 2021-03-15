import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { navigate } from "gatsby";

const NotFoundPage = () => {

    useEffect(() => {
        navigate("/"); // redirecting to home page
      }, []);

      return (    
        <div className="notFoundPage">
            <Helmet title={'404: Not found'}></Helmet>
            <h1>NOT FOUND</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
            <a href="/">Head home</a>
        </div> 
)}

export default NotFoundPage;