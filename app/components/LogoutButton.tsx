import React from 'react';
import { auth } from '@/database/firebase';

export default function LogoutButton() {
  const logout = (): Promise<void> => {
    return auth.signOut();
  };

  return (
    <button
      className="flex w-auto mx-auto mt-2 items-center justify-center text-center gap-3 overflow-hidden rounded-lg p-1 pl-3 pr-3
                 text-lg font-bold border-2 border-neutral-400/10 bg-neutral-400/10 text-zinc-200
                 cursor-pointer disabled:cursor-not-allowed duration-300 hover:bg-neutral-400/20 hover:scale-105"
      onClick={logout}
    >Logout
    </button>
  )
}
