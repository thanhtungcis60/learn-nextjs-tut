import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import { useWorkList } from '@/hooks';
import { ListParams } from '@/models';
import { Box, Container, Pagination, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export default function WorksPage() {
  const [filters, setFilters] = useState<Partial<ListParams>>({ _page: 1, _limit: 10 });
  const { data, isLoading } = useWorkList({ params: filters });

  const { _limit, _page, _totalRows } = data?.pagination || {};
  const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0;

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>
        <WorkList workList={data?.data || []} loading={isLoading} />
        {totalPages > 0 && (
          <Stack alignItems="center">
            <Pagination
              count={totalPages}
              page={_page}
              onChange={(_, page) => setFilters((prev) => ({ ...prev, _page: page }))}
            />
          </Stack>
        )}
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
