import { getPostList } from '@/utils/posts';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface BlogListPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any[];
}

export default function BlogListPage({ posts }: BlogListPageProps) {
  return (
    <div>
      <h1>Post List Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

//getStaticProps chạy phía server : SSG: Static site generation
export const getStaticProps: GetStaticProps<BlogListPageProps> = async (context: GetStaticPropsContext) => {
  const data = await getPostList();
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      posts: data.map((x: any) => ({ id: x.id, name: x.name })),
    },
  };
};
