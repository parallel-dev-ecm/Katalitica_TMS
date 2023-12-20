import DataTableWithModal from "components/Resources/DataTableWithModal";
import { useUsersStore, User } from "stores/Generales/Store_Users";
import { useEffect, useState } from "react";
import Unauthorized from "components/Resources/Unauthorized";
import {
  usePlanesMantenimientoStore,
  PlanMantenimiento,
} from "stores/Mantenimiento/Store_PlanesMantenimiento";

function PlanesMantenimiento(): JSX.Element {
  const getAllMarcas = usePlanesMantenimientoStore((state) => state.readAllPuestos);
  const allCC = usePlanesMantenimientoStore((state) => state.allPuestos);
  const postCC = usePlanesMantenimientoStore((state) => state.addPuesto);
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

    console.log(storedUsername);
    const user = allUsers.find((u) => u.username === storedUsername);
    console.log(allUsers);

    if (user) {
      console.log(user);
      setCurrentUser(user);
      SetAuthorizedToRead(user.readMantenimientoET);
      SetAuthorizedToWrite(user.editMantenimientoEt);
    } else {
      console.log("User not found");
    }
  }, [allUsers]);

  const handleAddCentroCostos = async (data: PlanMantenimiento) => {
    const isSuccess = await postCC(data);
    if (isSuccess) {
      document.location.reload();
    } else {
      console.log("Failed to add.");
    }
  };
  const generateColumns = (data: PlanMantenimiento): { Header: string; accessor: string }[] => {
    // Assuming Colaborador is an interface, you can get its keys using Object.keys
    const colaboradorKeys = Object.keys(data);

    // Dynamically generate the columns array
    return colaboradorKeys.map((key) => ({
      Header: key.charAt(0).toUpperCase() + key.slice(1),
      accessor: key,
    }));
  };

  const modalInputs = [
    { label: "Clave plan", dbName: "cve_plan", type: "text" },
    { label: "Descripción", dbName: "descripcion", type: "text" },
    { label: "Id Actividad", dbName: "id_actividades", type: "number" },
    { label: "Clave Actividad Plan", dbName: "cve_actvplan", type: "text" },
    { label: "Km's limite.", dbName: "kms_lim", type: "text" },
    { label: "Dias limite.", dbName: "dias_lim", type: "text" },
    { label: "Total Km's.", dbName: "tol_kms", type: "text" },
    { label: "Total Dias.", dbName: "tol_dias", type: "text" },
    { label: "Tipo ET.", dbName: "tipo_et", type: "text" },
  ];

  // Assuming allCC is an array of Colaborador objects
  const columns = generateColumns(allCC.length > 0 ? allCC[0] : ({} as PlanMantenimiento));

  return (
    <>
      {authorizedToRead && (
        <DataTableWithModal
          dialogTitle="Añadir nuevo plan de mantenimiento."
          title="Planes de Mantenimiento"
          dataTableData={{ rows: allCC, columns: columns }} // Pass the state to the prop.
          description="Información general de los planes de mantenimiento"
          buttonEditable={authorizedToWrite}
          modalInputs={modalInputs}
          onAdd={handleAddCentroCostos}
        />
      )}
      {!authorizedToRead && <Unauthorized />}
    </>
  );
}

export default PlanesMantenimiento;
