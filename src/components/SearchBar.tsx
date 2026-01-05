// import React from "react";

const SearchBar = () => {
  return (
    <div className="flex mx-auto justify-center items-center gap-3 mt-12 max-w-7xl">
      <div className="">
        <input
          type="text"
          placeholder="Search for a Place..."
          className="px-4 py-3 font-sans text-md  flex-1 w-[480px] rounded-lg bg-white/15 placeholder-gray-200 cursor-pointer
          focus:outline-none focus:ring-1 focus:ring-white"
        />
      </div>
      <div>
        <button
          className="px-6 py-3 bg-indigo-600 rounded-md font-sans text-sm
         focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
