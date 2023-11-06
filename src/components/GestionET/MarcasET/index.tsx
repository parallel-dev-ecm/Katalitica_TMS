import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import DataTableWithModal from "components/Resources/DataTableWithModal";
import { useUsersStore, User } from "Store_Users";
import { useEffect, useState } from "react";
import { MarcaET, useMarcasETStore } from "Store_MarcasET";
import Unauthorized from "components/Resources/Unauthorized";

function MarcasET(): JSX.Element {
  const columns = [
    { Header: "Clave", accessor: "clave" },
    { Header: "Descripción", accessor: "descripcion" },
  ];

  const getAllMarcas = useMarcasETStore((state) => state.readAllMarcasET);
  const allCC = useMarcasETStore((state) => state.allMarcasET);
  const postCC = useMarcasETStore((state) => state.addMarcaET);
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

  const handleAddCentroCostos = async (data: MarcaET) => {
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
          buttonEditable={authorizedToWrite}
          modalInputs={[
            { label: "Clave", dbName: "clave", type: "text" },
            { label: "Descripción", dbName: "descripcion", type: "text" },
          ]}
          onAdd={handleAddCentroCostos}
        />
      )}
      {!authorizedToRead && <Unauthorized />}
    </>
  );
}

export default MarcasET;
