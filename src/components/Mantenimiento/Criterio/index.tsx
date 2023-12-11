import DataTableWithModal from "components/Resources/DataTableWithModal";
import { useUsersStore, User } from "stores/Store_Users";
import { useEffect, useState } from "react";
import Unauthorized from "components/Resources/Unauthorized";
import { useCriterioStore, Criterio } from "stores/Mantenimiento/Store_Criterio";

function Criterios(): JSX.Element {
  const getAllMarcas = useCriterioStore((state) => state.readAllPuestos);
  const allCC = useCriterioStore((state) => state.allPuestos);
  const postCC = useCriterioStore((state) => state.addPuesto);
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
      SetAuthorizedToRead(user.readMantenimientoET);
      SetAuthorizedToWrite(user.editMantenimientoEt);
    } else {
      console.log("User not found");
    }
  }, [allUsers]);

  const handleAddCentroCostos = async (data: Criterio) => {
    const isSuccess = await postCC(data);
    if (isSuccess) {
      document.location.reload();
    } else {
      console.log("Failed to add.");
    }
  };
  const generateColumns = (data: Criterio): { Header: string; accessor: string }[] => {
    // Assuming Colaborador is an interface, you can get its keys using Object.keys
    const colaboradorKeys = Object.keys(data);

    // Dynamically generate the columns array
    return colaboradorKeys.map((key) => ({
      Header: key.charAt(0).toUpperCase() + key.slice(1),
      accessor: key,
    }));
  };
  const modalInputs = [
    { label: "Clave Criterio", dbName: "cve_ctr", type: "text" },
    { label: "Nombre Corto", dbName: "nom_corto", type: "text" },
    { label: "Descripción", dbName: "descripcion", type: "text" },
    { label: "Prioridad", dbName: "prioridad", type: "text" },
  ];

  // Assuming allCC is an array of Colaborador objects
  const columns = generateColumns(allCC.length > 0 ? allCC[0] : ({} as Criterio));

  return (
    <>
      {authorizedToRead && (
        <DataTableWithModal
          dialogTitle="Añadir nuevo Criterio."
          title="Criterios"
          dataTableData={{ rows: allCC, columns: columns }} // Pass the state to the prop.
          description="Información general de los Criterios"
          buttonEditable={authorizedToWrite}
          modalInputs={modalInputs}
          onAdd={handleAddCentroCostos}
        />
      )}
      {!authorizedToRead && <Unauthorized />}
    </>
  );
}

export default Criterios;
