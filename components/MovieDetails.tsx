"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiMovie2Line } from "react-icons/ri";
import { HiMiniLanguage } from "react-icons/hi2";
import { BiTime } from "react-icons/bi";
import { assets } from "@/public/assets";
import { LiaImdb } from "react-icons/lia";
import { useMovieParamsStore, useTrailerKeyStore } from "@/store/store";
import { BsCalendar2 } from "react-icons/bs";
import TrailerModal from "./TrailerModal";
const MovieDetails = () => {
  const [movieData, setMovieData] = useState<any>(null);
  const params = useMovieParamsStore((state) => state.params);
  const [videoData, setVideoData] = useState<any>(null);
  const [castAndCrew, setCastAndCrew] = useState<any[]>([]);
  const TrailerKey = useTrailerKeyStore(
    (state) => state.setTrailerKey as unknown as any
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(videoData?.key, "from movie");
  const handleWatchTrailer = () => {
    TrailerKey(videoData?.key);
    setIsModalOpen(true);
  };
  // ==> For trailer
  useEffect(() => {
    if (params) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${params}/videos?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          // Filter for the trailer video
          const trailerVideo = data.results.find(
            (video: any) => video.type === "Trailer"
          );

          // If a trailer video is found, set the video data
          if (trailerVideo) {
            setVideoData(trailerVideo);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [params]);

  // ==> For Details
  useEffect(() => {
    if (params) {
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
    }
  }, [params]);

  //  ==> Fetch Cast and Crew
  useEffect(() => {
    if (params) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${params}/credits?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          const castAndCrewData = data.cast
            .slice(0, 6) // Get the first 6 members
            .map((member: any) => ({
              id: member.id,
              name: member.name,
              character: member.character,
              profilePath: member.profile_path,
            }));
          setCastAndCrew(castAndCrewData);
        })
        .catch((err) => console.error(err));
    }
  }, [params]);

  if (!movieData && !movieData?.poster_path) {
    return (
      <div className="w-full h-[280px] mt-20">
        <Image
          src={assets.icon.SPINNER}
          alt="Loading..."
          width={200}
          height={200}
          className="mx-auto"
          loading="lazy"
        />
        <p className="text-center font-sans text-[18px] font-semibold">
          Your Movie will there be in a min...
        </p>
      </div>
    );
  }

  function convertToHoursAndMinutes(minutes: number) {
    if (minutes === null || minutes === undefined) {
      return "N/A";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} min`;
    } else if (remainingMinutes === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${remainingMinutes} min`;
    }
  }

  function formatDate(inputDate: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  }

  return (
    <div className="mt-[10rem] grid gap-4 justify-items-center">
      <div className="w-[585px] h-[521px] relative rounded-xl">
        <Image
          fill
          objectFit="contain"
          loading="lazy"
          src={`https://image.tmdb.org/t/p/original${
            movieData?.poster_path ?? assets.image.DUMMY
          }`}
          alt={movieData?.title}
          className="drop-shadow-2xl"
        />
      </div>

      <div className="col-start-2 row-start-1 flex flex-col gap-4">
        <div className="flex justify-between w-fit gap-10 items-center">
          <div className="text-4xl font-bold">{movieData?.title}</div>
          <div className="col-start-1 row-start-2 ">
            <button
              className="bg-blue-900 text-white shadow-lg  transition ease-in-out delay-150 hover:bg-black px-10 py-3 rounded-xl hover:scale-110 flex gap-3"
              onClick={handleWatchTrailer}
            >
              <RiMovie2Line size={26} />
              Watch Trailer
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          {movieData?.genres?.map((genre: any, index: number) => (
            <div key={index}>
              <p className="text-[15px] text-gray-800/80 uppercase">
                {genre?.name}
              </p>
            </div>
          ))}
        </div>
        <div className="text-[20px] text-gray-800/80">{movieData?.tagline}</div>
        <div className="flex flex-col gap-2">
          <p className="uppercase text-[20px] text-[#000] font-semibold">
            Storyline
          </p>
          <div className="text-[18px]">{movieData?.overview}</div>
        </div>
        <div className="flex flex-row w-fit gap-10  ">
          <div className="flex flex-col w-fit gap-2">
            <div className="text-[20px] font-semibold mt-3">
              Production Company
            </div>
            {movieData?.production_companies?.map(
              (company: any, index: number) => (
                <p
                  className="font-bold text-[25px] uppercase underline underline-offset-8"
                  key={index}
                >
                  {company?.name}
                </p>
              )
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 ">
              <HiMiniLanguage size={26} />
              <p className="font-semibold text-[20px]">Languages</p>
            </div>
            {movieData?.spoken_languages?.length > 0 ? (
              movieData?.spoken_languages.map(
                (language: any, index: number) => (
                  <div key={index}>
                    <p className="font-bold text-[28px]">
                      {language?.name || "No language found"}
                    </p>
                  </div>
                )
              )
            ) : (
              <div>
                <p className="font-bold text-[28px]">No language found</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BiTime size={26} />
              <p className="text-[20px] font-semibold">Runtime</p>
            </div>
            <p className="text-[18px] font-bold text-center">
              {convertToHoursAndMinutes(movieData?.runtime)}
            </p>
          </div>
          <div className="gap-2 flex flex-col">
            <div className="flex items-center gap-2">
              <LiaImdb size={26} />
              <div className="text-[20px] font-semibold">Rating</div>
            </div>
            <div className="text-[20px] font-bold">
              {movieData?.vote_average?.toFixed(1)}
            </div>
          </div>
          <div className="gap-2 flex flex-col">
            <div className="flex items-center gap-2">
              <BsCalendar2 size={26} />
              <div className="text-[20px] font-semibold">Release Date</div>
            </div>
            <div className="text-[18px] font-bold text-center">
              {formatDate(movieData?.release_date)}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-[28px] font-semibold text-[#000]">
            Cast and Crew
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {castAndCrew.map((member: any) => (
              <div key={member.id}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${member.profilePath}`}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-xl drop-shadow-xl"
                />
                <p className="text-[20px] font-semibold">{member.name}</p>
                <p className="text-[15px]">{member.character}</p>
              </div>
            ))}
          </div>
        </div>
        {isModalOpen && <TrailerModal />}
      </div>
    </div>
  );
};

export default MovieDetails;
