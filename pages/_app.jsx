require('../styles/global.less');

import {useState} from 'react';
import ContainerContext from '../contexts/containerContext';
import {FooterComponent, NavbarComponent} from '../components';

function App({Component, pageProps}) {
  const [searchTerm, setSearchTerm] = useState();
  const [submitSearch, setSubmitSearch] = useState(false);

  const containerContext = {
    searchTerm,
    submitSearch,
    setSubmitSearch,
    setSearchTerm
  };

  return (
    <ContainerContext.Provider value={containerContext}>
      <div className='navbar-container'>
        <NavbarComponent />
        <Component {...pageProps} />
        <FooterComponent />
      </div>
    </ContainerContext.Provider>
  );
}

export default App;
