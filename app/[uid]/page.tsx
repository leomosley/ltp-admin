'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { fetchData } from '@/database/fetch-data';
import Image from 'next/image';
import Link from 'next/link';

// Components
import Card from '../components/Card';

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
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    fetchData().then((fetched) => {
      if (fetched) {
        setData(fetched[uid]);
      }
    });
  }, [uid]);

  const EditIcon = () => { 
    return (
      <>
        <svg className="h-full w-full text-zinc-200" width="24"  height="24"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  
            fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"
        >  
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </>
    );
  }

  const WorkTitle = () => {
    return (
      <div className="flex gap-2 p-2 mb-2 border-2 border-solid border-zinc-400/20 rounded-xl">
        <span className="text-zinc-200 text-3xl font-bold">{data?.name}</span>
        <button 
          className="w-5 h-5 justify-center items-center ml-auto"
          disabled={loading}
        >
          <EditIcon />
        </button>
      </div>
    );
  }

  const WorkType = () => {
    return (
      <div className="flex gap-2 p-2 border-2 border-solid border-zinc-400/20 rounded-xl">
        <span className="text-zinc-400 text-xl font-bold">{data?.type}</span>
        <button 
          className="w-5 h-5 justify-center items-center ml-auto"
          disabled={loading}
        >
          <EditIcon />
        </button>
      </div>
    );
  }

  const WorkDescription = () => {
    return (
      <div className="w-full">
        <Card>
          <div className="flex gap-2 p-2 border-2 border-solid border-zinc-400/20 rounded-xl">
            <span className="text-zinc-400 w-[90%]">{data?.description}</span>
            <button 
              className="w-5 h-5 justify-center items-center ml-auto"
              disabled={loading}
            >
              <EditIcon />
            </button>
          </div>
        </Card>
      </div>
    );
  }

  const Images = () => {
    return (
      <div className="w-full h-[85%]">
        <Card>
          <div>
            Images
          </div>
        </Card>
      </div>
    );
  }

  const Buttons = () => {
    return (
      <div className="w-full h-[15%]">
        <Card>
          <div>
            Buttons
          </div>
        </Card>
      </div>
    );
  }
  return (
    <div className="flex justify-center p-5 w-screen">
      <Link 
        className="fixed left-0 top-0 w-10 h-10 p-1"
        href="/"
      >
        <svg 
          className="w-full h-full text-zinc-200" 
          viewBox="0 0 24 24"  
          fill="none"  
          stroke="currentColor"  
          stroke-width="2"  
          stroke-linecap="round"  
          stroke-linejoin="round"
        >  
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </Link>
      {data && (
        <div className="flex p-5 gap-5">
          <div className="flex flex-col w-[300px] sm:w-[500px] gap-5">
            <div className="w-full">
              <Card>
                <WorkTitle />
                <WorkType />
              </Card>
            </div>
            <WorkDescription />
          </div>
          <div className="flex flex-col w-[300px] gap-5">
            <Images />
            <Buttons />
          </div>
        </div>
      )}
      {!data && <div className="fixed top-1/2 left-1/2 text-zinc-200 text-lg">Loading...</div>}
    </div>
  )
}