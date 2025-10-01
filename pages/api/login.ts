// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import { IncomingMessage, ServerResponse } from 'http';
import Cookies from 'cookies';

type Data = {
  message: string;
};
const proxy = httpProxy.createProxyServer();
export const config = {
  api: {
    bodyParser: false, //disable body parsing, consume as stream
  },
};
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Method not supported' });
  }
  return new Promise<void>((resolve) => {
    console.log('login request');
    //don't send cookies to API server
    req.headers.cookie = '';
    req.headers['accept-encoding'] = 'identity';

    const handleLoginResponse = (_proxyRes: IncomingMessage, _req: IncomingMessage, _res: ServerResponse) => {
      let body = '';
      _proxyRes.on('data', function (chunk) {
        body += chunk;
      });
      _proxyRes.on('end', function () {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);
          //Convert token to cookie
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt * 1000),
          });
          (res as NextApiResponse).status(200).json({ message: 'Login successfully' });
        } catch (error) {
          (res as NextApiResponse).status(500).json({ message: 'something went wrong' });
        }
        resolve();
      });
    };

    proxy.once('proxyRes', handleLoginResponse);

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
