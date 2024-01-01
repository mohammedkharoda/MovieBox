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
  likedMovies: (() => {
    try {
      const storedData = localStorage.getItem('likedMovies');
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Error parsing likedMovies from localStorage:', error);
      return [];
    }
  })(),

  addLikedMovie: (movie: any) => {
    set((state: any) => {
      try {
        if (!state.likedMovies.some((m: any) => m.id === movie.id)) {
          const updatedLikedMovies = [...state.likedMovies, movie];
          localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
          console.log('Liked Movie Added:', updatedLikedMovies);
          return { likedMovies: updatedLikedMovies };
        }
      } catch (error) {
        console.error('Error adding likedMovie:', error);
      }
      return state;
    });
  },

  removeLikedMovie: (movie: any) => {
    set((state: any) => {
      try {
        const updatedLikedMovies = state.likedMovies.filter((m: any) => m.id !== movie.id);
        localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
        console.log('Liked Movie Removed:', updatedLikedMovies);
        return { likedMovies: updatedLikedMovies };
      } catch (error) {
        console.error('Error removing likedMovie:', error);
      }
      return state;
    });
  },
}), {
  name: 'likedMovies',
  getStorage: () => localStorage,
}));

export { useMovieParamsStore, useTvParamsStore, useTrailerKeyStore, usePeopleKeyStore, useLikedMoviesStore }
