import {useContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import ContainerContext from '../../../contexts/containerContext';
import {Button, Typography, Rate} from 'antd';
import {SpinnerComponent} from '../../../components';


const animeEndpoint = 'https://kitsu.io/api/edge/';

export async function getServerSideProps({query}) {
  const {id} = query;
  const res = await fetch(`${animeEndpoint}anime/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function ItemPage({data}) {
  const {data: results = []} = data;
  const {attributes: anime} = results;
  const router = useRouter();
  const {setSubmitSearch} = useContext(ContainerContext);
  const [loading, setLoading] = useState(true);
  const youtubeLink = 'https://www.youtube.com/watch?v=';

  useEffect(() => {
    if (results) setLoading(false);
  }, []);

  function handleGoBackButton() {
    router.back();
    setSubmitSearch(true);
  }

  return (
    <div>
      <Head>
        <title>Animelog | {anime.canonicalTitle}</title>
      </Head>

      {loading ? (
        <SpinnerComponent />
      ) : (
        <div className="anime-page">
          {anime && (
            <div className="anime-page__card">
              <div className='anime-page__card-container'>
                <div className='anime-page__card-container__poster'> 
                  <img src={anime.posterImage.original} />
                  <Rate disabled defaultValue={parseInt(anime.averageRating/20)} />
                </div>
                <div className='anime-page__text-container'>
                  <Typography className='anime-page__text-container__title'>{anime.canonicalTitle}</Typography>
                  <Typography className='anime-page__text-container__age'>Restrição de Idade: <strong>{anime.ageRatingGuide}</strong></Typography>
                  <Typography className='anime-page__text-container__description'>{anime.description}</Typography>
                  <Typography>Número de Episódios: {anime.episodeCount}</Typography>
                  {anime.youtubeVideoId && <a target="_blank" href={`${youtubeLink}${anime.youtubeVideoId}`} rel="noreferrer">Assistir ao trailer</a>}
                </div>
              </div>
            </div>
          )}

          <div className='anime-page__button'>
            <Button size='large' onClick={handleGoBackButton}>
              Voltar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
