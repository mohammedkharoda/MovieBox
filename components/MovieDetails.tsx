"use client";
import useMovieParamsStore from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const MovieDetails = () => {
  const [movieData, setMovieData] = useState<any>(null); // Use the `any` type
  const params = useMovieParamsStore((state) => state.params);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY} `,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${params}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((data) => setMovieData(data))
      .catch((err) => console.error(err));
  }, [params]); // Include `params.id` in the dependency array

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full h-[521px]">
        <Image
          fill
          objectFit="contain"
          objectPosition="center"
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
        />
      </div>
    </div>
  );
};

export default MovieDetails;
