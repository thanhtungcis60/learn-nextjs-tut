import { MainLayout } from '@/components/layout';
import { DEFAULT_THUMBNAIL_URL } from '@/constants';
import { useAuth } from '@/hooks';
import { Work } from '@/models';
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

export interface WorkDetailPageProps {
  work: Work;
}
export default function WorkDetailsPage({ work }: WorkDetailPageProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(work?.thumbnailUrl || '');
  useEffect(() => {
    setMounted(true);
    setImgSrc(work?.thumbnailUrl);
  }, []);

  if (router.isFallback) {
    //Nếu client request 1 id chưa có trên server, phải đợi để server render
    return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading ...</div>;
  }
  if (!work) return null;

  return (
    <Box>
      <Container>
        <Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
          <Typography component="h1" variant="h3" fontWeight="bold">
            {work.title}
          </Typography>
          {mounted && isLoggedIn && (
            <Button variant="contained" size="small" onClick={() => router.push(`/works/${work.id}`)}>
              Edit this one
            </Button>
          )}
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Box width={{ xs: '100%', sm: '246px' }} flexShrink={0}>
            <Image
              src={imgSrc}
              width={246}
              height={180}
              alt="work thumbnail"
              onError={() => setImgSrc(DEFAULT_THUMBNAIL_URL)}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 'bold' }}>{work.shortDescription}</Typography>
            <Stack direction="row" my={2}>
              <Chip color="secondary" label={new Date(Number(work.createdAt)).getFullYear()} size="small" />
              <Typography ml={3} color="GrayText">
                {work.tagList.join(', ')}
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Box
          component="div"
          dangerouslySetInnerHTML={{ __html: work.fullDescription }}
          sx={{ img: { maxWidth: '100%' } }}
        ></Box>
      </Container>
    </Box>
  );
}

WorkDetailsPage.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('\nWORK: GET STATIC PATHS');
  const response = await fetch(`${process.env.API_URL}/api/works?_page=1&_limit=10`);
  const data = await response.json();
  console.log('data.data ', data.data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paths = data.data.map((w: any) => ({
    params: { workId: String(w.id) },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<WorkDetailPageProps> = async (context: GetStaticPropsContext) => {
  console.log('\nWORK: GET STATIC PROPS', context.params?.postId);
  const workId = context.params?.workId;
  if (!workId) return { notFound: true };
  const response = await fetch(`${process.env.API_URL}/api/works/${workId}`);
  const data = await response.json();
  //sanitize html
  data.fullDescription = sanitizeHtml(data.fullDescription, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  });

  console.log(data);
  return {
    props: {
      work: data,
    },
    revalidate: 300, //300s = 5 minutes
  };
};
