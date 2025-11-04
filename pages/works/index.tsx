import { workApi } from '@/api-client';
import { MainLayout } from '@/components/layout';
import React, { useEffect } from 'react';

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  useEffect(() => {
    (async () => {
      try {
        const workList = await workApi.getAll({
          _page: 1,
          _limit: 10,
        });
        console.log('work list: ', workList);
      } catch (error) {
        console.log('Failed to fetch work list', error);
      }
    })();
  }, []);
  return <div>Works Page</div>;
}
WorksPage.Layout = MainLayout;

export async function getStaticProps() {
  console.log('get static props');
  return {
    props: {},
  };
}
