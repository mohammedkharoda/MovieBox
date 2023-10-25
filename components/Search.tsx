"use client";
import React, { useState, useEffect, useDeferredValue } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: number;
  title: string;
  name: string;
}
const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const searchTitle = useDeferredValue(query);
  useEffect(() => {
    handleSearch();
  }, [searchTitle]);
  const handleSearch = async () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            // Add your API key here
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (id: any) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="relative">
      {" "}
      {/* Add a container with 'relative' positioning */}
      <div className="flex items-center text-[#fff] border border-1 py-[6px] px-[10px] min-w-[505px] justify-between">
        <input
          type="text"
          placeholder="What do you want to watch?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none w-full text-[#fff] placeholder-[#fff]::placeholder"
        />
        <BiSearchAlt size={20} onClick={handleSearch} />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full left-0 bg-transparent/80 border border-1 min-w-[505px] z-10 mt-1">
          {/* Add this container for search results */}
          <div className="text-[#fff]">
            {results.map((result) => (
              <div
                key={result.id}
                onClick={() => handleResultClick(result.id)}
                className="cursor-pointer hover:bg-white hover:text-black"
              >
                {result.title || result.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
