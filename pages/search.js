import Link from "next/link";
import Head from "next/head";
import { useState, useContext, useEffect } from 'react'; 
import { Button, Input, Typography, PageHeader, Card } from "antd";
import ContainerContext from "../contexts/containerContext";

export default function IndexPage() {
  const { searchTerm = '', submitSearch, setSubmitSearch } = useContext(ContainerContext);
  const [ results, setResults ] = useState('');
  const [ nextLink, setNextLink ] = useState('');
  const [ previousLink, setPreviousLink ] = useState('');
  const [ noResults, setNoResults ] = useState(false);
  const searchEndpoint = (query) => `https://kitsu.io/api/edge/anime?filter[text]=${query}&page[limit]=12}`;

  useEffect(() => {
    if (submitSearch) {
      fetch(searchEndpoint(searchTerm))
        .then(res => res.json())
        .then(res => {
          if (res.data.length > 0) {
            setResults(res.data);
            setNextLink(res.links.next || '');
          } else {
            setNoResults(true);
          }
        });
      setSubmitSearch(false);
    };
  }, [searchTerm, submitSearch]);

  function handlePreviousPage() {
    fetch(previousLink)
    .then(res => res.json())
    .then(res => {
      setNextLink(res.links.next || '')
      setPreviousLink(res.links.prev || '')
      setResults(res.data);
    });
  setSubmitSearch(false);
  }

  function handleNextPage() {
    fetch(nextLink)
    .then(res => res.json())
    .then(res => {
      setNextLink(res.links.next || '')
      setPreviousLink(res.links.prev || '')
      setResults(res.data);
    });
  setSubmitSearch(false);
  }

  return (
    <div className="search-container">
      <Head><title>Animeflix | Search: {searchTerm}</title></Head>

      <ul className="anime-list-search">
        {results && results.map(result => {
          const { id, attributes } = result;
          const { small: posterImage } = result.attributes.posterImage;

          return (
            <li key={id}>
              <Link href="/anime/[id]" as={`/anime/${id}`}>
                <Card className="anime-list__search-card">
                  <img src={posterImage} alt={attributes.canonicalTitle} />
                  <Typography className="anime-list__search-card__title">{attributes.canonicalTitle}</Typography>
                  <h4>Average Rating: {attributes.averageRating}</h4>
                </Card>
              </Link>
            </li>
          )
        })}
      </ul>

      {noResults && (
        <h1>Nenhum Resultado, por favor, pesquise com outro termo.</h1>
      )}

      {previousLink && <Button onClick={handlePreviousPage}>Página Anterior</Button>}
      {nextLink && <Button onClick={handleNextPage}>Próxima Página</Button>}
    </div>
  );
}
