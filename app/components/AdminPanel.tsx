import React, { useEffect, useState } from 'react';
import { fetchData } from '@/database/fetch-data';

// Components
import LogoutButton from './LogoutButton';
import Card from './Card';

export default function AdminPanel() {
  const [works, setWorks] = useState();
  const [images, setImages] = useState();
  
  const data: Promise<any> = fetchData().then((value) => {
    setWorks(value.work);
    setImages(value.image);
  });

  // Map works whilst maintaining uid
  return (
   <div className="">
      <div className="fixed top-0 right-2">
        <LogoutButton />
      </div>
   </div>
  )
}
