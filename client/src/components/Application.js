import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Chat from './Chat/Chat';

export default function Application({children}) {
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
}
