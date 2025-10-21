import { Seo } from '@/components/common';
import { FeaturedWorks, HeroSection, RecentPosts } from '@/components/home';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          title: 'NextJS Tutorials | Easy Frontend',
          url: 'https://learn-nextjs-tut.vercel.app/',
          description: 'Step by step tutorials to build full CRUD website using NextJS for beginers',
          thumbnailUrl:
            'https://codewithmosh.com/_next/image?url=https%3A%2F%2Fuploads.teachablecdn.com%2Fattachments%2F0dKhU49vRbiSSWknbHAR_1920X1357.jpg&w=3840&q=75',
        }}
      />
      <HeroSection />
      <RecentPosts />
      <FeaturedWorks />
    </Box>
  );
};
Home.Layout = MainLayout;
export default Home;
