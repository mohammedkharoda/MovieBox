"use client";
import { fetchMovieId, fetchVideo } from "@/app/api/getTrailerData";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useEffect, useState } from "react";
import Loading from "./Loading";
const ExclusiveVideo = () => {
  const [movieIds, setMovieIds] = useState<any>();
  const [videos, setVideos] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const ids = await fetchMovieId();
        setMovieIds(ids);

        if (ids.length > 0) {
          const videoData = await fetchVideo(ids);
          setVideos(videoData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

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
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ExclusiveVideo;
