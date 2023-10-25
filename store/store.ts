import { create } from "zustand";

export type StateType = {
  params: any; 
  setParams: (params: any) => void; 
};

const useMovieParamsStore = create<StateType>((set) => ({
    params: null,
    setParams: (params:any) => set({ params }),
}));

export default useMovieParamsStore;
