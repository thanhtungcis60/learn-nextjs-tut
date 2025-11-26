import { MainLayout } from '@/components/layout';
import { WorkForm } from '@/components/work/work-form';
import { useAddWork, useWorkDetails } from '@/hooks';
import { WorkPayload } from '@/models';
import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function AddEditWorkPage() {
  const router = useRouter();
  const { workId } = router.query;
  const isAddMode = workId === 'add';

  const { data, isLoading, updateWork } = useWorkDetails({
    workId: (workId as string) || '',
    enable: router.isReady && !isAddMode,
  });

  const addNewWork = useAddWork();

  async function handleSubmit(payload: Partial<WorkPayload>) {
    let newWork = null;
    try {
      if (isAddMode) {
        newWork = await addNewWork(payload);
        toast.success(`Add work successfully ${newWork?.id}`);
      } else {
        newWork = await updateWork(payload);
        toast.success('Update work successfully');
      }
      router.push(`/works/${newWork?.id}/details`);
    } catch (error) {
      console.log(error);
    }
  }
  if (!router.isReady) return null;
  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            {/* {isAddMode ? 'Add Work Page' : `Edit Work #${workId}`} */}
            Add edit work
          </Typography>
        </Box>
        <Box>{(isAddMode || Boolean(data)) && <WorkForm initialValues={data} onSubmit={handleSubmit} />}</Box>
      </Container>
    </Box>
  );
}
AddEditWorkPage.Layout = MainLayout;
AddEditWorkPage.requireLogin = true;
