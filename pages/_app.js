require("../styles/variables.less");
require("../styles/global.less");
require("../styles/variables-css.less");
import { Button, Input, PageHeader } from "antd";
import { useState } from 'react'; 
import ContainerContext from "../contexts/containerContext";
import Link from "next/link";
import Router from 'next/router';

function App({ Component, pageProps }) {
  const [ searchTerm, setSearchTerm ] = useState();
  function handleSearchSubmit(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name === 'query');
    const value = fieldQuery.value || '';

    setSearchTerm(value);
    Router.push('/search')
  };

  const containerContext = {
    searchTerm
  };

  return (
    <ContainerContext.Provider value={containerContext}>
      <PageHeader>
        <Link href="/">
          <Button>Animeflix</Button>
        </Link>
        <form className="search" onSubmit={handleSearchSubmit}>
          <Input 
            name="query"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </PageHeader>
      <Component {...pageProps} />
    </ContainerContext.Provider>
  )
}

export default App;
