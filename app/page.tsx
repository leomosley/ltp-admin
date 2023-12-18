'use client';
import React, { useEffect, useState } from 'react';
import { auth } from '@/database/firebase';
import firebase from 'firebase/compat/app';
import styles from './page.module.css';

// Components
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // @ts-ignore
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [currentUser]);

  return (
    <section className="relative overflow-hidden w-screen h-screen">
      <div className="p-5 w-screen h-screen">
        {currentUser? (
          <AdminPanel />
          ) : (
          <Login />
        )}
      </div>
    </section>
  )
}
