import { Box, Icon, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, url: 'https://www.google.com/search?q=Facebook' },
    { icon: Instagram, url: 'https://www.google.com/search?q=Instagram' },
    { icon: Twitter, url: 'https://www.google.com/search?q=Twitter' },
    { icon: LinkedIn, url: 'https://www.google.com/search?q=LinkedIn' },
  ];
  return (
    <Box component="footer" py={2} textAlign="center">
      <Stack direction="row" justifyContent="center">
        {socialLinks.map((item, idx) => (
          <Box key={idx} component="a" p={2} href={item.url} target="_blank" rel="nopener noreferrer">
            <Icon component={item.icon} sx={{ fontSize: 48 }} />
          </Box>
        ))}
      </Stack>
      <Typography>Copyright @{new Date().getFullYear()} All rights reserved</Typography>
    </Box>
  );
}
