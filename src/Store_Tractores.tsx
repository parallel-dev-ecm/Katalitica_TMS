import axiosInstance from "components/Api";
import { create } from "zustand";

export interface Tractor {
  id?: number;
  clave: string;
  nombre_largo: string;
  modelo: string;
  año: number;
  serie_motor: string;
  serie_cabina: string;
  num_ejes: string;
  placas: string;
  transmicion: string;
  dif_trasero: string;
  dif_delantero: string;
  id_estatus: number;
  id_producto: number;
  id_centrocosto: number;
  id_marcaet: number;
  id_marcamotor: number;
}

interface State {
  allTractores: Tractor[];
  readAllMarcas: () => Promise<Tractor[] | string>;
  addMarca: (cC: Tractor) => Promise<Boolean>;
}

const useTractoresStore = create<State>((set, get) => ({
  allTractores: [],

  readAllMarcas: async () => {
    try {
      const response = await axiosInstance.get("/tractores/getAll");
      const parsedData = JSON.parse(response.data.result);
      console.log(parsedData);
      // Update the state with the fetched data
      set({ allTractores: parsedData.Table });
    } catch (err) {
      console.error("Error fetching MarcasValvulas: ", err);
      return "Error fetching MarcasValvulas";
    }
  },
  addMarca: async (cC: Tractor) => {
    try {
      const response = await axiosInstance.post("/tractores/postTractor", cC);
      return true;
    } catch (error) {
      // Handle the error accordingly.
      console.error("Error updating MarcasValvulas:", error);
      return false;
    }
  },
}));

export { useTractoresStore };
