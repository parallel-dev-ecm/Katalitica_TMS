import axiosInstance from "components/Api";
import { create } from "zustand";

export interface PlanMantenimiento {
  id?: number;
  cve_plan: string;
  descripcion: string;
  id_actividades: number;
  cve_actvplan: string;
  actividad?: string;
  kms_lim: string;
  dias_lim: string;
  tol_kms: string;
  tol_dias: string;
  tipo_et: string;
}

export interface EtAndKmRequest {
  tipo_et: string;
  kms: number;
}

interface State {
  allPuestos: PlanMantenimiento[];
  readAllPuestos: () => Promise<PlanMantenimiento[] | string>;
  addPuesto: (cC: PlanMantenimiento) => Promise<Boolean>;
  getPlanesByETandKms: (req: EtAndKmRequest) => Promise<PlanMantenimiento[]>;
  getIdByDescripcion: (descripcion: string) => Promise<number>;
  getUniqueActividades: () => Promise<string[]>;
  uniqueActividades: string[];
}

const usePlanesMantenimientoStore = create<State>((set, get) => ({
  allPuestos: [],
  uniqueActividades: [],
  getUniqueActividades: async () => {
    try {
      const response = await axiosInstance.get("/planesMantenimiento/getAllUniqueActividades");
      const parsedData = JSON.parse(response.data.result);
      set({ uniqueActividades: parsedData });
      return parsedData;
    } catch (error) {
      console.error("Error fetching Motivo: ", error);
      return "Error fetching Motivo";
    }
  },
  getIdByDescripcion: async (descripcion: string) => {
    try {
      const response = await axiosInstance.post("/planesMantenimiento/getByDescripcion", {
        descripcion,
      });
      const parsedData = JSON.parse(response.data.result.company);
      return parsedData[0].id;
    } catch (error) {
      console.error("Error fetching Motivo: ", error);
      return "Error fetching Motivo";
    }
  },
  getPlanesByETandKms: async (req: EtAndKmRequest) => {
    try {
      const response = await axiosInstance.post("/planesMantenimiento/getByETAndKms", req);
      const parsedData = JSON.parse(response.data.result.company);
      return parsedData;
      // Update the state with the fetched data
    } catch (err) {
      console.error("Error fetching Motivo: ", err);
      return "Error fetching Motivo";
    }
  },

  readAllPuestos: async () => {
    try {
      const response = await axiosInstance.get("/planesMantenimiento/getAll");
      const parsedData = JSON.parse(response.data.result);

      // Update the state with the fetched data
      set({ allPuestos: parsedData.Table });
    } catch (err) {
      console.error("Error fetching Motivo: ", err);
      return "Error fetching Motivo";
    }
  },
  addPuesto: async (cC: PlanMantenimiento) => {
    try {
      const response = await axiosInstance.post("/planesMantenimiento/postPlanMantenimiento", cC);
      return true;
    } catch (error) {
      // Handle the error accordingly.
      console.error("Error updating Motivo:", error);
      return false;
    }
  },
}));

export { usePlanesMantenimientoStore };
