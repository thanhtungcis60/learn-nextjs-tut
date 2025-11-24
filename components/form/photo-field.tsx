'use client';

import { DEFAULT_THUMBNAIL_URL } from '@/constants';
import { Box, FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type PhotoFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

export function PhotoField<T extends FieldValues>({ name, control, label, ...rest }: PhotoFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    console.log({ url });
    onChange({
      file,
      previewUrl: url,
    });
  }

  //value data, type
  //value có giá trị là:
  //-null
  //-{file:File, previewUrl:string}
  const previewUrl = value?.previewUrl || DEFAULT_THUMBNAIL_URL;
  const inputId = `photo-field-${name}`;

  // render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
  return (
    <Box sx={{ my: 1.5 }}>
      <Typography variant="body2">{label}</Typography>
      {/* Thẻ htmlFor để khi người dùng ấn vào ảnh sẽ tự trigger click vào nút chọn file ở dưới */}
      <Box component="label" htmlFor={inputId} sx={{ cursor: 'pointer' }} ref={ref}>
        <Image src={previewUrl} width={246} height={180} layout="fixed" alt="work thumbnail" />
      </Box>
      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      <Box
        id={inputId}
        component="input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      ></Box>
    </Box>
  );
}
