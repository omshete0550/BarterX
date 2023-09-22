import React from "react";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";
import * as Framer from "https://esm.sh/framer-motion@10.9.1";
import useOnClickOutside from "https://esm.sh/use-onclickoutside@0.4.1";
import './Search.css'

const Search = (props) => {
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  useOnClickOutside(searchRef, () => {
    setQuery("");
  });

  const onSearch = (e) => {
    const value = e.target.value;

    setQuery(value);
  };

  const isSearching = query?.length > 0;
  return (
    <div className="w-full search-container max-w-2xl" ref={searchRef}>
      <form role="search" action="/search" className="search relative">
        <div className="relative z-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search something
          </label>

          <input
            type="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            name="q"
            placeholder="Search something"
            title="Search"
            role="searchbox"
            aria-label="Search"
            aria-autocomplete="list"
            required
            id="search"
            className={`block w-full outline-0 p-4 pl-10 text-sm text-gray-900 bg-white  ${
              isSearching ? "" : "border border-gray-300 "
            }`}
            onChange={onSearch}
            value={query}
          />
        </div>
        <SearchResultList isLoading open={isSearching} />
      </form>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div role="status" className="max-w-md animate-pulse p-4">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

function SearchResultList({ data, isLoading, open }) {
  return (
    <Framer.AnimatePresence initial={false}>
      {open && (
        <Framer.motion.div
          animate={{ transform: "translateY(calc(20px))" }}
          role="listbox"
          className="search__result"
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <div className="flex items-center justify-center min-h-[54px] search__content">
            <div className="w-full">
              <LoadingSkeleton />
            </div>
          </div>
        </Framer.motion.div>
      )}
    </Framer.AnimatePresence>
  );
}

export default Search;
