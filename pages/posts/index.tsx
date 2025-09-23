import { GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

export interface PostListPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any[];
}

export default function PostListPage({ posts }: PostListPageProps) {
  return (
    <div>
      <h1>Post List Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
  context: GetStaticPropsContext,
) => {
  //server-side
  //build-time
  console.log('static props');
  const response = await fetch(
    'https://json-server-na4j.onrender.com/api/products?_page=1&_limit=10',
  );
  const data = await response.json();
  console.log(data);
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      posts: data.data.map((x: any) => ({ id: x.id, name: x.name })),
    },
  };
};
