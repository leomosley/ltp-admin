'use client';
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/database/firebase';

// Components
import Card from './Card';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>('');

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    const login = (email: string, password: string): Promise<firebase.auth.UserCredential> => {
      // @ts-ignore
      return signInWithEmailAndPassword(auth, email, password);
    };

    try {
      setLoading(true);
      await login(email, password)
    } catch (error) {
      setError(error);
      throw error;
    }
    setLoading(false);
  }
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="w-[300px] sm:w-2/4 lg:w-1/3">
        <Card>
          <div className="flex justify-center items-center m-auto w-[80%] h-20">
            <span className="text-3xl font-bold text-zinc-200 tracking-tight">Login</span>
          </div>
          <div className="flex flex-col gap-1 m-auto w-[80%] min-h-50">
            <label className="text-xl font-bold text-zinc-200 tracking-tight">Email</label>
            <input
              className="mb-3 p-2 rounded-lg border-2 border-neutral-400/10 bg-neutral-400/10 text-zinc-200" 
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <label className="text-xl font-bold text-zinc-200 tracking-tight">Password</label>
            <input 
              className="mb-3 p-2 rounded-lg border-2 border-neutral-400/10 bg-neutral-400/10 text-zinc-200" 
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
              required/>
            <button 
              className="flex w-auto mx-auto mt-2 items-center justify-center text-center gap-3 overflow-hidden rounded-lg p-1 pl-3 pr-3
                         text-lg font-bold border-2 border-neutral-400/10 bg-neutral-400/10 text-zinc-200
                         cursor-pointer disabled:cursor-not-allowed duration-300 hover:bg-neutral-400/20 hover:scale-105"
              type="submit" 
              onClick={handleSumbit}
              disabled={loading || (email.length === 0 || password.length === 0)}
            >Login
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
