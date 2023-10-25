import { create } from "zustand";

const useMovieParamsStore = create((set) => ({
    params: null,
    setParams: (params) => set({ params }),
}));

export default useMovieParamsStore;
