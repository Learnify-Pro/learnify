import React from "react";
import { FaFilePdf, FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, handleSearch }) => (
  <div className="relative w-full max-w-md">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearch}
      className="block w-full px-4 py-2 mb-4 pl-8 pr-12 mt-4 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <FaSearch className="text-gray-400" />
    </div>
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <FaFilePdf className="text-gray-400" />
    </div>
  </div>
);

export default SearchBar;
