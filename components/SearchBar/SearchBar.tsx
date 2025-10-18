import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

interface SearchBarProps {
  updateSearchParam: (newValue: string) => void;
  placeholderText: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ updateSearchParam, placeholderText }) => {
  return (
    <div
      data-testid="search-bar-container"
      className="flex items-center justify-between flex-wrap space-y-4 md:space-y-0 p-4 w-full mb-2 overflow-hidden"
    >
      <div className="relative">
        <div
          data-testid="search-bar-icon"
          className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <MagnifyingGlass size={20} className='text-[#FFA41F]' />
        </div>
        <input
          data-testid="search-bar-input"
          type="text"
          className="block w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholderText}
          onChange={(e) => updateSearchParam(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
