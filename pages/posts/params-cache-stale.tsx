import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface ParamsPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
}

export default function ParamsPage({ query, post }: ParamsPageProps) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((x) => {
        if (x > 60) clearInterval(intervalId);
        return x + 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [{ name, color, description }] = post;
  return (
    <div>
      <h1>Params Page</h1>
      <p>Time: {seconds}s</p>
      <h2>Post detail</h2>
      <p>Title: {name}</p>
      <p>Author: {color}</p>
      <p>Description: {description}</p>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalicate');

  await new Promise((res) => setTimeout(res, 3000));

  const postId = context.query.postId;
  if (!postId) return { props: { query: context.query } };

  const response = await fetch(`https://json-server-na4j.onrender.com/api/products?id=${postId}`);
  const data = await response.json();

  return {
    props: {
      query: context.query,
      post: data,
    },
  };
}
