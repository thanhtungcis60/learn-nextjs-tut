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

'use client';

import { Box, FormHelperText, TextFieldProps, Typography } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
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
        // image: imageHandler,
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
        <ReactQuill theme="snow" modules={modules} formats={formats} />
      </Box>
      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
    </Box>
  );
}
