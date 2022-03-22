/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useContext} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import ContainerContext from '../../../contexts/containerContext';
import {Button, Typography, Card} from 'antd';

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
  const youtubeLink = 'https://www.youtube.com/watch?v=';

  function handleGoBackButton() {
    router.back();
    setSubmitSearch(true);
  }

  return (
    <div>
      <Head><title>Animelog | {anime.canonicalTitle}</title></Head>

      <div className="anime-page">
        {anime && (
          <>
            <img className='anime-page__cover' src={anime.coverImage.original} />
            <div className='anime-page__card-container'>
              <img className='anime-page__card-container__poster' src={anime.posterImage.original} />
              <div className='anime-page__text-container'>
                <Typography>{anime.canonicalTitle}</Typography>
                <Typography>Restrição de Idade: {anime.ageRatingGuide}</Typography>
                <Typography>Nota: {anime.averageRating}</Typography>
                <Typography>{anime.description}</Typography>
                <Typography>Número de Episódios: {anime.episodeCount}</Typography>
                {anime.youtubeVideoId && <a target="_blank" href={`${youtubeLink}${anime.youtubeVideoId}`} rel="noreferrer">Assistir ao trailer</a>}
              </div>
            </div>
          </>
        )}

        <div className='anime-page__button'>
          <Button size='large' danger onClick={handleGoBackButton}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
