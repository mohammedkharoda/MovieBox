"use client";
import { fetchRecommendedSeries } from "@/app/api/getSuggestedSeries";
import { assets } from "@/public/assets";
import { useTvParamsStore } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";

interface Movie {
  id: number;
  poster_path: string | null;
  name: string;
}

const SuggestionTv = () => {
  const [series, setSeries] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const params = useTvParamsStore((state) => state.params);
  useEffect(() => {
    async function fetchSeriesData(tvId: any) {
      try {
        setIsLoading(true);
        const recommendedSeries = await fetchRecommendedSeries(tvId);
        setSeries(recommendedSeries);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (params !== null) {
      fetchSeriesData(params); // Fetch data if params are available
    }
  }, [params]);
  const displaySeries = expanded ? series : series.slice(0, 8);

  return (
    <div className="flex flex-col px-10 mt-[70px] lg:text-left md:text-center ">
      <div className="font-sans text-[36px] font-black">Recommanded Series</div>
      {/*@ts-ignore*/}
      {isLoading ? (
        <div className="w-full h-[280px]">
          <Loading />
        </div>
      ) : (
        <div className="flex gap-8 flex-wrap justify-center lg:justify-normal">
          {displaySeries.length > 0 ? (
            displaySeries.map((tv, index) => (
              <div className="flex flex-col" key={index}>
                <div className="h-[570px] w-[400px] relative mt-5">
                  <Image
                    src={
                      tv?.poster_path
                        ? `https://image.tmdb.org/t/p/original/${tv?.poster_path}`
                        : assets.image.DUMMY
                    }
                    alt={tv.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-xl cursor-pointer hover:scale-105 transition ease-in-out duration-200"
                    loading="lazy"
                    onClick={() => {
                      router.push(`/tv/${tv.id}`);
                    }}
                  />
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <p className="text-xl font-bold break-words w-[250px] capitalize">
                    {tv.name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="font-bold text-center text-[30px] font-sans">
              No Series Recommanded
            </div>
          )}
        </div>
      )}

      {/* Add an expansion button */}
      {!expanded && series.length > 6 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 bg-blue-500 text-white px-3 py-2 rounded-lg w-fit mx-auto mb-10"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default SuggestionTv;
