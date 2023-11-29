import axiosInstance from "components/Api";
import { create } from "zustand";

export interface Dolly {
  id?: number;
  clave: string;
  nombre_largo: string;
  modelo: string;
  año: number;
  serie_motor: string;
  num_ejes: string;
  placas: string;
  id_estatus: number;
  id_producto: number;
  id_centrocosto: number;
  id_marcaet: number;
}

interface State {
  allDollys: Dolly[];
  readAllDollys: () => Promise<Dolly[] | string>;
  addDoly: (cC: Dolly) => Promise<Boolean>;
}

const useDollyStore = create<State>((set, get) => ({
  allDollys: [],

  readAllDollys: async () => {
    try {
      const response = await axiosInstance.get("/dollys/getAll");
      const parsedData = JSON.parse(response.data.result);
      console.log(parsedData);
      // Update the state with the fetched data
      set({ allDollys: parsedData.Table });
    } catch (err) {
      console.error("Error fetching dollys: ", err);
      return "Error fetching dollys";
    }
  },
  addDoly: async (cC: Dolly) => {
    try {
      const response = await axiosInstance.post("/dollys/postDolly", cC);
      return true;
    } catch (error) {
      // Handle the error accordingly.
      console.error("Error updating dollys:", error);
      return false;
    }
  },
}));

export { useDollyStore };
