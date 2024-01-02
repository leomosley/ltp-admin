'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

// Components
import Card from './Card';

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

export default function Panel({ key, data } : { key: string, data: FetchResponse }) {
  const router = useRouter();
  console.log(data);
  
  return (
    <div 
      className="h-[225px] w-[275px] sm:w-[300px] sm:h-[250px] rounded-3xl cursor-pointer"
      onClick={() => router.push(`/${encodeURI(data.id)}`)}
    >
      <Card title={data.title} description={data.id}>
        <div>
          
        </div>
      </Card>
    </div>
  )
}