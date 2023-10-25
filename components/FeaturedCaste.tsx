"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets";
import { Splide, SplideSlide } from "@splidejs/react-splide";

interface Movie {
  id: number;
  profile_path: string | null;
  name: string;

  // Add other properties if needed
}
const FeaturedCast = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const splideOptions = {
    type: "loop",
    autoplay: true,
    perPage: 3,
    perMove: 2,
    pagination: false, // You can enable pagination if needed
    navigation: true,
    arrows: false,
    gap: "5%",
    direction: "horizontal",
  };

  function formatDate(inputDate: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
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
        setIsLoading(true);
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/person/day?language=en-US",
          options
        );

        if (response.ok) {
          const responseData = await response.json();
          setMovies(responseData.results);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUpcomingMovies();
  }, []);

  return (
    <div className="flex flex-col px-10 mt-[70px]">
      <div className="font-sans text-[36px] font-black">Top People</div>
      {/*@ts-ignore*/}
      {isLoading ? (
        <div className="w-full h-[280px]">
          <Image
            src={assets.icon.SPINNER}
            alt="Loading..."
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
      ) : (
        // @ts-ignore
        <Splide options={splideOptions}>
          {movies.map((movie) => (
            <SplideSlide key={movie.id}>
              <div className="flex flex-col ">
                <div className="h-[570px] w-full relative mt-5">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.profile_path}`}
                    alt={movie.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-xl"
                  />
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <p className="text-xl font-bold break-words w-[250px] capitalize">
                    {movie.name}
                  </p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      )}
    </div>
  );
};

export default FeaturedCast;
