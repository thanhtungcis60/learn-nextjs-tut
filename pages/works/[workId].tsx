import { MainLayout } from '@/components/layout';
import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function AddEditWorkPage() {
  const router = useRouter();
  const { workId } = router.query;
  const isAddMode = workId === 'add';
  console.log({ workId, ready: router.isReady });

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            {isAddMode ? 'Add Work Page' : 'Edit Work Page'}
          </Typography>
        </Box>
        <Box>Lorem IPSUM</Box>
      </Container>
    </Box>
  );
}
AddEditWorkPage.Layout = MainLayout;
