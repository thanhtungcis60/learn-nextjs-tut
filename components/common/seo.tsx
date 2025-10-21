import * as React from 'react';
import Head from 'next/head';

export interface SeoData {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
}
export interface SeoProps {
  data: SeoData;
}

export function Seo({ data }: SeoProps) {
  const { title, description, url, thumbnailUrl } = data;
  return (
    <Head>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta property="name='keywords'" content="NextJS" />
      <meta property="name='robots'" content="index, follow" />
      <meta property="httpEquiv='Content-Type'" content="text/html; charset=UTF-8" />
      <meta property="name='language'" content="English" />
      <meta property="property='og:type'" content="website" />
      <meta property="property='og:url'" content={url} />
      <meta property="property='og:title'" content={title} />
      <meta property="property='og:description'" content={description} />
      <meta property="property='og:image'" content={thumbnailUrl} />
      <meta property="property='twitter:card'" content="summary_large_image" />
      <meta property="property='twitter:url'" content={url} />
      <meta property="property='twitter:title'" content={title} />
      <meta property="property='twitter:description'" content={description} />
      <meta property="property='twitter:image'" content={thumbnailUrl} />
    </Head>
  );
}
