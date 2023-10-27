"use client";
import SuggestionTv from "@/components/SuggestionTv";
import TvDetails from "@/components/TvDetails";
import { StateType, useTvParamsStore } from "@/store/store";
import { useEffect } from "react";

export default function Television({ params }: any) {
  const setParams = useTvParamsStore(
    (state: StateType) => state.setParams as any
  );
  useEffect(() => {
    setParams(params.id);
  }, [params.id]);

  return (
    <>
      <TvDetails />
      <SuggestionTv />
    </>
  );
}
