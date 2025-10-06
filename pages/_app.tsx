// import axiosClient from '@/api-client/axios-client';
// import { EmptyLayout } from '@/components/layout';
// import { AppPropsWithLayout } from '@/models';
// import '@/styles/globals.css';
// import type { AppProps } from 'next/app';
// import { SWRConfig } from 'swr';

// export default function App({ Component, pageProps }: AppPropsWithLayout) {
//   console.log('App re-render');
//   const Layout = Component.Layout ?? EmptyLayout;
//   return (
//     <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </SWRConfig>
//   );
// }

import axiosClient from '@/api-client/axios-client';
import { EmptyLayout } from '@/components/layout';
import { AppPropsWithLayout } from '@/models';
import '@/styles/globals.css';
import theme from '@/utils/theme';
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SWRConfig } from 'swr';

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps, emotionCache } = props;
  console.log('App re-render');
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
