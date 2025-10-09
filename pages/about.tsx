import { Header } from '@/components/common';
import { AdminLayout, MainLayout } from '@/components/layout';
import { Box, Button, Typography } from '@mui/material';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';

// const Header = dynamic(() => import('@/components/common/header'), { ssr: true });

// export interface AboutPageProps {}

export default function AboutPage() {
  const router = useRouter();
  const [postList, setPostList] = useState([]);
  const page = router.query?.page;
  console.log('About query: ', router.query);

  useEffect(() => {
    (async () => {
      if (!page) return;
      const response = await fetch(
        `https://json-server-na4j.onrender.com/api/products?_page=${page}&_limit=10`,
      );
      const data = await response.json();
      setPostList(data.data);
    })();
  }, [page]);

  function handleNextClick() {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }, //shallow routing chỉ thay đổi route phía client, không gọi hàm getStaticProps phía server
    );
  }

  //props: AboutPageProps
  return (
    <Box>
      <Typography component="h1" variant="h3" color="primary.main">
        About page
      </Typography>
      <Button variant="contained" color="success">
        Testing
      </Button>
      <Header />
      <ul className="post-list">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          postList.map((post: any) => (
            <li key={post.id}>{post.name}</li>
          ))
        }
      </ul>
      <button onClick={handleNextClick}>Next page</button>
    </Box>
  );
}

AboutPage.Layout = AdminLayout;

export async function getStaticProps() {
  console.log('get static props');
  return {
    props: {},
  };
}
// export function getServerSideProps() {
//   return {
//     props: {},
//   };
// }
