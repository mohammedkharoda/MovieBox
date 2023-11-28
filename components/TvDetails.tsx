"use client";
import {assets} from "@/public/assets";
import {
    useLikedMoviesStore,
    useTrailerKeyStore,
    useTvParamsStore,
} from "@/store/store";
import Image from "next/image";
import {useEffect, useState} from "react";
import {BsPen} from "react-icons/bs";
import {HiMiniLanguage} from "react-icons/hi2";
import {LiaImdb} from "react-icons/lia";
import {RiMovie2Line} from "react-icons/ri";
import TrailerModal from "./TrailerModal";
import {
    fetchTrailerVideo,
    fetchTvCredits,
    fetchTvDetails,
} from "@/app/api/getTvDetails";
import {useRouter} from "next/navigation";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import Loading from "./Loading";
import {PiWarningCircleBold} from "react-icons/pi";

const TvDetails = () => {
    const [seriesData, setseriesData] = useState<any>(null);
    const params = useTvParamsStore((state) => state.params);
    const [videoData, setVideoData] = useState<any>(null);
    const [castAndCrew, setCastAndCrew] = useState<any[]>([]);
    const [isLoadingCrew, setIsLoadingCrew] = useState(true);
    const TrailerKey = useTrailerKeyStore(
        (state) => state.setTrailerKey as unknown as any
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const likedMoviesStore = useLikedMoviesStore() as unknown as any;
    const router = useRouter();
    const handleWatchTrailer = () => {
        TrailerKey(videoData?.key);
        setIsModalOpen(true);
    };
    const handleLikeButtonClick = () => {
        const isMovieLiked = likedMoviesStore.likedMovies.some(
            (likedMovie: any) => likedMovie.id === seriesData.id
        );

        if (isMovieLiked) {
            likedMoviesStore.removeLikedMovie(seriesData);
        } else {
            likedMoviesStore.addLikedMovie(seriesData);
        }
    };
    const isLiked = seriesData && likedMoviesStore.likedMovies.some((likedMovie: any) => likedMovie.id === seriesData.id);

    // ==> For trailer
    useEffect(() => {
        if (params) {
            fetchTrailerVideo(params)
                .then((trailerVideo) => {
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
            fetchTvDetails(params)
                .then((data) => setseriesData(data))
                .catch((err) => console.error(err));
        }
    }, [params]);

    useEffect(() => {
        if (params) {
            fetchTvCredits(params)
                .then((data) => {
                    const castAndCrewData = data.cast.slice(0, 6).map((member: any) => ({
                        id: member.id,
                        name: member.name,
                        character: member.character,
                        profilePath: member.profile_path,
                    }));
                    setCastAndCrew(castAndCrewData);
                    setIsLoadingCrew(false);
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setIsLoadingCrew(true);
                });
        }
    }, [params]);

    console.log(castAndCrew, "crew-->");

    if (!seriesData && !seriesData?.poster_path) {
        return (
            <div className="w-full h-[280px] mt-20">
                <Loading/>
                <p className="text-center font-sans text-[18px] font-semibold">
                    Your Series will there be in a min...
                </p>
            </div>
        );
    }

    return (
        <div className="mt-[10rem] lg:grid gap-4 lg:justify-items-center flex flex-col items-center lg:items-start">
            <div className="w-[585px] h-[521px] relative rounded-xl">
                <Image
                    fill
                    placeholder="blur"
                    blurDataURL={`https://image.tmdb.org/t/p/original${seriesData?.poster_path}`}
                    objectFit="contain"
                    src={
                        seriesData?.poster_path
                            ? `https://image.tmdb.org/t/p/original${seriesData?.poster_path}`
                            : `${(<Loading/>)}`
                    }
                    alt={seriesData?.title}
                    className="drop-shadow-2xl "
                />
            </div>
            <div className="col-start-2 row-start-1 flex flex-col gap-4 items-center lg:items-start">
                <div className="flex lg:flex-row justify-between w-fit gap-10 items-center flex-col">
                    <div className="text-4xl font-bold">{seriesData?.name}</div>
                    <div>
                        <button
                            className="bg-blue-900 text-white shadow-lg  transition ease-in-out delay-150 hover:bg-black px-10 py-3 rounded-xl hover:scale-110 flex gap-3"
                            onClick={handleWatchTrailer}
                        >
                            <RiMovie2Line size={26}/>
                            Watch Trailer
                        </button>
                    </div>
                    <div>
                        {isLiked ? (
                            <AiFillHeart
                                size={26}
                                color="red"
                                onClick={handleLikeButtonClick}
                                className="cursor-pointer"
                            />
                        ) : (
                            <AiOutlineHeart
                                size={26}
                                onClick={handleLikeButtonClick}
                                className="cursor-pointer"
                            />
                        )}
                    </div>
                </div>
                <div className="flex gap-4">
                    {seriesData?.genres?.map((genre: any, index: number) => (
                        <div key={index}>
                            <p className="text-[15px] text-gray-800/80 uppercase">
                                {genre?.name}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="text-[20px] text-gray-800/80">
                    {seriesData?.tagline}
                </div>
                <div className="flex flex-col gap-2 text-center lg:text-left">
                    <p className="uppercase text-[20px] text-[#000] font-semibold">
                        Storyline
                    </p>
                    <div className="text-[18px]">{seriesData?.overview}</div>
                </div>
                <div className="flex flex-row w-fit gap-10 flex-wrap mx-5 mt-5 lg:mx-0 lg:mt-0 ">
                    <div className="flex flex-col w-fit gap-2">
                        <div className="text-[20px] font-semibold mt-3">
                            Production Company
                        </div>
                        {seriesData?.production_companies?.map(
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
                            <HiMiniLanguage size={26}/>
                            <p className="font-semibold text-[20px]">Languages</p>
                        </div>
                        {seriesData?.spoken_languages?.map(
                            (language: any, index: number) => (
                                <div key={index}>
                                    <p className="font-bold text-[28px]">{language?.name}</p>
                                </div>
                            )
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <BsPen size={26}/>
                            <div className="font-semibold text-[20px]">Written By</div>
                        </div>
                        <div>
                            {seriesData?.created_by.length > 0 ? (
                                seriesData?.created_by?.map((creator: any, index: number) => (
                                    <div key={index}>
                                        <p className="font-bold text-[20px] text-[#000] capitalize">
                                            {creator?.name}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="capitalize font-sans text-[20px] font-bold text-[#000]">
                                    anonymous
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-[20px]">Streaming On</div>
                        <div className="w-[150px] h-[150px] ">
                            <div className="flex gap-5 mt-2 flex-wrap items-center">
                                {seriesData?.networks
                                    ?.slice(0, 3)
                                    .map((network: any, index: number) => (
                                        <div key={index}>
                                            <Image
                                                src={`https://image.tmdb.org/t/p/original${network?.logo_path}`}
                                                alt={network.name}
                                                height={300}
                                                width={300}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="gap-2 flex flex-col">
                        <div className="flex items-center gap-2">
                            <LiaImdb size={26}/>
                            <div className="text-[20px] font-semibold">Rating</div>
                        </div>
                        {seriesData?.vote_average?.toFixed(1) === "0.0" ? (
                            <>
                                <p className=" bg-orange-400 px-3 py-2 rounded-full text-black font-semibold text-[16px] flex items-center gap-2">
                                    <PiWarningCircleBold size={26}/>
                                    Yet to be released
                                </p>
                            </>
                        ) : (
                            <p className='text-[20px] font-semibold '>
                                {seriesData?.vote_average?.toFixed(1) + "/10"}
                            </p>
                        )}
                    </div>
                </div>
                {!isLoadingCrew ? (
                    <div className="w-full h-[280px] mt-20">
                        <Loading/>
                        <p className="text-center font-sans text-[18px] font-semibold">
                            Cast is getting ready ...
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 lg:w-full">
                        <div className="text-[#000] font-bold text-[32px] my-5 text-center">
                            Cast and Crew
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {castAndCrew.map((member: any) => (
                                <div key={member.id}>
                                    <Image
                                        src={
                                            member?.profilePath
                                                ? `https://image.tmdb.org/t/p/original${member.profilePath}`
                                                : assets.image.DUMMY
                                        }
                                        alt={member.name}
                                        width={200}
                                        height={200}
                                        className="rounded-xl drop-shadow-xl cursor-pointer hover:scale-105 transition ease-in-out duration-200"
                                        onClick={() => {
                                            router.push(`/actors/${member.id}`);
                                        }}
                                    />
                                    <p className="text-[20px] font-semibold">{member.name}</p>
                                    <p className="text-[15px]">{member.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isModalOpen && <TrailerModal/>}
            </div>
        </div>
    );
};

export default TvDetails;
