import Link from 'next/link';
import Head from 'next/head';
import {Card, Carousel, Typography} from 'antd';
import { useWindowSize } from '../utils/windowSize';
import {useState, useEffect} from 'react';
import {SpinnerComponent} from '../components';
import {animeEndpoint} from '../constants';

export async function getServerSideProps() {
  const res = await fetch(animeEndpoint);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function IndexPage({data}) {
  const {data: results = []} = data;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (results) setLoading(false);
  }, []);

  const size = useWindowSize();
  let numberOfSlides = 4;
  let showDots = true;

  if (size.width < 1360) {
    numberOfSlides = 3;
  }

  if (size.width < 1044) {
    numberOfSlides = 2;
  }

  if (size.width < 706) {
    numberOfSlides = 1;
    showDots = false;
  }

  return (
    <div>
      <Head>
        <title>Animelog</title>
      </Head>

      {loading ? (
        <SpinnerComponent />
      ) : (
        <ul className="anime-list">
          <Carousel autoplay infinite centerMode dotPosition="bottom" dots={showDots} slidesToShow={numberOfSlides}>
            {results && results.map((result) => {
                const {id, attributes} = result;
                const {small: posterImage} = result.attributes.posterImage;
              
                return (
                  <li key={id}>
                    <Link href="/anime/[id]" as={`/anime/${id}`}>
                      <Card className="anime-list__card">
                        <img src={posterImage} alt={attributes.canonicalTitle} />
                        <h3>{attributes.canonicalTitle}</h3>
                      </Card>
                    </Link>
                  </li>
                );
            })}
          </Carousel>
        </ul>

      )}

      <div className="welcome-message">
        <Typography>Bem-vindo ao <strong>Animelog</strong></Typography>
        <Typography>Um catálogo de Animes ao seu dispor.</Typography>
      </div>
    </div>
  );
}
