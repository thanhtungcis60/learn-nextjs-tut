//#region react-draft-wysiwyg
// 'use client';

// import { Box, FormHelperText, TextFieldProps, Typography } from '@mui/material';
// import { Control, FieldValues, Path, useController } from 'react-hook-form';
// import dynamic from 'next/dynamic';
// const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { useState, useEffect } from 'react';
// import { ContentState, convertToRaw, EditorState } from 'draft-js';

// // const MUIRichTextEditor = dynamic(() => import('mui-rte'), { ssr: false });
// export type EditorFieldProps<T extends FieldValues> = TextFieldProps & {
//   name: Path<T>;
//   control: Control<T>;
//   label?: string;
// };

// export function EditorField<T extends FieldValues>({ name, control, label }: EditorFieldProps<T>) {
//   const {
//     field: { onChange, value, ref },
//     fieldState: { error },
//   } = useController({
//     name,
//     control,
//   });

//   // Khởi tạo editorState từ value (HTML hoặc raw)
//   const [editorState, setEditorState] = useState(() =>
//     value ? EditorState.createWithContent(ContentState.createFromText(value)) : EditorState.createEmpty(),
//   );

//   useEffect(() => {
//     if (value && value !== editorState.getCurrentContent().getPlainText()) {
//       setEditorState(EditorState.createWithContent(ContentState.createFromText(value)));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [value]);

//   const handleEditorStateChange = (state: EditorState) => {
//     setEditorState(state);
//     const rawContent = convertToRaw(state.getCurrentContent());
//     const plainText = state.getCurrentContent().getPlainText();
//     onChange(plainText); // hoặc lưu rawContent nếu muốn lưu dạng JSON
//   };

//   return (
//     <Box sx={{ my: 1.5 }}>
//       <Typography variant="body2">{label}</Typography>
//       <Box>
//         <Editor
//           editorState={editorState}
//           toolbar={{
//             options: ['inline', 'list', 'image'],
//             inline: {
//               options: ['bold', 'italic', 'underline'],
//             },
//             list: {
//               options: ['unordered', 'ordered'],
//             },
//             image: {
//               className: undefined,
//               component: undefined,
//               popupClassName: undefined,
//               urlEnabled: true,
//               uploadEnabled: true,
//               alignmentEnabled: true,
//               uploadCallback: undefined,
//               previewImage: false,
//               inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
//               alt: { present: false, mandatory: false },
//               defaultSize: {
//                 height: 'auto',
//                 width: 'auto',
//               },
//             },
//           }}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="custom-editor-wrapper"
//           editorClassName="editorClassName"
//           onEditorStateChange={handleEditorStateChange}
//         />
//       </Box>
//       <FormHelperText error={!!error}>{error?.message}</FormHelperText>
//     </Box>
//   );
// }
//#endregion react-draft-wysiwyg

'use client';

import { Box, FormHelperText, TextFieldProps, Typography } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import type { LegacyRef } from 'react';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface ReactQuillWrapperProps extends ReactQuillProps {
  forwardedRef: LegacyRef<ReactQuill>;
}
const ReactQuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    const Component = ({ forwardedRef, ...props }: ReactQuillWrapperProps) => {
      return <RQ ref={forwardedRef} {...props} />;
    };
    return Component;
  },
  { ssr: false },
);
import 'react-quill/dist/quill.snow.css';

// const MUIRichTextEditor = dynamic(() => import('mui-rte'), { ssr: false });
export type EditorFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
  label?: string;
};

export function EditorField<T extends FieldValues>({ name, control, label }: EditorFieldProps<T>) {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const editorRef = useRef(null);
  const cloudinaryWidgetRef = useRef(null);

  useEffect(() => {
    function initCloudinaryWidget() {
      //@ts-expect-error no type def support yet
      if (!window.cloudinary) {
        setTimeout(() => initCloudinaryWidget(), 500); //Chờ 500ms rồi gọi lại chính hàm này khi mà window.cloudinary chưa load kịp
        return;
      }
      //@ts-expect-error no type def support yet
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dvrntpyit',
          uploadPreset: 'easy-frontend',
          multiple: false, // restrict upload to a single file
          clientAllowedFormats: ['image'], // restrict uploading to image files only
          maxImageFileSize: 200000, // restrict file size to less than 2MB
          // sources: ["local", "url"], // restrict the upload sources to URL and local files
          // folder: "user_images", // upload files to the specified folder
          // tags: ["users", "profile"], // add the given tags to the uploaded files
          // context: { alt: "user_uploaded" }, // add the given context data to the uploaded files
          // maxWidth: 2000, // Scales the image down to a width of 2000 pixels before uploading
          // theme: "purple", // Change to a purple theme
        },
        //@ts-expect-error no type support yet
        (error, result) => {
          if (!error && result && result.event === 'success') {
            const quill = editorRef.current;
            //@ts-expect-error no type support yet
            const range = quill?.getEditorSelection?.();
            // console.log({ quill, range });
            if (quill && range) {
              //@ts-expect-error no type support yet
              quill.getEditor()?.insertEmbed?.(range.index, 'image', result.info.secure_url);
            }
          }
        },
      );
      cloudinaryWidgetRef.current = myWidget;
    }
    initCloudinaryWidget();
  }, []);

  const imageHandler = useCallback(() => {
    console.log('select image click');
    //@ts-expect-error no type support
    if (cloudinaryWidgetRef.current) cloudinaryWidgetRef.current.open?.();
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ color: [] }, { background: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
  ];

  return (
    <Box sx={{ my: 1.5 }}>
      <Typography variant="body2">{label}</Typography>
      <Box>
        <ReactQuillWrapper
          forwardedRef={editorRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          onChange={(content) => {
            onChange(content);
          }}
        />
      </Box>
      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
    </Box>
  );
}
