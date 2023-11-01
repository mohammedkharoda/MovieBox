"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useRouter } from "next/navigation";
import getNewArrivalData from "@/app/api/getNewArrivalData";
interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  first_air_date: string;
  name: string;
  media_type: string;
}
const NewArrival = () => {
  const [newArrivals, setNewArrivalMovies] = useState<Movie[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const splideOptions = {
    type: "loop",
    autoplay: true,
    perPage: 3,
    perMove: 2,
    pagination: false,
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

  const handleResultClick = (id: any, mediaType: string) => {
    if (mediaType === "movie") {
      router.push(`/movie/${id}`);
    } else if (mediaType === "tv") {
      router.push(`/tv/${id}`);
    }
  };

  useEffect(() => {
    async function fetchNewArrivals() {
      try {
        const data = await getNewArrivalData();
        setNewArrivalMovies(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    fetchNewArrivals();
  }, []);

  return (
    <div className="flex flex-col px-10 mt-[70px]">
      <div className="font-sans text-[36px] font-black">New Arrivals</div>
      {/*@ts-ignore*/}
      {loading ? (
        <div className="w-full h-[280px]">
          <Image
            src={assets.icon.SPINNER}
            alt="Loading..."
            width={200}
            height={200}
            className="mx-auto"
            loading="lazy"
          />
        </div>
      ) : (
        // @ts-ignore
        <Splide options={splideOptions}>
          {newArrivals?.map((movie) => (
            <SplideSlide key={movie.id}>
              <div className="flex flex-col ">
                <div className="h-auto w-full relative mt-5">
                  <Image
                    onClick={() =>
                      handleResultClick(movie.id, movie.media_type)
                    }
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    alt={movie.title}
                    // layout="fill"
                    // objectFit="cover"
                    // objectPosition="center"
                    height={500}
                    width={500}
                    className="rounded-xl cursor-pointer hover:scale-105 transition ease-in-out duration-200"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <p>
                    {formatDate(movie?.release_date ?? movie?.first_air_date)}
                  </p>
                  <p className="text-xl font-bold break-words w-[450px] capitalize">
                    {movie?.title ?? movie?.name}
                  </p>
                  <div className="flex items-center gap-5">
                    <Image
                      src={assets.icon.IMDB}
                      alt="IMDB"
                      width={50}
                      height={50}
                    />
                    <p className="text-[16px] text-[#000] ">
                      {movie?.vote_average.toFixed(1)}/10
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

export default NewArrival;
