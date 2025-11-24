import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import { WorkForm } from '@/components/work/work-form';
import { useWorkDetails } from '@/hooks';
import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function AddEditWorkPage() {
  const router = useRouter();
  const { workId } = router.query;
  const isAddMode = workId === 'add';

  const { data, isLoading } = useWorkDetails({
    workId: (workId as string) || '',
    enable: router.isReady && !isAddMode,
  });

  console.log('Boolean(data):', Boolean(data));
  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            {isAddMode ? 'Add Work Page' : `Edit Work #${workId}`}
          </Typography>
        </Box>
        <Box>Lorem IPSUM</Box>
        <Box>{(isAddMode || Boolean(data)) && <WorkForm initialValues={data} onSubmit={() => {}} />}</Box>
      </Container>
    </Box>
  );
}
AddEditWorkPage.Layout = MainLayout;
