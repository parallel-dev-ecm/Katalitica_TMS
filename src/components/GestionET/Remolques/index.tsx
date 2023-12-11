import DataTableWithModal from "components/Resources/DataTableWithModal";
import { useUsersStore, User } from "stores/Store_Users";
import { useEffect, useState } from "react";
import Unauthorized from "components/Resources/Unauthorized";
import { useTractoresStore, Tractor } from "stores/Store_Tractores";
import { Remolque, useRemolquesStore } from "stores/Store_Remolques";

function Remolques(): JSX.Element {
  const columns = [
    { Header: "Clave", accessor: "clave" },
    { Header: "Nombre Largo", accessor: "nombre_largo" },
    { Header: "Modelo", accessor: "modelo" },
    { Header: "Año", accessor: "año" },
    { Header: "Serie", accessor: "serie" },
    { Header: "Placas", accessor: "placas" },
    { Header: "PQ", accessor: "pq" },
    { Header: "Num. ejes", accessor: "num_ejes" },
    { Header: "Capacidad de Litros", accessor: "capacidad_litros" },
    { Header: "Centro De Costos", accessor: "centrocosto_nombre" },
    { Header: "Estatus", accessor: "estatus_description" },
    { Header: "Marca ET", accessor: "marcaet_description" },
  ];

  const getAllMarcas = useRemolquesStore((state) => state.readAllRemolques);
  const allCC = useRemolquesStore((state) => state.allRemolques);
  const postCC = useRemolquesStore((state) => state.addRemolque);
  const fetchUserApi = useUsersStore((state) => state.getUsers);
  const allUsers = useUsersStore((state) => state.allUsers);
  const [currentUser, setCurrentUser] = useState<User>();
  const [authorizedToRead, SetAuthorizedToRead] = useState<boolean>(false);
  const [authorizedToWrite, SetAuthorizedToWrite] = useState<boolean>(false);

  useEffect(() => {
    getAllMarcas();
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
      SetAuthorizedToRead(user.readET);
      SetAuthorizedToWrite(user.editTransporte);
    } else {
      console.log("User not found");
    }
  }, [allUsers]);

  const handleAddCentroCostos = async (data: Remolque) => {
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
          dialogTitle="Añadir nuevo Remolque."
          title="Remolques"
          dataTableData={{ rows: allCC, columns: columns }} // Pass the state to the prop.
          description="Información general de los remolques"
          buttonEditable={authorizedToWrite}
          modalInputs={[
            { label: "Clave", dbName: "clave", type: "text" },
            { label: "Nombre Largo", dbName: "nombre_largo", type: "text" },
            { label: "Modelo", dbName: "modelo", type: "text" },
            { label: "Año", dbName: "año", type: "number" },
            { label: "Serie", dbName: "serie", type: "text" },
            { label: "Num. ejes", dbName: "num_ejes", type: "text" },
            { label: "Placas", dbName: "placas", type: "text" },
            { label: "Capacidad en Litros", dbName: "capacidad_litros", type: "text" },
            { label: "PQ", dbName: "pq", type: "text" },
            { label: "ID Producto", dbName: "id_producto", type: "text" },
            { label: "ID Centro De Costos", dbName: "id_centrocosto", type: "text" },
            { label: "ID Estatus", dbName: "id_estatus", type: "text" },
            { label: "ID Marca ET", dbName: "id_marcaet", type: "text" },
          ]}
          onAdd={handleAddCentroCostos}
        />
      )}
      {!authorizedToRead && <Unauthorized />}
    </>
  );
}

export default Remolques;
