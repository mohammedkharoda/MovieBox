"use client";
import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { assets } from "@/public/assets";
import { useRouter } from "next/navigation";

interface Movie {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const MovieDetails = () => {
  const [movieData, setMovieData] = useState<Movie[] | null>(null);

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
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        );

        if (response.ok) {
          const responseData = await response.json();
          setMovieData(responseData.results);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMovieData();
  }, []);

  const splideOptions = {
    type: "loop",
    autoplay: true,
    perPage: 1,
    perMove: 1,
    pagination: false,
    navigation: false,
    arrows: false,
    direction: "ttb",
    height: "100vh",
  };

  const router = useRouter();
  const handleResultClick = (id: any) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="relative">
      {/*@ts-ignore*/}
      <Splide options={splideOptions}>
        {movieData &&
          movieData?.length > 0 &&
          movieData.map((movie) => (
            <SplideSlide key={movie.id}>
              <div className="relative h-full w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${
                    movie?.backdrop_path || movie?.poster_path
                  }`}
                  alt={movie.title}
                  style={{
                    objectFit: "cover",
                  }}
                  fill
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
              </div>
              <div className="px-6 absolute top-[40%] left-0 text-white">
                <h2 className="text-[48px] font-bold leading-[56px]">
                  {movie.title}
                </h2>
                <div className="w-[50%]">
                  <p className="text-lg my-3 text-[20px] w-full">
                    {movie.overview}
                  </p>
                </div>
                <div className="flex gap-5 items-center">
                  <Image
                    src={assets.icon.IMDB}
                    alt="imdb"
                    width={50}
                    height={50}
                  />
                  <div>
                    <p className="text-[16px] font-medium">
                      {movie.vote_average}/10
                    </p>
                  </div>
                </div>
                <button onClick={() => handleResultClick(movie.id)}>
                  <p className="border-2 p-2 rounded-lg mt-4 hover:shadow-lg shadow-cyan-500/50 text-[20px] hover:bg-cyan-900/60 hover:text-white">
                    Explore More
                  </p>
                </button>
              </div>
            </SplideSlide>
          ))}
      </Splide>
    </div>
  );
};

export default MovieDetails;
