import axiosInstance from "components/Api";
import { create } from "zustand";

export interface OrdenReparacionActividades {
  compania: string;
  taller: string;
  folio: string;
  cveact: string;
  pieza: string;
  descripcion: string;
  identificador: string;
  mecanico: string;
  tiempo: string;
  chek: string;
  fechareparacion: Date;
  kmreparacion: string;
  idplanesmantenimiento: number;
  idcentrocosto: number;
  idtaller: number;
  idoperador: number;
  idremolques: number;
  idtractores: number;
  iddollys: number;
  idcompania: number;
}

interface State {
  allActividades: OrdenReparacionActividades[];
  readAllActividades: () => Promise<OrdenReparacionActividades[] | string>;
  addActividades: (cC: OrdenReparacionActividades) => Promise<Boolean>;
}

const useOrdenReparacionActividadesStore = create<State>((set, get) => ({
  allActividades: [],

  readAllActividades: async () => {
    try {
      const response = await axiosInstance.get("/ordenReparacion/getAllActividades");
      console.log(response);
      const parsedData = JSON.parse(response.data.result);

      console.log(parsedData);
      // Update the state with the fetched data
      set({ allActividades: parsedData.Table });
    } catch (err) {
      console.error("Error fetching Colab: ", err);
      return "Error fetching colab";
    }
  },
  addActividades: async (cC: OrdenReparacionActividades) => {
    try {
      const response = await axiosInstance.post("/ordenReparacion/postActividades", cC);
      return true;
    } catch (error) {
      // Handle the error accordingly.
      console.error("Error colab:", error);
      return false;
    }
  },
}));

export { useOrdenReparacionActividadesStore };
