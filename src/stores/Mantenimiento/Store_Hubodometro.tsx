import axiosInstance from "components/Api";
import { create } from "zustand";

export interface Hubodometro {
  id?: number;
  clave_et: string;
  tipo_et: string;
  estatus: string;
  km_actuales: number;
  km_totales: number;
  fec_ult_act: Date;
  fec_instalacion: Date;
  fec_baja: Date;
}

interface State {
  allPuestos: Hubodometro[];
  readAllPuestos: () => Promise<Hubodometro[] | string>;
  addPuesto: (cC: Hubodometro) => Promise<Boolean>;
}

const useHubodometroStore = create<State>((set, get) => ({
  allPuestos: [],

  readAllPuestos: async () => {
    try {
      const response = await axiosInstance.get("/hubodometro/getAll");
      console.log(response);
      const parsedData = JSON.parse(response.data.result);

      console.log(parsedData);
      // Update the state with the fetched data
      set({ allPuestos: parsedData.Table });
    } catch (err) {
      console.error("Error fetching Motivo: ", err);
      return "Error fetching Motivo";
    }
  },
  addPuesto: async (cC: Hubodometro) => {
    try {
      const response = await axiosInstance.post("/hubodometro/postHubodometro", cC);
      return true;
    } catch (error) {
      // Handle the error accordingly.
      console.error("Error updating Motivo:", error);
      return false;
    }
  },
}));

export { useHubodometroStore };
