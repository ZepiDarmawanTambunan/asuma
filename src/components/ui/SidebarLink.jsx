import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ to, children, location }) => {
  if(location.pathname.split('/')[1] === ''){
    location = '/'
  }else{
    location = `/${location.pathname.split('/')[1]}`;
  }
  const isActive = location === to;


  return (
    <Link
      to={to}
      className={`py-2 text-base flex items-center justify-center md:justify-start font-semibold px-3 mx-4 rounded hover:bg-[#263A29] hover:text-white transition duration-500 mb-4 ${isActive ? 'bg-[#435334] text-white' : 'bg-[#CEDEBD] text-[#435334]'}`}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;