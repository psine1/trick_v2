"use client";
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from '@/firebase/firebase';
import LoginLayout from './LoginLayout';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); 

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!app) {
      setError('Firebase is not configured. Add the values from .env.local.example to .env.local.');
      return;
    }
    const auth = getAuth(app);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/admin'; 
    } catch (err) {
      setError('Failed to sign in. Please check your credentials and try again.');
      console.error(err);
    }
  };

  const handlePasswordReset = async () => {
    if (!app) {
      setError('Firebase is not configured. Add the values from .env.local.example to .env.local.');
      return;
    }

    const auth = getAuth(app);

    if (!email) {
      setError('Please enter your email to reset your password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
      setError(null); 
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
      console.error(err);
    }
  };

  return (
    <LoginLayout>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input 
                id="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input 
                id="password"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Forgot your password?</p>
            <button 
              onClick={handlePasswordReset} 
              className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Recover password
            </button>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;
