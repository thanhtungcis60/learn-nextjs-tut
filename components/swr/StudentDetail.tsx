import * as React from 'react';
import useSWR from 'swr';

export interface StudentDetailProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  studentId: any;
}

const MILISECOND_PER_HOUR = 60 * 60 * 1000;
export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false,
    dedupingInterval: MILISECOND_PER_HOUR,
  });
  function handleMutateClick() {
    mutate({ name: 'Loading...' }, true);
  }
  return (
    <div>
      Name: {data?.name || '--'} <button onClick={handleMutateClick}>mutate</button>
    </div>
  );
}
