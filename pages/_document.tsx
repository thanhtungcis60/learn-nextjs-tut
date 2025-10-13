//#region V1
// import { Html, Head, Main, NextScript } from "next/document";

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }
//#region V1

//#region V2
// import * as React from 'react';
// import { Html, Head, Main, NextScript, DocumentProps, DocumentContext } from 'next/document';
// import {
//   DocumentHeadTags,
//   DocumentHeadTagsProps,
//   documentGetInitialProps,
// } from '@mui/material-nextjs/v15-pagesRouter';
// import { roboto } from '@/utils';
// import theme from '@/utils/theme';

// export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
//   return (
//     <Html lang="en" className={roboto.className}>
//       <Head>
//         {/* PWA primary color */}
//         <meta name="theme-color" content={theme.palette.primary.main} />
//         <link rel="icon" href="/favicon.ico" />
//         <meta name="emotion-insertion-point" content="" />
//         <DocumentHeadTags {...props} />
//       </Head>
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }

// MyDocument.getInitialProps = async (ctx: DocumentContext) => {
//   const finalProps = await documentGetInitialProps(ctx);
//   return finalProps;
// };

//#endregion V2

import * as React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from '@mui/material-nextjs/v15-pagesRouter';
import { createEmotionCache, roboto } from '@/utils';

import createEmotionServer from '@emotion/server/create-instance';
import theme from '@/utils/theme';

export default class MyDocument extends Document {
  // static method nằm trong class: ở đây 'super' hợp lệ
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    // enhanceApp để inject emotion cache cho SSR
    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
      });

    // gọi super.getInitialProps (hoặc Document.getInitialProps)
    const initialProps = await (
      Document as unknown as {
        getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps>;
      }
    ).getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      // gộp styles để inject vào head
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
