import { useTagList } from '@/hooks';
import { WorkPayload } from '@/models';
import { Box, Button } from '@mui/material';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AutoCompleteField, InputField } from '../form';
import { yupResolver } from '@hookform/resolvers/yup';

export interface WorkFormProps {
  initialValues?: Partial<WorkPayload>;
  onSubmit?: (payload: Partial<WorkPayload>) => void;
}

export function WorkForm({ initialValues, onSubmit }: WorkFormProps) {
  const schema = yup.object().shape({
    title: yup.string().required('please enter work title'),
    shortDescription: yup.string().required('please enter work description'),
    tagList: yup.array().of(yup.string()).min(1, 'Please select at least one category'),
  });

  const { data } = useTagList({});
  const tagList = data?.data || [];
  const { control, handleSubmit } = useForm<Partial<WorkPayload>>({
    defaultValues: {
      title: '',
      shortDescription: '',
      tagList: [],
      ...initialValues,
    },
    resolver: yupResolver(schema) as Resolver<Partial<WorkPayload>>,
  });
  async function handleFormSubmit(payload: Partial<WorkPayload>) {
    console.log('form submit.payload: ', payload);

    // await onSubmit?.(payload);
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField name="title" label="Title" placeholder="Your work title" control={control} />
      <InputField
        name="shortDescription"
        label="Short Description"
        placeholder="Your work description"
        control={control}
        slotProps={{
          input: {
            multiline: true,
            rows: 3,
          },
        }}
      />

      <AutoCompleteField
        name="tagList"
        label="Categories"
        control={control}
        options={tagList}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getOtpionLabel={(option: any) => option}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        isOptionEqualToValue={(option: any, value: any) => option === value}
      />
      <Button variant="contained" type="submit" size="medium">
        {Boolean(initialValues?.id) ? 'Save' : 'Submit'}
      </Button>
    </Box>
  );
}
