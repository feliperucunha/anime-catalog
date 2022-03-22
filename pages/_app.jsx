require('../styles/variables.less');
require('../styles/global.less');
require('../styles/variables-css.less');

import {Typography, Input, PageHeader} from 'antd';
import {useState} from 'react';
import ContainerContext from '../contexts/containerContext';
import Link from 'next/link';
import Router from 'next/router';

function App({Component, pageProps}) {
  const [searchTerm, setSearchTerm] = useState();
  const [submitSearch, setSubmitSearch] = useState(false);

  function handleSearchSubmit(e) {
    e.preventDefault();

    const {currentTarget = {}} = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find((field) => field.name === 'query');
    const value = fieldQuery.value || '';

    setSearchTerm(value);
    setSubmitSearch(true);
    Router.push('/search');
  };

  const containerContext = {
    searchTerm,
    submitSearch,
    setSubmitSearch,
  };

  return (
    <ContainerContext.Provider value={containerContext}>
      <PageHeader className="navbar">
        <Link href="/">
          <div>
            <Typography className="navbar__name">Animelog</Typography>
          </div>
        </Link>
        <form className="search" onSubmit={handleSearchSubmit}>
          <Input
            name="query"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquise aqui"
          />
        </form>
      </PageHeader>
      <Component {...pageProps} />

      <footer>
        <p>
          Criado com amor por
          <a target="_blank" href="https://www.linkedin.com/in/feliperubencunha/" rel="noreferrer">Felipe Cunha</a>-
          Outros projetos no meu
          <a target="_blank" href="https://github.com/feliperucunha" rel="noreferrer">Github</a>
        </p>
      </footer>
    </ContainerContext.Provider>
  );
}

export default App;
