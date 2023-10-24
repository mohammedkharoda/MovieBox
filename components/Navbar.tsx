import Image from "next/image";
import { assets } from "@/public/assets";
import Search from "@/components/Search";

const Navbar = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full z-10">
        <div className="flex items-center gap-5 px-10 py-5 justify-between">
          <div className="flex items-center gap-5 h-fit">
            <Image src={assets.icon.ICON} height={50} width={50} alt="logo" />
            <p className="text-[24px] font-bold leading-[24px] text-[#fff]">
              MovieBox
            </p>
          </div>
          <div className="w-auto">
            <Search />
          </div>
          <div>
            <p className="text-[16px] text-[#fff] font-bold leading-[24px]">
              Sign In
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
