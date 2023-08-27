import React from 'react';

function Pagination({ currentPage, totalPages, paginate }) {
  return (
    <div className="mt-4">
      <ul className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => paginate(index + 1)}
              className={`bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded text-[#435334] ${
                currentPage === index + 1 ? 'bg-gray-300' : ''
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;