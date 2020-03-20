import React, {useEffect} from 'react';

import Header from './Header';
import Footer from './Footer';
import Chat from './Chat/Chat';
import {withRouter} from "react-router-dom";
import {pageVisit} from "../utils/analytics";

export default withRouter(function Application({location, children}) {
  useEffect(() => {
    pageVisit(location.pathname);
  }, [location]);
  
  return (
    <React.Fragment>
      <Header />
      <main role="main">
        {children}
        <div className="d-none d-lg-block">
          <Chat isFixed isCollapsed />
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
});
