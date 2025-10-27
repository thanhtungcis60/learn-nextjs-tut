import { Post } from '@/models';
import { getPostList } from '@/utils/posts';
import { Box, Container, Divider } from '@mui/material';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkPrism from 'remark-prism';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import { unified } from 'unified';
import Script from 'next/script';
import { Seo } from '@/components/common';

export interface BlogDetailPageProps {
  post: Post;
}

export default function BlogDetailPage({ post }: BlogDetailPageProps) {
  if (!post) return null;
  const { title, author, description, mdContent } = post;
  return (
    <Box>
      <Seo
        data={{
          title: `${post.title} | Easy Frontend Blog`,
          url: `${process.env.HOST_URL}/`,
          description: post.description,
          thumbnailUrl: post.thumbnailUrl || '',
        }}
      />
      <Container>
        <h1>Blog Detail Page</h1>
        <p>Title: {title}</p>
        <p>Author: {author?.name}</p>
        <p>Description: {description}</p>
        <p>Content: {mdContent}</p>

        <Divider />
        <div dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}></div>
      </Container>
      <Script src="/prism.js" strategy="afterInteractive"></Script>
    </Box>
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

  //convert markdown to html
  const file = await unified()
    .use(remarkParse)
    .use(remarkToc)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .use(remarkPrism as any) // .use(remarkPrism as any, { plugins: ['line-numbers'] })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeDocument, { title: 'Blog details page' })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(post.mdContent || '');
  post.htmlContent = file.toString();

  return {
    props: {
      post: post,
    },
  };
};
