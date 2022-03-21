import Link from "next/link";
import Head from "next/head";
import { Button, Typography, PageHeader, Card } from "antd";

const animeEndpoint = 'https://kitsu.io/api/edge/';

export async function getServerSideProps({ query }) {
  const {id} = query;
  const res = await fetch(`${animeEndpoint}anime/${id}`);
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}

export default function IndexPage({ data }) {
  const { data: results = [] } = data;
  const { attributes: anime } = results;
  const youtubeLink = 'https://www.youtube.com/watch?v=';
  console.log(results)

  return (
    <div>
      <Head><title>Animeflix</title></Head>

        <PageHeader>
          <Link href='/'>
            <Button>Animeflix</Button>
          </Link>
        </PageHeader>

      <div className="anime-list">
        {anime && (
          <Card>
            <img src={anime.coverImage.original} />
            <img src={anime.posterImage.original} />
            <Typography>{anime.canonicalTitle}</Typography>
            <Typography>Age Restriction: {anime.ageRatingGuide}</Typography>
            <Typography>Rating: {anime.averageRating}</Typography>
            <Typography>{anime.description}</Typography>
            <Typography>{anime.episodeCount}</Typography>
            <Typography>{youtubeLink}{anime.youtubeVideoId}</Typography>
          </Card>
        )}

      <Link href='/'>
        <Button>
          Go Back
        </Button>
      </Link>
      </div>
    </div>
  );
}
