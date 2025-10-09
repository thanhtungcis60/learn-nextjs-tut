import { Box, Container, Stack, Link as MuiLink } from '@mui/material';
import * as React from 'react';
import { ROUTE_LIST } from './routes';
import Link from 'next/link';

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
  return (
    <Box display={{ xs: 'none', lg: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTE_LIST.map((route) => (
            <MuiLink component={Link} key={route.path} href={route.path} sx={{ ml: 2 }}>
              {route.label}
            </MuiLink>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
