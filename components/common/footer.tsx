import { Box } from '@mui/material';
import * as React from 'react';

export function Footer() {
  console.log('render Footer');
  return (
    <Box component="footer" py={2} textAlign="center">
      Footer
    </Box>
  );
}
