import { Box, Button, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import avatar from '@/images/cartoon_female.png';
import Image from 'next/image';

export function HeroSection() {
  return (
    <Box component="section" pt={18} pb={9}>
      <Container>
        <Stack spacing={4} direction="row" alignItems="flex-start">
          <Box>
            <Typography component="h1" variant="h3" fontWeight="bold" mb={5}>
              Hi, I am John, <br /> Creative Technologist
            </Typography>
            <Typography mb={5}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
              consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </Typography>
            <Button variant="contained">Download resume</Button>
          </Box>
          <Box width={{ xs: 200, sm: 250, md: 300 }}>
            <Image src={avatar} layout="responsive" alt="avatar" />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
