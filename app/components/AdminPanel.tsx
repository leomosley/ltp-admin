import React, { useEffect, useState } from 'react';
import { fetchData } from '@/database/fetch-data';

// Components
import LogoutButton from './LogoutButton';
import Panel from './Panel';

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

interface Data extends WorkWithImages {
  uid: string;
}

export default function AdminPanel() {
  const [data, setData] = useState<Data[] | null>();
  
  fetchData().then((fetched) => {
    const array: Data[] = [];
    for (const id in fetched) {
      array.push({
        ...fetched[id],
        uid: id
      });
    }
    setData(array);
  });

  return (
   <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
      <div className="fixed top-0 right-[7px] z-10">
        <LogoutButton />
      </div>
        {data? (data.map((item: Data) => (
            <Panel key={item.uid} data={item} />
          ))
        ) : ( 
          <div className="fixed top-1/2 left-1/2 text-zinc-200 text-lg">Loading...</div>
          )
        }
   </div>
  );
}