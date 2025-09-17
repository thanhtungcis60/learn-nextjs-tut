import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDetailPageProps {}

export default function PostDetailPage(props: PostDetailPageProps) {
  const router = useRouter();
  return (
    <>
      <div>Post Detail Page</div>
      <p>Query: {JSON.stringify(router.query)}</p>
    </>
  );
}
