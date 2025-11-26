import { MainLayout } from '@/components/layout';
import { Work } from '@/models';
import { Box, Chip, Container, Stack, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import sanitizeHtml from 'sanitize-html';

export interface WorkDetailPageProps {
  work: Work;
}
export default function WorkDetailsPage({ work }: WorkDetailPageProps) {
  const router = useRouter();
  if (router.isFallback) {
    //Nếu client request 1 id chưa có trên server, phải đợi để server render
    return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading ...</div>;
  }
  if (!work) return null;
  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            {work.title}
          </Typography>
        </Box>
        <Stack direction="row" my={2}>
          <Chip color="primary" label={new Date(Number(work.createdAt)).getFullYear()} size="small" />
          <Typography ml={3} color="GrayText">
            {work.tagList.join(', ')}
          </Typography>
        </Stack>
        <Typography>{work.shortDescription}</Typography>
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
