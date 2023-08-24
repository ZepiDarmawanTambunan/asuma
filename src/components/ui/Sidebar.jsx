import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarLink from './SidebarLink';

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className="bg-[#FAF1E4] w-1/5 py-4 overflow-y-auto transition-width ease-in-out duration-500"
    >
      <div className="flex flex-col mt-20">
        <SidebarLink to="/" location={location}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="currentColor">
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
          </svg>
          <span className='ml-2'>
           Home
          </span>
        </SidebarLink>
        <SidebarLink to="/surat-masuk" location={location}>
          Surat Masuk
        </SidebarLink>
        <SidebarLink to="/surat-keluar" location={location}>
          Surat Keluar
        </SidebarLink>
        <div className='mb-4'>
          <div
            onClick={toggleCollapse}
            className={`block cursor-pointer py-2 text-base font-semibold px-3 mx-4 rounded hover:bg-[#263A29] hover:text-white transition duration-500 ${
              location.pathname === '/tes' ? 'bg-[#435334] text-white' : 'bg-[#CEDEBD] text-[#435334]'}`}
          >
            Tools
          </div>
          {isOpen && (
            <div className="px-4 py-2 bg-[#F5F5F5]">
              <Link
                to="/"
                className={`block px-4 py-2 text-sm text-[#435334] hover:bg-[#263A29] hover:text-white transition duration-500 ${
                  location.pathname === '/' ? 'bg-[#435334] text-white' : 'bg-[#CEDEBD] text-[#435334]'
                }`}
              >
                Home
              </Link>
              <Link
                to="/"
                className={`block px-4 py-2 text-sm text-[#435334] hover:bg-[#263A29] hover:text-white transition duration-500 ${
                  location.pathname === '/' ? 'bg-[#435334] text-white' : 'bg-[#CEDEBD] text-[#435334]'
                }`}
              >
                Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;