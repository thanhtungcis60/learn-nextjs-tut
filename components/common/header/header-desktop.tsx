import { Box, Container, Link as MuiLink, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTE_LIST } from './routes';
import clsx from 'clsx';

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter();
  return (
    <Box display={{ xs: 'none', lg: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTE_LIST.map((route) => (
            <MuiLink
              component={Link}
              key={route.path}
              href={route.path}
              sx={{ ml: 2, fontWeight: 'medium' }}
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
