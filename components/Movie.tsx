"use client";

import React, { useState, useEffect } from "react";

const MovieDetails = () => {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    async function fetchMovieData() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          options,
        );

        if (response.ok) {
          const responseData = await response.json();
          setMovieData(responseData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMovieData();
  }, []);

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-col items-center max-w-6xl">
        {movieData &&
          movieData.results &&
          movieData.results.length > 0 &&
          movieData.results.map((movie: any) => (
            <div key={movie.id} className="mb-6">
              <img
                src={`https://image.tmdb.org/t/p/original/${
                  movie.backdrop_path || movie.poster_path
                }`}
                alt={movie.title}
                className="rounded-t-lg group-hover:opacity-80 transition-opacity duration-200"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  width: "auto",
                }}
              />
              <div className="p-2">
                <h2 className="text-lg mb-3 font-bold">{movie.title}</h2>
                <p className="text-lg mb-3">
                  <span className="font-semibold mr-1">Overview:</span>
                  {movie.overview}
                </p>
                <p className="mb-3">
                  <span className="font-semibold mr-1">Date Released:</span>
                  {movie.release_date}
                </p>
                <p className="mb-3">
                  <span className="font-semibold mr-1">Rating:</span>
                  {movie.vote_count}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieDetails;
