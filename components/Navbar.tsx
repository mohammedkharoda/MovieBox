"use client";
import Image from "next/image";
import { assets } from "@/public/assets";
import Search from "@/components/Search";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
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
          <div className="w-auto">
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
