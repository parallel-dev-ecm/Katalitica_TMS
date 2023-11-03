import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Do you still need this? If not, remove it.
import axiosInstance from "components/Api";
import DataTableWithModal from "components/Resources/DataTableWithModal";
import { CentroCostos, useCCstore } from "Store_CentroCostos";
import DataTable from "examples/Tables/DataTable";
import { table } from "console";
import { useNavigate } from "react-router";
import { useAuthStore } from "Store_Auth";
import { useUsersStore, User } from "Store_Users";
import Unauthorized from "components/Resources/Unauthorized";

function ListCentroCostos(): JSX.Element {
  const columns = [
    { Header: "Clave", accessor: "clave" },
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Calle", accessor: "calle" },
    { Header: "Número Exterior", accessor: "num_exterior" },
    { Header: "Número Interior", accessor: "num_interior" },
    { Header: "Colonia", accessor: "colonia" },
    { Header: "Código Postal", accessor: "codigo_postal" },
    { Header: "Ciudad", accessor: "ciudad" },
    { Header: "Municipio", accessor: "municipio" },
    { Header: "Estado", accessor: "estado" },
    { Header: "Teléfono", accessor: "telefono" },
  ];
  const fetchUserApi = useUsersStore((state) => state.getUsers);
  const allUsers = useUsersStore((state) => state.allUsers);
  const [currentUser, setCurrentUser] = useState<User>();
  const [authorizedToRead, SetAuthorizedToRead] = useState<boolean>(false);
  const [authorizedToWrite, SetAuthorizedToWrite] = useState<boolean>(false);
  const getUser = useAuthStore((state) => state.currentUser);

  const getAllCC = useCCstore((state) => state.readAllCentroCostos);
  const [tableData, setTableData] = useState<CentroCostos[]>([]); // This will store your fetched data.
  const allCC = useCCstore((state) => state.allCentroCostos);
  const postCC = useCCstore((state) => state.addCentroCostos);

  useEffect(() => {
    getAllCC();
  }, []);

  useEffect(() => {
    fetchUserApi();
  }, []);
  useEffect(() => {
    // Get username from sessionStorage
    const storedUsername = sessionStorage.getItem("userName");

    const user = allUsers.find((u) => u.username === storedUsername);

    if (user) {
      setCurrentUser(user);
      SetAuthorizedToRead(user.readGenerales);
      SetAuthorizedToWrite(user.editGenerales);
    } else {
      console.log("User not found");
    }
  }, [allUsers]);

  const navigate = useNavigate();

  const handleAddCentroCostos = async (data: CentroCostos) => {
    const isSuccess = await postCC(data);
    if (isSuccess) {
      document.location.reload();
    } else {
      console.log("Failed to add.");
    }
  };

  return (
    <>
      {authorizedToRead && (
        <DataTableWithModal
          title="Centro de Costos"
          dataTableData={{ rows: allCC, columns: columns }} // Pass the state to the prop.
          description="Información General de los centros de costos"
          buttonEditable={currentUser.editGenerales}
          modalInputs={[
            { label: "Clave", dbName: "clave", type: "text" },
            { label: "Nombre", dbName: "nombre", type: "text" },
            { label: "Calle", dbName: "calle", type: "text" },
            { label: "Número Exterior", dbName: "num_exterior", type: "text" },
            { label: "Número Interior", dbName: "num_interior", type: "text" },
            { label: "Colonia", dbName: "colonia", type: "text" },
            { label: "Código Postal", dbName: "codigo_postal", type: "text" },
            { label: "Ciudad", dbName: "ciudad", type: "text" },
            { label: "Municipio", dbName: "municipio", type: "text" },
            { label: "Estado", dbName: "estado", type: "text" },
            { label: "Teléfono", dbName: "telefono", type: "text" },
          ]}
          onAdd={handleAddCentroCostos}
        />
      )}
      {!authorizedToRead && <Unauthorized />}
    </>
  );
}

export default ListCentroCostos;
