"use client"
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AdminPanel from './AdminPanel';
import { app } from '@/firebase/firebase';


const AdminPage = () => {
  const [user, setUser] = useState(null);
  const auth = app ? getAuth(app) : null;

  useEffect(() => {
    if (!auth) {
      return undefined;
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        window.location.href = '/login'; // Redirige a la página de login si no hay usuario
      }
    });
  }, [auth]);

  const handleLogout = async () => {
    if (!auth) {
      return;
    }
    await signOut(auth);
    window.location.href = '/login'; // Redirige a la página de login después del logout
  };

  if (!app) {
    return <div className="flex min-h-screen items-center justify-center px-6 text-center text-xl text-gray-600">Firebase is not configured. Add the values from .env.local.example to .env.local.</div>;
  }

  if (!user) return <div className="flex items-center justify-center h-screen text-xl text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-indigo-900 via-purple-700 to-purple-500 w-full text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-purple-800 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </header>
      <main className="p-6">
        <AdminPanel />
      </main>
    </div>
  );
};

export default AdminPage;
