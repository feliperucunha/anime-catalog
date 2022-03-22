import Link from "next/link";
import Head from "next/head";
import { useState, useEffect, useContext } from 'react'; 
import { Button, Input, Typography, PageHeader, Card, Carousel } from "antd";
import ContainerContext from "../contexts/containerContext";

const animeEndpoint = 'https://kitsu.io/api/edge/trending/anime';

export async function getServerSideProps() {
  const res = await fetch(animeEndpoint);
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}

export default function IndexPage({ data }) {
  const { searchTerm } = useContext(ContainerContext);
  const { data: firstResults = [] } = data;
  const [ results, setResults ] = useState(firstResults);
  const searchEndpoint = (query) => `https://kitsu.io/api/edge/anime?filter[text]=${searchTerm}&page[limit]=20`

  function handleSearchSubmit(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name === 'query');
    const value = fieldQuery.value || '';

    if (search) {
      fetch(searchEndpoint(searchTerm))
        .then(res => res.json())
        .then(res => {
          setResults(res.data);
        })
    };
  };

  function handleLandingPage() {
    setResults(firstResults);
  };

  return (
    <div>
      <Head><title>Animeflix</title></Head>

      {/* <PageHeader>
        <Button onClick={handleLandingPage}>Animeflix</Button>
        <form className="search" onSubmit={handleSearchSubmit}>
          <Input 
            name="query"
            type="search"
          />
        </form>
      </PageHeader> */}


      <ul className="anime-list">
        <Carousel autoplay dotPosition="bottom" slidesToShow={4}>
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
        </Carousel>
      </ul>
    </div>
  );
}
