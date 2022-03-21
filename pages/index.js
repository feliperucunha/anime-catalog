import Link from "next/link";

const animeEndpoint = 'https://kitsu.io/api/edge/';

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
  //TODO: remove testing code
  console.log(data)
  return (
    <div>
      <p>this is normal page</p>
      <Link href="/about">
        <button>[normal button] go to ant page</button>
      </Link>
    </div>
  );
}
