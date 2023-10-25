"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Image from "next/image";
import { assets } from "@/public/assets";

const ExclusiveVideo = () => {
  const [movieIds, setMovieIds] = useState([]);
  const [videos, setVideos] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchMovieIds() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setMovieIds(data.results.map((movie: any) => movie.id));
          }
        } else {
          console.error("Failed to fetch movie data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMovieIds();
  }, []);

  useEffect(() => {
    async function fetchVideos() {
      const videoPromises = movieIds.map(async (movieId) => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_KEY}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              return {
                key: data.results[0].key,
                name: data.results[0].name,
              };
            }
          } else {
            console.error("Failed to fetch video data");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false);
        }
        return null;
      });

      const videoData = await Promise.all(videoPromises);
      setVideos(videoData.filter((data) => data !== null));
    }

    if (movieIds.length > 0) {
      fetchVideos();
    }
  }, [movieIds]);

  const splideOptions = {
    type: "loop",
    autoplay: true,
    perPage: 3,
    perMove: 1,
    pagination: false,
    drag: "free",
    focus: "center",
    navigation: false,
    arrows: false,
    autoWidth: true,
    autoScroll: {
      speed: 1,
    },
    gap: "2%",
    direction: "ltr",
  };

  return (
    <div className="flex flex-col px-10 mt-5">
      <div className="font-sans text-3xl font-black mb-5">Exclusive Video</div>
      {videos.length > 0 && !isLoading ? (
        // @ts-ignore
        <Splide options={splideOptions}>
          {videos.map((video: any, index: number) => (
            <SplideSlide key={index}>
              <div className="relative flex flex-col items-start capitalize gap-5">
                <iframe
                  className="rounded-[30px]"
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video?.key}?controls=0`}
                  allowFullScreen
                  scrolling="no"
                />
                <p className="text-[20px] text-[#000]  break-words w-[450px] font-bold leading-normal">
                  {video?.name}
                </p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <div className="w-full h-[280px]">
          <Image
            src={assets.icon.SPINNER}
            alt="Loading..."
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ExclusiveVideo;
