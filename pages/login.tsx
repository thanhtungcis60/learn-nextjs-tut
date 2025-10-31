import { LoginForm } from '@/components/auth';
import { useAuth } from '@/hooks';
import { LoginPayload } from '@/models';
import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth({ revalidateOnMount: false });

  async function handleLoginSubmit(payload: LoginPayload) {
    try {
      await login(payload);
      // console.log('Login redirect to home page');
      router.push('/');
    } catch (error) {
      console.log('failed to login ', error);
    }
  }

  return (
    <Box>
      <Paper
        elevation={4}
        sx={{
          mx: 'auto',
          my: 8,
          p: 4,
          maxWidth: '480px',
          textAlign: 'center',
        }}
      >
        <Typography component="h1" variant="h5" mb={3}>
          Easy Frontend - Login
        </Typography>

        <LoginForm onSubmit={handleLoginSubmit} />
      </Paper>
    </Box>
  );
}
