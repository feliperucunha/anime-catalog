import Link from "next/link";
import { useState, useEffect } from 'react'; 
import { Button, Input, Typography, PageHeader } from "antd";

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
  const { data: results = [] } = data;
  //TODO: remove testing code
  console.log(results)

  function handleSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
  };

  return (
    <div>
      <PageHeader>
        <Typography>Animeflix</Typography>
      </PageHeader>

      <form className="search" onSubmit={handleSearch}>
        <Input name="query" type="search" />
        <Button>Search</Button>
      </form>

      <ul className="anime-list">
        {results.map(result => {
          const { id, attributes } = result;
          const { small: posterImage } = result.attributes.posterImage;

          return (
            <li key={id}>
              <img src={posterImage} alt={attributes.canonicalTitle} />
              <h3>{attributes.canonicalTitle}</h3>
            </li>
          )
        })}
      </ul>

      {/* <Link href="/about">
        <button>[normal button] go to ant page</button>
      </Link> */}
    </div>
  );
}
