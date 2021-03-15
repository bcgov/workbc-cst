import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';
const NotFoundPage: FunctionComponent = () => {

    return (    
      <div className="notFoundPage">
          <Helmet title={'404: Not found'}></Helmet>
          <h1>NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          <a href="/sao">Head home</a>
      </div> 
    )}

export default NotFoundPage;
