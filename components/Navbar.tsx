import Image from "next/image";
import { assets } from "@/public/assets";
import Search from "@/components/Search";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full z-10">
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
            <p className="text-[16px] text-[#fff] font-bold leading-[24px] bg-red-500 p-2 rounded-md">
              Sign In
            </p>
          </div>
        </div>
        <hr className="opacity-[0.5]" />
      </div>
    </>
  );
};
export default Navbar;
