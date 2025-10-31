import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginPayload } from '@/models';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface LoginFormProps {
  onSubmit?: (payload: LoginPayload) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter username')
      .min(4, 'Username is required to have at least 4 characters'),

    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'Password is required to have at least 6 characters'),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  function handleLoginSubmit(payload: LoginPayload) {
    console.log(payload);
    onSubmit?.(payload);
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField name="username" label="Username" control={control} />
      <InputField
        type={showPassword ? 'text' : 'password'}
        name="password"
        control={control}
        label="Password"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((x) => !x)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
        Login
      </Button>
    </Box>
  );
}
