import React from 'react';
import { auth } from '@/database/firebase';


export default function AdminPanel() {

  const logout = (): Promise<void> => {
    return auth.signOut();
  };

  return (
    <button onClick={logout}>logout</button>
  )
}
