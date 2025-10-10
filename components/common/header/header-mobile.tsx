import { Box, Container, Link as MuiLink, Stack } from '@mui/material';
import * as React from 'react';
import { ROUTE_LIST } from './routes';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export interface HeaderMobileProps {}

export function HeaderMobile(props: HeaderMobileProps) {
  const router = useRouter();
  return (
    <Box display={{ xs: 'block', lg: 'none' }}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTE_LIST.map((route) => (
            <MuiLink
              component={Link}
              key={route.path}
              href={route.path}
              sx={{ ml: 2 }}
              className={clsx({ active: router.pathname === route.path })}
            >
              {route.label}
            </MuiLink>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
