"use client";
import SuggestionTv from "@/components/SuggestionTv";
import TvDetails from "@/components/TvDetails";
import { StateType, useTvParamsStore } from "@/store/store";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
export default function Television({ params }: any) {
  const setParams = useTvParamsStore(
    (state: StateType) => state.setParams as any
  );
  useEffect(() => {
    setParams(params.id);
  }, [params.id]);

  return (
    <>
      <Navbar />
      <TvDetails />
      <SuggestionTv />
    </>
  );
}
