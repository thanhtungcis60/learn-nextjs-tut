// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pagination: any;
    }
  | { name: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    return res.status(404).json({ name: 'Method not supported' });
  }
  const response = await fetch('https://json-server-na4j.onrender.com/api/students?_page=1&_limit=10');
  const responseJSON = await response.json();
  res.status(200).json(responseJSON);
}
