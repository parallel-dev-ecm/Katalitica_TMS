import { create } from "zustand";

import axiosInstance from "components/Api";
import OrdenReparacionInterface from "Interfaces";

type State = {
  allOrdenes: OrdenReparacionInterface[];
  getAllOrdenes: () => void;
  updateOrdenById: (company: OrdenReparacionInterface) => Promise<Boolean>;
  postOrden: (ordenReparacion: OrdenReparacionInterface) => Promise<Boolean>;
  getOrdenById: (id: string) => Promise<OrdenReparacionInterface>;
  getOrdenByFolio: (folio: string) => Promise<number>;
};

//ADD TO INTERFACE, API AND STORED PROCEDURE NULL COLUMN id_ordenReparacion to ordenReparacionActividades
//GET BY FOLIO
// try to push ordenReparacion first
// get by folio the ordenReparacionId
// then push ordenReparacionActividades with the ordenReparacionId

const ordenReparacionStore = create<State>((set, get) => ({
  getOrdenByFolio: async (folio: string) => {
    const body = {
      folio: folio,
    };
    try {
      const response = await axiosInstance.post("/ordenReparacion/getOrdenByFolio", body);
      if (response.data && response.data.result) {
        const parsedData = JSON.parse(response.data.result);
        const res = parsedData[0].id;

        return res;
      }
    } catch (error) {
      console.error("Error fetching orden by ID:", error);
    }
  },
  allOrdenes: [],
  getAllOrdenes: async () => {
    try {
      const response = await axiosInstance.get("/ordenReparacion/getAllOrdenReparacion");
      const parsedData = JSON.parse(response.data.result);
      set({ allOrdenes: parsedData.Table });
    } catch (error) {}
  },
  updateOrdenById: async (company: OrdenReparacionInterface) => {
    try {
      const response = await axiosInstance.post("/ordenReparacion/updateOrdenById", company);
      if (response.data && response.data.result) {
        return response.data.result;
      }
    } catch (error) {
      console.error("Error fetching company by ID:", error);
    }
  },
  postOrden: async (ordenReparacion: OrdenReparacionInterface) => {
    try {
      const response = await axiosInstance.post(
        "/ordenReparacion/postOrdenReparacion",
        ordenReparacion
      );
      if (response) {
        return true;
      }
    } catch (error) {
      console.error("Error posting orden: ", error);
      return false;
    }
  },
  getOrdenById: async (id: string) => {
    const body = {
      id: id,
    };
    try {
      const response = await axiosInstance.post("/ordenReparacion/getOrdenById", body);
      if (response.data && response.data.result) {
        const parsedData = JSON.parse(response.data.result);
        console.log(parsedData[0]);
        const res = parsedData[0];

        return res;
      }
    } catch (error) {
      console.error("Error fetching orden by ID:", error);
    }
  },
}));

export { ordenReparacionStore };
