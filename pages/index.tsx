import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';
import { Geist, Geist_Mono } from 'next/font/google';
import { useRouter } from 'next/router';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  function goToDetailPage() {
    router.push({ pathname: '/posts/[postId]', query: { postId: 123, ref: 'social' } });
  }
  return <Box>Home Page</Box>;
};
Home.Layout = MainLayout;
export default Home;
