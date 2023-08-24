import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user, auth} = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
    console.log(auth);  
      await auth.signOut();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <nav className="bg-[#435334] p-4 fixed right-0 left-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-white text-lg md:text-xl font-semibold ml-2">SUMA (Surat Mattaher)</h1>
        </div>
        <div className="relative">
          <button
            className="text-white focus:outline-none"
            onClick={handleMenuClick}
          >
            <svg
                className="w-6 h-6 cursor-pointer"   
                stroke="currentColor"
                fill='white'     
                xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"/>
            </svg>
          </button>
          {isMenuOpen && (
          <div className="absolute top-10 right-0 bg-white shadow-md p-2 rounded w-fit">
            <p className="text-gray-800">email: {user.email}</p>
            <button
              className="text-red-600 hover:text-red-800 mt-1 transition"
              onClick={handleLogout}
            >
              <div className='flex items-center justify-between'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='red'>
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                </svg>
                <span className='ml-1'>
                  Logout
                </span>
              </div>
            </button>
          </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;