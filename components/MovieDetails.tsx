import useMovieParamsStore from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MovieDetails = () => {
  const [movieData, setMovieData] = useState<any>(null);
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
  }, [params]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-start space-y-4 justify-start">
      <div className="w-full h-[521px]">
        <Image
          fill
          objectFit="contain"
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
          className="drop-shadow-2xl rounded-[40px]"
        />
      </div>
      <div>
        <button className="bg-red-900 text-white border-2 hover:border-gray-900 hover:text-black hover:bg-white p-2">
          Trailer
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
