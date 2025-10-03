import { StudentDetail } from '@/components/swr';
import React, { useState } from 'react';

export default function SWRPage() {
  const [detailList, setDetailList] = useState([1, 1, 1]);
  function handleAddClick() {
    setDetailList((prevList) => [...prevList, 1]);
  }
  return (
    <div>
      <h1>SWR playground</h1>
      <button onClick={handleAddClick}>Add Detail</button>
      <ul>
        {detailList.map((x, index) => (
          <li key={index}>
            <StudentDetail studentId="e1e6cefa-af3b-48a2-867c-10205f79fb24" />
          </li>
        ))}
      </ul>
    </div>
  );
}
