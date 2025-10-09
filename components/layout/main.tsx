import { LayoutProps } from '@/models';
import { Box, Container, Stack } from '@mui/material';
import Link from 'next/link';
import { Footer, Header } from '../common';

export function MainLayout({ children }: LayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header />
      <Box component="main" flexGrow={1}>
        <Container maxWidth="sm" sx={{ bgcolor: 'primary.light' }}>
          SM Container
        </Container>
        <Container sx={{ bgcolor: 'primary.light' }}>MD Container</Container>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/works">Works</Link>
        {children}
      </Box>

      <div>{children}</div>
      <Footer />
    </Stack>
  );
}
