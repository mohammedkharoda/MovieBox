"use client";
import React, { useState, useEffect, useDeferredValue } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: number;
  title: string;
  name: string;
  media_type: string;
}
const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
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
        setShowResults(true);
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

  const handleResultClick = (id: any, mediaType: string) => {
    setShowResults(false);
    if (mediaType === "movie") {
      router.push(`/movie/${id}`);
    } else if (mediaType === "tv") {
      router.push(`/tv/${id}`);
    }
    setQuery("");
  };
  return (
    <div className="relative">
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div
            className="grid place-items-center h-full w-12 text-gray-300"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search something.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      {results.length > 0 && showResults && (
        <div className="absolute top-full left-0 bg-transparent/80 border border-1 min-w-[505px] z-10 mt-1">
          {/* Add this container for search results */}
          <div className="text-[#fff]">
            {results.map((result) => (
              <div
                key={result.id}
                onClick={() => handleResultClick(result.id, result.media_type)}
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
