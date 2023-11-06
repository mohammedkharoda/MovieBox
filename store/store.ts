import { persist } from 'zustand/middleware';
import { create } from "zustand";

export type StateType = {
  params?: any;
  setParams?: (params: any) => void;
  trailerKey?: string | null;
  setTrailerKey?: (key: string | null) => void;
  actorId?: any;
  movieData?: any | null;
  setMovieData?: (data: any) => void;
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


const useLikedMoviesStore = create<any>(persist((set) => ({
  likedMovies: [],
  addLikedMovie: (movie: any) => {
    set((state: any) => ({
      likedMovies: [...state.likedMovies, movie],
    }));
  },

  removeLikedMovie: (movie: any) => {
    set((state: any) => ({
      likedMovies: state.likedMovies.filter((id: number) => id !== movie),
    }));
  },
}), {
  name: 'likedMovies',
}));
export { useMovieParamsStore, useTvParamsStore, useTrailerKeyStore, usePeopleKeyStore, useLikedMoviesStore }
