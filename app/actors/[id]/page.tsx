"use client";
import React, { useEffect } from "react";
import PeopleDetails from "@/components/PeopleDetails";
import { StateType, usePeopleKeyStore } from "@/store/store";
import dynamic from "next/dynamic";

export const revalidation = 0;
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
export default function Actors({ params }: any) {
  const setParams = usePeopleKeyStore(
    (state: StateType) => state.setParams as any
  );
  useEffect(() => {
    setParams(params.id);
  }, [params.id]);

  return (
    <>
      <Navbar />
      <PeopleDetails />
    </>
  );
}
