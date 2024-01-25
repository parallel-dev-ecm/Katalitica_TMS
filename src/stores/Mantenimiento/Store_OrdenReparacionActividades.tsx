import axiosInstance from "components/Api";
import { create } from "zustand";

export interface OrdenReparacionActividades {
  id?: number;
  compania: string;
  taller: string;
  folio: string;
  cve_act: string;
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
  idremolque2: number;
  idtractores: number;
  iddollys: number;
  idcompania: number;
  idOrdenReparacion: number;
}

//GET BY FOLIO
//
interface State {
  allActividades: OrdenReparacionActividades[];
  readAllActividades: () => Promise<OrdenReparacionActividades[] | string>;
  addActividades: (cC: OrdenReparacionActividades) => Promise<Boolean>;
  getActividadById: (id: string) => Promise<OrdenReparacionActividades>;
  getIdActividades: () => Promise<number | number[]>;
  idList: OrdenReparacionActividades[];
}

const useOrdenReparacionActividadesStore = create<State>((set, get) => ({
  allActividades: [],
  idList: [],
  getIdActividades: async () => {
    try {
      const response = await axiosInstance.get("/ordenReparacion/getIds");
      const parsedData = JSON.parse(response.data.result);
      set({ idList: parsedData.Table });
      return parsedData.Table;
      // Update the state with the fetched data
    } catch (err) {
      console.error("Error fetching Colab: ", err);
      return "Error fetching colab";
    }
  },
  getActividadById: async (Id: string) => {
    try {
      const body = {
        id: Id,
      };
      const response = await axiosInstance.post<any>("/ordenReparacion/getActividadById", body);
      console.log(response);
      if (response.data && response.data.result) {
        const result: string = response.data.result.company.toString();
        const parsedData = JSON.parse(result);
        return parsedData[0];
      }
    } catch (error) {
      console.error("Error fetching company by ID:", error);
    }
  },

  readAllActividades: async () => {
    try {
      const response = await axiosInstance.get("/ordenReparacion/getAllActividades");
      const parsedData = JSON.parse(response.data.result);

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
