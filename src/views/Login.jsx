import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { firebase } from '../config/firebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../context/AuthProvider';
import InputCustom from '../components/ui/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {user, isLoading: isLoadingAuth} = useAuth();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const auth = getAuth(firebase);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert('Login error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(!isLoadingAuth){
      if(user){
        navigate('/');
      }
    }
  }, [isLoadingAuth, user])

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-96 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <InputCustom
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          handleChange={setEmail}
        />
        <InputCustom
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          handleChange={setPassword}
        />
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;