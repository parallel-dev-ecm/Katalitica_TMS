import { ClaveRequest } from "Interfaces";
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
  currentHubodometro: Hubodometro | null;
  readAllPuestos: () => Promise<Hubodometro[] | string>;
  addPuesto: (cC: Hubodometro) => Promise<Boolean>;
  getByClave: (clave: ClaveRequest) => Promise<Hubodometro>;
  updateKm_actuales: (id: number, km_actuales: number) => Promise<Boolean>;
  updateKm_totales: (id: number) => Promise<Boolean>;
}

const useHubodometroStore = create<State>((set, get) => ({
  allPuestos: [],
  currentHubodometro: null,
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
  getByClave: async (clave: ClaveRequest) => {
    console.log(clave.clave);
    const response = await axiosInstance.post("/hubodometro/getIdFromClave", clave);
    console.log(response);
    const result = response.data.result;
    const parsedString = JSON.parse(result.company);
    set({ currentHubodometro: parsedString[0] });
    const currentHub = get().currentHubodometro;
    return currentHub;
  },
  updateKm_actuales: async (id: number, km_actuales: number) => {
    try {
      const response = await axiosInstance.post("/hubodometro/updateKmActuales", {
        id,
        km_actuales,
      });
      return true;
    } catch (err) {
      console.error("Error fetching Motivo: ", err);
      return false;
    }
  },
  // Fixed code...

  updateKm_totales: async (id: number) => {
    try {
      const response = await axiosInstance.post("/hubodometro/updateKmTotales", id);
      console.log(response);
      return true;
    } catch (err) {
      console.error("Error fetching Motivo: ", err);
      return false;
    }
  },
})); // Remove this parenthesis

export { useHubodometroStore };
