import DataTableWithModal from "components/Resources/DataTableWithModal";
import { useUsersStore, User } from "stores/Generales/Store_Users";
import { useEffect, useState } from "react";
import { MarcaET, useMarcasETStore } from "stores/GestionET/Store_MarcasET";
import Unauthorized from "components/Resources/Unauthorized";
import { useMarcasLlantasStore } from "stores/Llantas/Marcas";
import { LlantasCatalogoInterface, useLlantasCatalogoStore } from "stores/Llantas/LlantasCatalogo";

function LlantasCatalogo(): JSX.Element {
  const generateColumns = (
    data: LlantasCatalogoInterface
  ): { Header: string; accessor: string }[] => {
    // Assuming Colaborador is an interface, you can get its keys using Object.keys
    const colaboradorKeys = Object.keys(data);

    // Dynamically generate the columns array
    return colaboradorKeys.map((key) => ({
      Header: key.charAt(0).toUpperCase() + key.slice(1),
      accessor: key,
    }));
  };

  const getAllMarcas = useLlantasCatalogoStore((state) => state.readAllData);
  const allCC = useLlantasCatalogoStore((state) => state.allData);
  const postCC = useLlantasCatalogoStore((state) => state.addData);
  const fetchUserApi = useUsersStore((state) => state.getUsers);
  const allUsers = useUsersStore((state) => state.allUsers);
  const [currentUser, setCurrentUser] = useState<User>();
  const [authorizedToRead, SetAuthorizedToRead] = useState<boolean>(false);
  const [authorizedToWrite, SetAuthorizedToWrite] = useState<boolean>(false);
  const readPath = "/llantas/getAllLlantasCatalogo";
  const pushPath = "/llantas/postLlantasCatalogo";

  useEffect(() => {
    getAllMarcas(readPath);
    console.log(allCC);
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

  const handleAddCentroCostos = async (data: LlantasCatalogoInterface) => {
    const isSuccess = await postCC(data, pushPath);
    console.log(data);
    if (isSuccess) {
      document.location.reload();
    } else {
      console.log("Failed to add.");
    }
  };

  const columns = generateColumns(allCC.length > 0 ? allCC[0] : ({} as LlantasCatalogoInterface));

  return (
    <>
      {authorizedToRead && (
        <DataTableWithModal
          dialogTitle="Añadir nuevo estatus de llantas."
          title="Estatus de llantas"
          dataTableData={{ rows: allCC, columns: columns }} // Pass the state to the prop.
          description="Información General de los estatus de llantas"
          buttonEditable={authorizedToWrite}
          modalInputs={[
            { label: "Clave", dbName: "clavell", type: "text" },
            { label: "Clave ET", dbName: "clave_et", type: "text" },
            { label: "Posición", dbName: "posicion", type: "text" },
            { label: "Milímetros", dbName: "milimetros", type: "text" },
            { label: "Kms Ant", dbName: "kms_ant", type: "text" },
            { label: "Kms Act", dbName: "kms_act", type: "text" },
            { label: "Presión", dbName: "presion", type: "text" },
            { label: "Presión Est", dbName: "presion_est", type: "text" },
            { label: "Fecha Act", dbName: "fecha_act", type: "date" },
            { label: "Observaciones", dbName: "observaciones", type: "text" },
            { label: "Marca", dbName: "id_marcall", type: "text" },
            { label: "Modelo", dbName: "id_modeloll", type: "text" },
            { label: "Tipo Piso", dbName: "id_tipopiso", type: "text" },
            { label: "Medida", dbName: "id_medidall", type: "text" },
            { label: "Estatus", dbName: "id_estatusll", type: "text" },
          ]}
          onAdd={handleAddCentroCostos}
        />
      )}
      {!authorizedToRead && <Unauthorized />}
    </>
  );
}

export default LlantasCatalogo;
