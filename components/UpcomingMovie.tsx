"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
interface Movie {
  id: number;
  backdrop_path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  // Add other properties if needed
}
const UpcomingMovieCard = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const splideOptions = {
    type: "loop",
    autoplay: true,
    perPage: 4,
    perMove: 1,
    pagination: false, // You can enable pagination if needed
    navigation: true,
    arrows: true,
    direction: "horizontal",
  };
  function formatDate(inputDate: string) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  }
  useEffect(() => {
    async function fetchUpcomingMovies() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
          options,
        );

        if (response.ok) {
          const responseData = await response.json();
          setMovies(responseData.results);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchUpcomingMovies();
  }, []);

  return (
    <>
      {/*@ts-ignore*/}
      <Splide options={splideOptions}>
        {movies.map((movie) => (
          <SplideSlide key={movie.id}>
            <div className="flex flex-col">
              <div className="h-[370px] w-[250px] relative mt-5">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <p>{formatDate(movie.release_date)}</p>
                <p className="text-xl font-bold">{movie.title}</p>
                <div className="flex items-center gap-5">
                  <Image
                    src={assets.icon.IMDB}
                    alt="IMDB"
                    width={50}
                    height={50}
                  />
                  <p>{movie.vote_average}/10</p>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default UpcomingMovieCard;
