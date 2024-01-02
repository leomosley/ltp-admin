import React, { useState } from 'react';
import { getAll } from '@/api/database/fetch/route';

// Components
import LogoutButton from './LogoutButton';
import Panel from './Panel';

interface ImageMap {
  [key: string]: string;
}

interface FetchResponse {
  id: string;
  description: string;
  title: string;
  type: string;
  images: ImageMap;
}

export default function AdminPanel() {
  const [data, setData] = useState<FetchResponse[] | null>();
  
  getAll().then((response) => {
    setData(response);
  });

  return (
   <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
      <div className="fixed top-0 right-[7px] z-10">
        <LogoutButton />
      </div>
        {data? (data.map((item: FetchResponse) => (
            <Panel key={item.id} data={item} />
          ))
        ) : ( 
          <div className="fixed top-1/2 left-1/2 text-zinc-200 text-lg">Loading...</div>
          )
        }
   </div>
  );
}