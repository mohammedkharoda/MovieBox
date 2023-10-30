"use client";
import React, { useEffect } from "react";
import PeopleDetails from "@/components/PeopleDetails";
import { StateType, usePeopleKeyStore } from "@/store/store";

export default function Actors({ params }: any) {
  const setParams = usePeopleKeyStore(
    (state: StateType) => state.setParams as any
  );
  useEffect(() => {
    setParams(params.id);
  }, [params.id]);

  console.log("from opages", params.id);
  return (
    <>
      <PeopleDetails />
    </>
  );
}
