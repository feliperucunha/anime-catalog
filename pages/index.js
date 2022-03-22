import Link from "next/link";
import Head from "next/head";
import { Card, Carousel } from "antd";

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

  return (
    <div>
      <Head><title>Animeflix</title></Head>

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
