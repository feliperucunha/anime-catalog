import Link from "next/link";
import Head from "next/head";
import { useState, useContext, useEffect } from 'react'; 
import { Button, Input, Typography, PageHeader, Card } from "antd";
import ContainerContext from "../contexts/containerContext";

export default function IndexPage() {
  const { searchTerm = '', submitSearch, setSubmitSearch } = useContext(ContainerContext);
  const [ results, setResults ] = useState('');
  const searchEndpoint = (query) => `https://kitsu.io/api/edge/anime?filter[text]=${query}&page[limit]=12`;

  useEffect(() => {
    if (submitSearch) {
      fetch(searchEndpoint(searchTerm))
        .then(res => res.json())
        .then(res => {
          setResults(res.data);
        });
      setSubmitSearch(false);
    };
  }, [searchTerm, submitSearch]);

  return (
    <div>
      <Head><title>Animeflix | Search: {searchTerm}</title></Head>

      <ul className="anime-list">
        {results && results.map(result => {
          const { id, attributes } = result;
          const { small: posterImage } = result.attributes.posterImage;

          return (
            <li key={id}>
              <Link href="/anime/[id]" as={`/anime/${id}`}>
                <Card>
                  <img src={posterImage} alt={attributes.canonicalTitle} />
                  <h3>{attributes.canonicalTitle}</h3>
                </Card>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
