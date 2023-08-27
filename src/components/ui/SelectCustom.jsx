import React from 'react';

const SelectCustom = ({ id, label, options, value, onChange }) => {
    return (
        <div className="mb-2">
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <select
            id={id}
            name={id}
            className="p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            value={value}
            onChange={onChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    };
    
    

export default SelectCustom;