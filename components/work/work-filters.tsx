import { WorkFiltersPayload } from '@/models';
import { Search } from '@mui/icons-material';
import { Box, debounce, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AutoCompleteField, InputField } from '../form';
import { ChangeEvent, useMemo } from 'react';

export interface WorkFiltersProps {
  initialValues?: WorkFiltersPayload;
  onSubmit?: (payload: WorkFiltersPayload) => void;
}

export function WorkFilters({ initialValues, onSubmit }: WorkFiltersProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
      selectedTagList: [],
      ...initialValues,
    },
  });
  async function handleSearchSubmit(payload: WorkFiltersPayload) {
    console.log('handleSearchSubmit.payload: ', payload);
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
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          debounceSeachChange();
        }}
      />

      <AutoCompleteField
        name="selectedTagList"
        label="Filter by category"
        placeholder="Categories"
        control={control}
        options={[
          { title: 'easy', key: 'ez' },
          { title: 'frontend', key: 'fr' },
        ]}
        getOtpionLabel={(otion) => otion.key}
        isOptionEqualToValue={(option, value) => option.key === value.key}
        onChange={() => debounceSeachChange()}
      />

      {/* <AutoCompleteField
        name="taglist_search"
        label="Filter by category"
        placeholder="filter by category"
        control={control}
        options={['easy', 'frontend']}
        getOtpionLabel={(otion) => otion}
      /> */}
    </Box>
  );
}
