import { fetchActorDetails } from "@/app/api/getPeopleDetails";
import { assets } from "@/public/assets";
import { usePeopleKeyStore } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface People {
  name: string;
  profile_path: string | null;
  id: number;
  title: string;
  poster_path: string | null;
}

const PeopleDetails = () => {
  const [actorDetails, setActorDetails] = useState<any>(null);
  const params = usePeopleKeyStore((state) => state.params);
  const [showMore, setShowMore] = useState(false);
  const [credits, setCredits] = useState<People[]>([]);
  const router = useRouter();
  // ==> For Details
  useEffect(() => {
    if (params) {
      fetchActorDetails(params)
        .then(({ actorDetails, credits }) => {
          setActorDetails(actorDetails);
          setCredits(credits);
        })
        .catch((err) => console.error(err));
    }
  }, [params]);

  const handlePosterClick = (credit: any) => {
    if (credit.media_type === "movie") {
      router.push(`/movie/${credit.id}`);
    } else if (credit.media_type === "tv") {
      router.push(`/tv/${credit.id}`);
    }
  };

  const renderMoviePosters = credits
    .slice(0, showMore ? credits.length : 6)
    .map((credit) => (
      <div key={credit.id} onClick={() => handlePosterClick(credit)}>
        <div className="h-[680px] w-full rounded-xl">
          <Image
            width={500}
            height={500}
            loading="lazy"
            className="rounded-xl cursor-pointer hover:scale-105 transition ease-in-out duration-200"
            src={
              credit.poster_path
                ? `https://image.tmdb.org/t/p/original${credit.poster_path}`
                : assets.image.DUMMY
            }
            alt={credit.title}
          />
        </div>
      </div>
    ));

  if (
    !actorDetails ||
    !actorDetails.profile_path ||
    !credits ||
    renderMoviePosters.length === 0
  ) {
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
          Get your favorite Actor in a sec ...
        </p>
      </div>
    );
  }

  const biography = actorDetails.biography;
  const showBiography = () => {
    const linesToShow = showMore
      ? biography
      : biography.split("\n").slice(0, 8).join("\n");
    return linesToShow;
  };

  return (
    <div className="mt-[10rem] grid grid-rows-1 gap-4 justify-items-center">
      <div className="w-[585px] h-[521px] relative rounded-xl">
        <Image
          fill
          objectFit="contain"
          loading="lazy"
          src={`https://image.tmdb.org/t/p/original${
            actorDetails.profile_path ?? assets.image.DUMMY
          }`}
          alt={actorDetails.name}
          className="drop-shadow-2xl"
        />
      </div>
      <div className="col-start-2 row-start-1 flex flex-col gap-4 mb-10">
        <div className="text-4xl font-bold">{actorDetails.title}</div>
        <div className="flex gap-4">
          <div>
            <p className="text-[28px] font-semibold text-gray-800 uppercase">
              {actorDetails?.name}
            </p>
          </div>
        </div>
        {/* DOB */}
        <div className="text-[20px] text-gray-800/80">
          <p className="font-semibold">{actorDetails?.place_of_birth}</p>
        </div>
        {/* Storyline */}
        <div className="flex flex-col gap-2">
          <p className="uppercase text-[20px] text-[#000] font-semibold">
            Storyline
          </p>
          <div className={`text-[18px] w-[80%]`}>{showBiography()}</div>
          {biography.split("\n").length > 6 && (
            <button
              className="text-blue-500 cursor-pointer border-2 w-fit px-2 py-1 rounded-md border-blue-500 hover:bg-blue-500 hover:text-white transition ease-in-out duration-200"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show More" : "Show Less"}
            </button>
          )}
        </div>
        {/* Also know for */}
        <div className="mt-4">
          <div className="text-[28px] font-semibold text-gray-800 uppercase mb-5">
            Also Know For
          </div>
          <div className="grid grid-cols-3 gap-4">{renderMoviePosters}</div>
          {credits.length > 6 && (
            <div className="text-center">
              <button
                className="mt-4 text-blue-500 cursor-pointer border-2 w-fit px-2 py-1 rounded-md border-blue-500 hover:bg-blue-500 hover:text-white transition ease-in-out duration-200"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleDetails;
