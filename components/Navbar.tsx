"use client";
import Search from "@/components/Search";
import { assets } from "@/public/assets";
import { useLikedMoviesStore } from "@/store/store";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineHeart } from "react-icons/ai";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();
  const likedMoviesStore = useLikedMoviesStore() as unknown as any;
  return (
    <>
      <div className="absolute top-0 left-0 w-full z-10 bg-gradient-to-r from-[#791e3c]/70 to-[#7b7357]/70">
        <div className="flex items-center gap-5 px-10 py-5 justify-between">
          <Link href="/">
            <div className="flex items-center gap-5 h-fit">
              <Image
                src={assets.icon.ICON}
                height={50}
                width={50}
                alt="logo"
                loading="lazy"
              />
              <p className="text-[24px] font-bold leading-[24px] bg-gradient-to-r from-[#f5e6ad] to-[#f13c77] bg-clip-text text-transparent">
                MovieBox
              </p>
            </div>
          </Link>
          <div className="w-auto lg:block hidden">
            <Search />
          </div>
          <div>
            <div className="flex items-center gap-5">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              {user && (
                <>
                  <p className="font-semibold text-[#fff]">
                    Hello, {user.firstName}
                  </p>
                  <p
                    className=" cursor-pointer font-semibold text-[#fff] text-[16px]"
                    onClick={() => router.push("/favourites")}
                  >
                    Favourite Movies (
                    <span className="text-[#fff] ml-1">
                      {likedMoviesStore.likedMovies.length}
                    </span>{" "}
                    )
                  </p>
                </>
              )}
            </div>
            <SignedOut>
              <SignInButton mode="modal">
                <p className="text-[16px] cursor-pointer text-[#fff] font-bold leading-[24px] bg-red-500 p-2 rounded-md">
                  Sign In
                </p>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
        <hr className="opacity-[0.5]" />
      </div>
    </>
  );
};
export default Navbar;
