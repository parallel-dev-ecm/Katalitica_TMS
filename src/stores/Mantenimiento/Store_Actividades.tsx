import axiosInstance from "components/Api";
import { create } from "zustand";

export interface Actividad {
  id?: number;
  id_criterio: number;
  id_pieza: number;
  descripcion: string;
}

interface State {
  allPuestos: Actividad[];
  readAllPuestos: () => Promise<Actividad[] | string>;
  addPuesto: (cC: Actividad) => Promise<Boolean>;
}

const useActividadesStore = create<State>((set, get) => ({
  allPuestos: [],

  readAllPuestos: async () => {
    try {
      const response = await axiosInstance.get("/actividades/getAll");
      console.log(response);
      const parsedData = JSON.parse(response.data.result);

      console.log(parsedData);
      // Update the state with the fetched data
      set({ allPuestos: parsedData.Table });
    } catch (err) {
      console.error("Error fetching Actividades: ", err);
      return "Error fetching Actividades";
    }
  },
  addPuesto: async (cC: Actividad) => {
    try {
      const response = await axiosInstance.post("/actividades/postActividad", cC);
      return true;
    } catch (error) {
      // Handle the error accordingly.
      console.error("Error updating Criterio:", error);
      return false;
    }
  },
}));

export { useActividadesStore };
