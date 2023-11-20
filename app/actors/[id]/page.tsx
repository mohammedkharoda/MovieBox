"use client";
import React, { useEffect } from "react";
import PeopleDetails from "@/components/PeopleDetails";
import { StateType, usePeopleKeyStore } from "@/store/store";
import Navbar from "@/components/Navbar";

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
