import React, { useState } from 'react';

function SearchBar({ onSearch, placeholder }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      <input
        type="text"
        className="border border-gray-300 rounded p-2 w-full md:w-3/4"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-[#435334] hover:bg-[#263A29] text-white  rounded p-2"
        onClick={handleSearch}
      >
        Cari
      </button>
    </div>
  );
}

export default SearchBar;