import { Post } from '@/models';
import { getPostList } from '@/utils/posts';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface BlogDetailPageProps {
  post: Post;
}

export default function BlogDetailPage({ post }: BlogDetailPageProps) {
  const router = useRouter();

  if (!post) return null;
  const { title, author, description, mdContent } = post;
  return (
    <div>
      <h1>Blog Detail Page</h1>
      <p>Title: {title}</p>
      <p>Author: {author?.name}</p>
      <p>Description: {description}</p>
      <p>Content: {mdContent}</p>
    </div>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  console.log('\nGET STATIC PATHS');
  const postList = await getPostList();

  const paths = postList.map((p: Post) => ({
    params: { slug: String(p.slug) },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<BlogDetailPageProps> = async (context: GetStaticPropsContext) => {
  const postList = await getPostList();
  const slug = context.params?.slug;
  if (!slug) return { notFound: true };
  const post = postList.find((x) => x.slug === slug);
  if (!post) return { notFound: true };

  return {
    props: {
      post: post,
    },
  };
};
