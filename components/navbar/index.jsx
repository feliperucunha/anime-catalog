import {Typography, Input, PageHeader} from 'antd';
import {useContext} from 'react';
import Router from 'next/router';
import ContainerContext from '../../contexts/containerContext';

function NavbarComponent() {
  const {setSubmitSearch, searchTerm, setSearchTerm} = useContext(ContainerContext);

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

  function handleHome() {
    setSearchTerm('');
    Router.push('/');
  }

  return (
    <PageHeader className="navbar">
      <div onClick={handleHome}>
        <Typography className="navbar__name">Animelog</Typography>
      </div>
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
  );
}

export default NavbarComponent;
