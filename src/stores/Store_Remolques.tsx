import axiosInstance from "components/Api";
import { create } from "zustand";

export interface Remolque {
  id?: number;
  clave: string;
  nombre_largo: string;
  modelo: string;
  año: number;
  serie: string;
  num_ejes: string;
  placas: string;
  capacidad_litros: string;
  pq: string;
  id_estatus: number;
  id_producto: number;
  id_centrocosto: number;
  id_marcaet: number;
}

interface State {
  allRemolques: Remolque[];
  readAllRemolques: () => Promise<Remolque[] | string>;
  addRemolque: (cC: Remolque) => Promise<Boolean>;
}

const useRemolquesStore = create<State>((set, get) => ({
  allRemolques: [],

  readAllRemolques: async () => {
    try {
      const response = await axiosInstance.get("/remolques/getAll");
      const parsedData = JSON.parse(response.data.result);
      console.log(parsedData);
      // Update the state with the fetched data
      set({ allRemolques: parsedData.Table });
    } catch (err) {
      console.error("Error fetching remolque: ", err);
      return "Error fetching remolque";
    }
  },
  addRemolque: async (cC: Remolque) => {
    try {
      const response = await axiosInstance.post("/remolques/postRemolque", cC);
      return true;
    } catch (error) {
      // Handle the error accordingly.
      console.error("Error updating remolque:", error);
      return false;
    }
  },
}));

export { useRemolquesStore };
