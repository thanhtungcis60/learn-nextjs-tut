import { Work } from '@/models';
import { Box, Divider } from '@mui/material';
import React, { Fragment } from 'react';
import { WorkCard } from './work-card';
import Image from 'next/image';
import noData from '@/images/NO_DATA.avif';
import { WorkSkeleton } from './work-skeleton';

export interface WorkListProps {
  workList: Work[];
  loading?: boolean;
  onWorkCardClick(id: string): void;
}

export function WorkList({ workList, loading, onWorkCardClick }: WorkListProps) {
  if (loading)
    return (
      <Box>
        {Array.from({ length: 10 }).map((_, index) => (
          <Fragment key={index}>
            <WorkSkeleton />
            <Divider sx={{ my: 3 }} />
          </Fragment>
        ))}
      </Box>
    );
  if (workList.length === 0)
    return (
      <Box>
        <Image src={noData} alt="No data" />
      </Box>
    );
  return (
    <Box>
      {workList.map((work) => (
        <Fragment key={work.id}>
          <WorkCard work={work} onWorkCardClick={onWorkCardClick} />
          <Divider sx={{ my: 3 }} />
        </Fragment>
      ))}
    </Box>
  );
}
