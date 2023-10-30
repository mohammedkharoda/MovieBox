import { create } from "zustand";

export type StateType = {
  params?: any;
  setParams?: (params: any) => void;
  trailerKey?: string | null;
  setTrailerKey?: (key: string | null) => void;
  actorId?: any;
};

const useMovieParamsStore = create<StateType>((set) => ({
  params: null,
  setParams: (params: any) => set({ params }),
}));

const useTvParamsStore = create<StateType>((set) => ({
  params: null,
  setParams: (params: any) => set({ params })
}))

const useTrailerKeyStore = create<StateType>((set) => ({
  trailerKey: null,
  setTrailerKey: (key: string | null) => set({ trailerKey: key }),
}));

const usePeopleKeyStore = create<StateType>((set) => ({
  params: null,
  setParams: (params: any) => set({ params }),
}));

export { useMovieParamsStore, useTvParamsStore, useTrailerKeyStore, usePeopleKeyStore }
