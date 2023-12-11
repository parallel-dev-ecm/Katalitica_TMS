import DataTableWithModal from "components/Resources/DataTableWithModal";
import { useUsersStore, User } from "stores/Store_Users";
import { useEffect, useState } from "react";
import Unauthorized from "components/Resources/Unauthorized";
import { useTractoresStore, Tractor } from "stores/Store_Tractores";

function Tractores(): JSX.Element {
  const columns = [
    { Header: "Clave", accessor: "clave" },
    { Header: "Nombre Largo", accessor: "nombre_largo" },
    { Header: "Estatus", accessor: "estatus_description" },
    { Header: "Marca Motor", accessor: "marcamotor_description" },
    { Header: "Marca ET", accessor: "marcaet_description" },
    { Header: "Modelo", accessor: "modelo" },
    { Header: "Año", accessor: "año" },
    { Header: "Placas", accessor: "placas" },
    { Header: "Transmisión", accessor: "transmicion" },
    { Header: "Num. ejes", accessor: "num_ejes" },
    { Header: "Producto", accessor: "producto_description" },
    { Header: "Diff. Delantero", accessor: "dif_delantero" },
    { Header: "Diff. Trasero", accessor: "dif_trasero" },
    { Header: "Centro De Costos", accessor: "centrocosto_nombre" },
    { Header: "Serie Cabina", accessor: "serie_cabina" },
    { Header: "Serie Motor", accessor: "serie_motor" },
  ];

  const getAllMarcas = useTractoresStore((state) => state.readAllMarcas);
  const allCC = useTractoresStore((state) => state.allTractores);
  const postCC = useTractoresStore((state) => state.addMarca);
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

  const handleAddCentroCostos = async (data: Tractor) => {
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
          dialogTitle="Añadir nuevo Tractor."
          title="Tractores"
          dataTableData={{ rows: allCC, columns: columns }} // Pass the state to the prop.
          description="Información General de las marcas de motores"
          buttonEditable={authorizedToWrite}
          modalInputs={[
            { label: "Clave", dbName: "clave", type: "text" },
            { label: "Nombre Largo", dbName: "nombre_largo", type: "text" },
            { label: "ID Estatus", dbName: "id_estatus", type: "text" },
            { label: "ID Marca Motor", dbName: "id_marcamotor", type: "text" },
            { label: "ID Marca ET", dbName: "id_marcaet", type: "text" },
            { label: "Modelo", dbName: "modelo", type: "text" },
            { label: "Año", dbName: "año", type: "number" },
            { label: "Placas", dbName: "placas", type: "text" },
            { label: "Transmisión", dbName: "transmicion", type: "text" },
            { label: "Num. ejes", dbName: "num_ejes", type: "text" },
            { label: "ID Producto", dbName: "id_producto", type: "text" },
            { label: "Diff. Delantero", dbName: "dif_delantero", type: "text" },
            { label: "Diff. Trasero", dbName: "dif_trasero", type: "text" },
            { label: "ID Centro De Costos", dbName: "id_centrocosto", type: "text" },
            { label: "Serie Cabina", dbName: "serie_cabina", type: "text" },
            { label: "Serie Motor", dbName: "serie_motor", type: "text" },
          ]}
          onAdd={handleAddCentroCostos}
        />
      )}
      {!authorizedToRead && <Unauthorized />}
    </>
  );
}

export default Tractores;
