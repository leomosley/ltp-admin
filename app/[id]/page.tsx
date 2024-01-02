'use client';
import React, { use, useEffect, useState } from 'react';
import { usePathname, redirect,  useRouter } from 'next/navigation';
import { getData } from '@/api/database/fetch/route';
import Image from 'next/image';
import Link from 'next/link';

// Components
import Card from '../components/Card';
import { updateData } from '@/api/database/post/route';
import { auth } from '@/api/firebase';
import { redir } from '../actions';

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

export default function Admin() {
  const router = useRouter();
  const pathname = usePathname();
  const id = decodeURI(pathname).slice(1);

  const [data, setData] = useState<FetchResponse| undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [titleKey, setTitleKey] = useState<number>(0);
  const [type, setType] = useState<string | undefined>(undefined);
  const [typeKey, setTypeKey] = useState<number>(0);
  const [desc, setDesc] = useState<string | undefined>(undefined);
  const [descKey, setDescKey] = useState<number>(0);

  useEffect(() => {

    if (!auth.currentUser) {
      redir();
    } else if (id) {
      setLoading(true);
      // @ts-ignore
      getData(id).then((response: FetchResponse) => {
        if (response) {
          setData(response);
          setTitle(response.title);
          setType(response.type);
          setDesc(response.description);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const ResetIcon = () => {
    return (
      <div>
        <svg className="h-full w-full text-zinc-400"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" /></svg>
      </div>
    );
  }

  const handleUpdate = () => {
    setLoading(true);
    const post = {
      title: title,
      description: desc,
      type: type,
      images: data?.images,
    };
    updateData(id, post).then(() => {
      setLoading(false);
    });
  }

  const handleReset = () => {
    setLoading(true);
    setTitle(data?.title);
    setTitleKey(prev => prev + 1);
    setType(data?.type);
    setTypeKey(prev => prev + 1);
    setDesc(data?.description);
    setDescKey(prev => prev + 1);
    setLoading(false);
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
        <div className="flex p-5 gap-5 sm:flex-wrap">
          <div className="flex flex-col w-[300px] sm:w-[500px] gap-5">
            <div className="w-full">
              <Card>
                <div className="flex gap-2 p-2 mb-2 border-2 border-solid border-zinc-400/20 rounded-xl">
                  <textarea 
                    key={titleKey}
                    className="bg-inherit text-zinc-200 text-3xl font-bold w-full resize-none" 
                    defaultValue={title && title}
                    onChange={(e) => setTitle(e.target.value)}
                    readOnly={loading}
                  />
                  <button 
                    className="w-6 h-6 justify-center items-center ml-auto"
                    onClick={() => {
                      setTitle(data.title);
                      setTitleKey(prev => prev + 1);
                    }}
                    disabled={loading}
                  >
                    <ResetIcon />
                  </button>
                </div>
                <div className="flex gap-2 p-2 mb-2 border-2 border-solid border-zinc-400/20 rounded-xl">
                  <textarea 
                    key={typeKey}
                    className="bg-inherit text-zinc-400 text-xl font-bold w-full resize-none" 
                    defaultValue={type && type}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <button 
                    className="w-6 h-6 justify-center items-center ml-auto"
                    onClick={() => {
                      setType(data.type);
                      setTypeKey(prev => prev + 1);
                    }}
                    disabled={loading}
                  >
                    <ResetIcon />
                  </button>
                </div>
              </Card>
            </div>
            <div className="w-full h-[300px] sm:h-[500px]">
              <Card>
                <div className="flex gap-2 h-full">
                  <textarea 
                    key={descKey}
                    className="bg-inherit text-zinc-400 w-full h-full resize-none" 
                    defaultValue={desc && desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <button 
                    className="w-6 h-6 justify-center items-center ml-auto"
                    onClick={() => {
                      setDesc(data.description);
                      setDescKey(prev => prev + 1);
                    }}
                    disabled={loading}
                  >
                    <ResetIcon />
                  </button>
                </div>
              </Card>
            </div>
          </div>
          <div className="flex flex-col w-[300px] gap-5">
            <div className="w-full h-[85%]">
              <Card title='Images'>
                {data && Object.values(data.images).map((url, index) =>(
                  <div key={index}>
                    <Image 
                      src={url}
                      width={50}
                      height={50}
                      alt={`image${index}`}
                    />
                  </div>
                ))}
              </Card>
            </div>
            <div className="w-full h-[15%]">
              <Card>
                <div className="flex w-full h-full p-2 justify-center align-center gap-5">
                  <button
                    className="flex w-auto items-center justify-center text-center gap-3 overflow-hidden rounded-lg p-1 pl-3 pr-3
                    text-2xl font-bold border-2 border-neutral-400/10 bg-neutral-400/10 text-zinc-200
                    cursor-pointer disabled:cursor-not-allowed duration-300 hover:bg-neutral-400/20 hover:scale-105"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    className="flex w-auto items-center justify-center text-center gap-3 overflow-hidden rounded-lg p-1 pl-3 pr-3
                    text-2xl font-bold border-2 border-neutral-400/10 bg-neutral-400/10 text-zinc-200
                    cursor-pointer disabled:cursor-not-allowed duration-300 hover:bg-neutral-400/20 hover:scale-105"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
      {!data && <div className="fixed top-1/2 left-1/2 text-zinc-200 text-lg">Loading...</div>}
    </div>
  )
}