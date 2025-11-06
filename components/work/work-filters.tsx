import { WorkFiltersPayload } from '@/models';
import { Search } from '@mui/icons-material';
import { Box, debounce, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InputField } from '../form';
import { ChangeEvent } from 'react';

export interface WorkFiltersProps {
  onSubmit?: (payload: WorkFiltersPayload) => void;
}

export function WorkFilters({ onSubmit }: WorkFiltersProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
    },
  });
  async function handleSearchSubmit(payload: WorkFiltersPayload) {
    console.log('payload: ', payload);
    await onSubmit?.(payload);
  }

  const debounceSeachChange = debounce(handleSubmit(handleSearchSubmit), 350); //manually trigger form submit after user stops typing for 350ms

  return (
    <Box component="form">
      <InputField
        name="search"
        placeholder="search work by title"
        control={control}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          },
        }}
        onChange={() => {
          debounceSeachChange();
        }}
      />
    </Box>
  );
}
