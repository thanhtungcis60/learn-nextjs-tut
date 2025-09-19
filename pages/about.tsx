import { useRouter } from 'next/router';
import * as React from 'react';

// export interface AboutPageProps {}

export default function AboutPage() {
  const router = useRouter();
  console.log('About query: ', router.query);
  //props: AboutPageProps
  return <div>About page</div>;
}

export function getServerSideProps() {
  return {
    props: {},
  };
}
