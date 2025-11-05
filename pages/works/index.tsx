import { workApi } from '@/api-client';
import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import { useWorkList } from '@/hooks';
import { ListParams } from '@/models';
import { Box, Button, Container, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const [filters, setFilters] = useState<Partial<ListParams>>({ _page: 1, _limit: 10 });
  const { data: workList, isLoading } = useWorkList({ params: filters });
  console.log({ workList, isLoading });
  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const workList = await workApi.getAll({
  //           _page: 1,
  //           _limit: 10,
  //         });
  //         console.log('work list: ', workList);
  //       } catch (error) {
  //         console.log('Failed to fetch work list', error);
  //       }
  //     })();
  //   }, []);
  function handlePreviousClick() {
    setFilters((prev) => ({ ...prev, _page: (prev?._page || 0) - 1 }));
  }
  function handleNextClick() {
    setFilters((prev) => ({ ...prev, _page: (prev?._page || 0) + 1 }));
  }
  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>
        <WorkList workList={workList?.data || []} loading={isLoading} />
        {!isLoading ? (
          <Box>
            <Button variant="contained" color="primary" onClick={handlePreviousClick}>
              Previous page
            </Button>
            <Button variant="contained" color="primary" onClick={handleNextClick}>
              Next page
            </Button>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
WorksPage.Layout = MainLayout;

export async function getStaticProps() {
  console.log('get static props');
  return {
    props: {},
  };
}
