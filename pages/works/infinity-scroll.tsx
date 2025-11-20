import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import { WorkFilters } from '@/components/work/work-filters';
import { useWorkListInfinity } from '@/hooks/use-work-list-infinity';
import { ListParams, ListResponse, Work, WorkFiltersPayload } from '@/models';
import { Box, Button, Container, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function WorksPage() {
  const router = useRouter();
  const filters: Partial<ListParams> = { ...router.query };
  const initFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || '',
    selectedTagList: filters.tagList_like?.split('|') || [],
  };

  // console.log('page render ', { search: filters.title_like });
  // const [filters, setFilters] = useState<Partial<ListParams>>({ _page: 1, _limit: 10 });
  const { data, isLoading, isValidating, size, setSize } = useWorkListInfinity({
    params: filters,
    enable: router.isReady,
  });

  // const { _limit, _page, _totalRows } = data?.pagination || {};
  // const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0;
  console.log('infinity-scroll: ', data, isValidating, size);
  const workList: Array<Work> =
    data?.reduce((result: Array<Work>, currentPage: ListResponse<Work>) => {
      result.push(...currentPage.data);
      return result;
    }, []) || [];

  function handleFilterChange(newFilters: WorkFiltersPayload) {
    // setFilters((prev) => ({ ...prev, _page: 1, title_like: newFilters.search }));
    router.push(
      {
        pathname: '/works',
        query: {
          ...filters,
          title_like: newFilters.search,
          tagList_like: newFilters.tagList_like,
        },
      },
      undefined,
      { shallow: true }, //shallow routing chỉ thay đổi route phía client, không gọi hàm getStaticProps phía server
    );
  }
  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>
        {router.isReady ? (
          <WorkFilters initialValues={initFiltersPayload} onSubmit={handleFilterChange} />
        ) : (
          <Skeleton width="100%" height={40} sx={{ display: 'inline-block', mt: 2, mb: 1 }} />
        )}
        <WorkList workList={workList} loading={!router.isReady || isLoading} />
        <Button variant="contained" onClick={() => setSize((x) => x + 1)}>
          Load More
        </Button>
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
