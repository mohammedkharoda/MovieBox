"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useRouter } from "next/navigation";
import getUpcomingData from "@/app/api/getUpcomingData";
import { PiWarningCircleBold } from "react-icons/pi";
interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  // Add other properties if needed
}
const UpcomingMovieCard = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
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
    async function fetchUpcomingData() {
      try {
        const data = await getUpcomingData();
        setUpcomingMovies(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchUpcomingData();
  }, []);

  return (
    <div className="flex flex-col px-10 mt-[70px]">
      <div className="font-sans text-[36px] font-black">Upcoming Movie</div>
      {/*@ts-ignore*/}
      {isLoading ? (
        <div className="w-full h-[280px]">
          <Image
            src={assets.icon.SPINNER}
            alt="Loading..."
            width={200}
            height={200}
            className="mx-auto"
            loading="lazy"
          />
          <p className="font-sans font-semibold text-[18px]">
            Upcoming Movies in 3...2...1
          </p>
        </div>
      ) : (
        // @ts-ignore
        <Splide options={splideOptions}>
          {upcomingMovies.map((movie) => (
            <SplideSlide key={movie.id}>
              <div className="flex flex-col ">
                <div
                  className="h-auto w-full relative mt-5"
                  onClick={() => {
                    router.push(`/movie/${movie.id}`);
                  }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${
                      movie.poster_path ?? assets.image.DUMMY
                    }`}
                    alt={movie.title}
                    width={500}
                    height={500}
                    // layout="fill"
                    // objectFit="cover"
                    // objectPosition="top"
                    className="rounded-xl cursor-pointer hover:scale-105 transition ease-in-out duration-200"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <p>{formatDate(movie.release_date)}</p>
                  <p className="text-xl font-bold break-words w-[350px] capitalize">
                    {movie.title}
                  </p>
                  <div className="flex items-center gap-5">
                    {movie.vote_average.toFixed(1) === "0.0" ? (
                      ""
                    ) : (
                      <Image
                        src={assets.icon.IMDB}
                        alt="IMDB"
                        width={50}
                        height={50}
                        className="rounded-xl"
                      />
                    )}

                    <p className="text-[16px] text-[#000] font-normal">
                      {movie.vote_average.toFixed(1) === "0.0" ? (
                        <>
                          <p className=" bg-orange-400 px-3 py-2 rounded-full text-black font-semibold text-[16px] flex items-center gap-2">
                            <PiWarningCircleBold size={26} />
                            Yet to be released
                          </p>
                        </>
                      ) : (
                        movie.vote_average.toFixed(1) + "/10"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      )}
    </div>
  );
};

export default UpcomingMovieCard;
