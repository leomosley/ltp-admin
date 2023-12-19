'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { fetchData } from '@/database/fetch-data';

interface ImageObject {
  imageURL: string;
}

interface WorkImages {
  [uid: string]: ImageObject;
}

interface Work {
  date: string;
  description: string;
  id: string;
  name: string;
  type: string;
}

interface WorkWithImages extends Work {
  images: WorkImages;
}

export default function Admin() {
  const router = useRouter();
  const pathname = usePathname();
  const uid = decodeURI(pathname).slice(1);

  const [data, setData] = useState<WorkWithImages | null>();
  
  fetchData().then((fetched) => {
    if (fetched) {
      setData(fetched[uid]);
    }
  });

  const WorkTitle = () => {
    return (
      <div className="text-slate-100">
        {data && data.name}
      </div>
    );
  }

  const WorkType = () => {
    return (
      <div className="text-slate-100">
        {data && data.type}
      </div>
    );
  }

  const WorkDescription = () => {
    return (
      <div className="text-slate-100">
        {data?.description}
      </div>
    );
  }

  const Images = () => {
    return (
      <div className="text-slate-100">
        Images
      </div>
    );
  }


  return (
    <div className="p-5 w-screen h-screen">
      {data && (
        <div>
          <WorkTitle />
          <WorkType />
          <WorkDescription />
          <Images /> className="text-slate-100"
        </div>
      )}
      {!data && <div className="fixed top-1/2 left-1/2 text-slate-100 text-lg">Loading...</div>}
    </div>
  )
}