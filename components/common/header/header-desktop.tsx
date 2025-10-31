import { Box, Container, Link as MuiLink, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTE_LIST } from './routes';
import clsx from 'clsx';
import { useAuth } from '@/hooks';

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter();
  const { profile, logout } = useAuth();
  const isLoggedIn = Boolean(profile?.username);
  const renderedRoutes = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn);

  return (
    <Box display={{ xs: 'none', lg: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {renderedRoutes.map((route) => (
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

          {isLoggedIn ? (
            <MuiLink
              component={Link}
              key="/logout"
              href="#"
              onClick={logout}
              sx={{ ml: 2, fontWeight: 'medium' }}
            >
              Logout
            </MuiLink>
          ) : (
            <MuiLink
              component={Link}
              key="/login"
              href="/login"
              sx={{ ml: 2, fontWeight: 'medium', cursor: 'pointer' }}
            >
              Login
            </MuiLink>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
