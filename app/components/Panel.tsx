'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

// Components
import Card from './Card';

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

export default function Panel({ key, data } : { key: string, data: Data }) {
  const router = useRouter();

  return (
    <div 
      className="h-[225px] w-[275px] sm:w-[300px] sm:h-[250px] rounded-3xl cursor-pointer"
      onClick={() => router.push(`/${data.uid}`)}
    >
      <Card title={data.name} description={data.uid}>
        <div>
          
        </div>
      </Card>
    </div>
  )
}