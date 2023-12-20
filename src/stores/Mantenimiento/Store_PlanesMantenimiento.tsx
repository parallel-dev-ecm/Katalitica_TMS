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
}

interface State {
  allPuestos: PlanMantenimiento[];
  readAllPuestos: () => Promise<PlanMantenimiento[] | string>;
  addPuesto: (cC: PlanMantenimiento) => Promise<Boolean>;
}

const usePlanesMantenimientoStore = create<State>((set, get) => ({
  allPuestos: [],

  readAllPuestos: async () => {
    try {
      const response = await axiosInstance.get("/planesMantenimiento/getAll");
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
