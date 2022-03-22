import Link from "next/link";
import Head from "next/head";
import { Card, Carousel, Spin, Typography } from "antd";
import { useState, useEffect } from 'react'; 

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
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (results) {
      setLoading(false);
    }
  }, []);

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        function handleResize() {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
      
        window.addEventListener("resize", handleResize);
       
        handleResize();
      
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);
    return windowSize;
  }

  const size = useWindowSize();
  let numberOfSlides = 4;

  if (size.width < 1360) {
    numberOfSlides = 3;
  }

  if (size.width < 1044) {
    numberOfSlides = 2;
  }

  if (size.width < 706) {
    numberOfSlides = 1;
  }

  return (
    <div>
      <Head><title>Animeflix</title></Head>

      {loading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : (
        <ul className="anime-list">
          <Carousel autoplay dotPosition="bottom" slidesToShow={numberOfSlides}>
            {results && results.map(result => {
              const { id, attributes } = result;
              const { small: posterImage } = result.attributes.posterImage;

              return (
                <li key={id}>
                  <Link href="/anime/[id]" as={`/anime/${id}`}>
                    <Card className="anime-list__card">
                      <img src={posterImage} alt={attributes.description} />
                      <h3>{attributes.canonicalTitle}</h3>
                    </Card>
                  </Link>
                </li>
              )
            })}
          </Carousel>
        </ul>

      )}

      <div className="welcome-message">
        <Typography>Bem-vindo ao <strong>Animeflix</strong>, um catálogo de Animes ao seu dispor.</Typography>
      </div>

    </div>
  );
}
