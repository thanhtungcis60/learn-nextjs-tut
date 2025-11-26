import { DEFAULT_THUMBNAIL_URL } from '@/constants';
import { Work } from '@/models';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export interface WorkCardProps {
  work: Work;
  onWorkCardClick(id: string): void;
}

export function WorkCard({ work, onWorkCardClick }: WorkCardProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(work.thumbnailUrl);
  return (
    <Link href={`/works/${work.id}/details`} passHref>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ cursor: 'pointer' }}
        // onClick={() => {
        //   if (onWorkCardClick) onWorkCardClick(work?.id);
        // }}
      >
        <Box width={{ xs: '100%', sm: '246px' }} flexShrink={0}>
          <Image
            src={imgSrc}
            width={246}
            height={180}
            alt="work thumbnail"
            onError={() => setImgSrc(DEFAULT_THUMBNAIL_URL)}
          />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {work.title}
          </Typography>
          <Stack direction="row" my={2}>
            <Chip color="secondary" label={new Date(Number(work.createdAt)).getFullYear()} size="small" />
            <Typography ml={3} color="GrayText">
              {work.tagList.join(', ')}
            </Typography>
          </Stack>
          <Typography>{work.shortDescription}</Typography>
        </Box>
      </Stack>
    </Link>
  );
}
