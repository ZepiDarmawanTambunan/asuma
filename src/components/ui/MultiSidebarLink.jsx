import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MultiSidebarLink({ location, title, children, to }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  if(location.pathname.split('/')[1] === ''){
    location = '/'
  }else{
    location = `/${location.pathname.split('/')[1]}`;
  }
  const isActive = location.includes(to);

  return (
    <div className='mb-4'>
      <div
        onClick={toggleCollapse}
        className={`block cursor-pointer py-2 text-base font-semibold px-3 mx-4 rounded hover:bg-[#263A29] hover:text-white transition duration-500 ${isActive ? 'bg-[#435334] text-white' : 'bg-[#CEDEBD] text-[#435334]'}`}
      >
        {title}
      </div>
      {isOpen && (
        <div className="px-4 py-2 bg-[#F5F5F5]">
            {children}
        </div>
      )}
    </div>
  );
}

export default MultiSidebarLink;