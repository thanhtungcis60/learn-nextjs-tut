import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDetailPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
  const router = useRouter();
  if (!post) return null;
  const [{ name, color, description }] = post;
  console.log('name: ', name);
  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>Title: {name}</p>
      <p>Author: {color}</p>
      <p>Description: {description}</p>
    </div>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  console.log('\nGET STATIC PATHS');
  const response = await fetch('https://json-server-na4j.onrender.com/api/products?_page=1&_limit=10');
  const data = await response.json();
  console.log('data.data ', data.data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths = data.data.map((p: any) => ({
    params: { postId: String(p.id) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (context: GetStaticPropsContext) => {
  console.log('\nGET STATIC PROPS #1');
  console.log('\nGET STATIC PROPS', context.params?.postId);
  const postId = context.params?.postId;
  if (!postId) return { notFound: true };
  const response = await fetch(`https://json-server-na4j.onrender.com/api/products?id=${postId}`);
  const data = await response.json();

  console.log(data);
  return {
    props: {
      post: data,
    },
  };
};
