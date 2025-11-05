import { workApi } from '@/api-client';
import { MainLayout } from '@/components/layout';
import { useWorkList } from '@/hooks';
import { ListParams } from '@/models';
import { Box, Button } from '@mui/material';
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
  function handleNextClick() {
    setFilters((prev) => ({ ...prev, _page: (prev?._page || 0) + 1 }));
  }
  return (
    <div>
      <p>Works Page</p>
      <Box>
        <Button variant="contained" color="primary" onClick={handleNextClick}>
          Next page
        </Button>
      </Box>
    </div>
  );
}
WorksPage.Layout = MainLayout;

export async function getStaticProps() {
  console.log('get static props');
  return {
    props: {},
  };
}
