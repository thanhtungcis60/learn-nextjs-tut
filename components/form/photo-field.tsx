'use client';

import { DEFAULT_THUMBNAIL_URL } from '@/constants';
import { Box, FormHelperText, TextFieldProps, Typography } from '@mui/material';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type PhotoFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
  label?: string;
};

export function PhotoField<T extends FieldValues>({ name, control, label, ...rest }: PhotoFieldProps<T>) {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    function initCloudinaryWidget() {
      //@ts-expect-error no type def support yet
      if (!window.cloudinary) {
        setTimeout(() => initCloudinaryWidget(), 500); //Chờ 500ms rồi gọi lại chính hàm này khi mà window.cloudinary chưa load kịp
        return;
      }
      // create Cloudinary widget on client
      if (typeof window === 'undefined') return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cloud = (window as any).cloudinary;
      if (!cloud) return;

      const myWidget = cloud.createUploadWidget(
        {
          cloudName: 'dvrntpyit',
          uploadPreset: 'easy-frontend',
          multiple: false,
          clientAllowedFormats: ['image'],
          maxImageFileSize: 200000,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            const secureUrl = result.info.secure_url;
            // update form value with uploaded image info
            onChange({ file: result.info, previewUrl: secureUrl });
          }
        },
      );
      widgetRef.current = myWidget;
    }
    initCloudinaryWidget();
  }, [onChange]);

  const openWidget = useCallback(() => {
    if (widgetRef.current) widgetRef.current.open();
  }, []);

  //value data, type
  //value có giá trị là:
  //-null
  //-{file:File, previewUrl:string}
  const previewUrl = value?.['previewUrl'] || DEFAULT_THUMBNAIL_URL;

  // render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
  return (
    <Box sx={{ my: 1.5 }}>
      <Typography variant="body2">{label}</Typography>
      {/* Click the image to open Cloudinary upload widget */}
      <Box
        onClick={openWidget}
        sx={{
          position: 'relative',
          display: 'inline-block',
          cursor: 'pointer',
          '&:hover .changeOverlay': {
            opacity: 1,
          },
        }}
      >
        <Image src={previewUrl} width={246} height={180} layout="fixed" alt="work thumbnail" />
        <Box
          className="changeOverlay"
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            textAlign: 'center',
            py: 0.5,
            fontSize: '0.875rem',
            opacity: 0,
            transition: 'opacity 200ms ease-in-out',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          }}
        >
          Change
        </Box>
      </Box>
      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      {/* <Box sx={{ mt: 1 }} hidden>
        <Button variant="outlined" size="small" onClick={openWidget}>
          Change Image
        </Button>
      </Box> */}
    </Box>
  );
}
