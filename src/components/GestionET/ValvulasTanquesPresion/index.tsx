import DataTableWithModal from "components/Resources/DataTableWithModal";
import { useUsersStore, User } from "stores/Generales/Store_Users";
import { useEffect, useState } from "react";
import Unauthorized from "components/Resources/Unauthorized";
import { useValvulasPresionStore, ValvulaPresion } from "stores/GestionET/Store_ValvulasPresion";

function ValvulasPresion(): JSX.Element {
  const columns = [
    { Header: "Clave", accessor: "valvula_clave" },
    { Header: "Nomo13_dlc", accessor: "nomo13_dlc" },
    { Header: "Nomo13_fec", accessor: "nomo13_fec" },
    { Header: "Nomo13_uv", accessor: "nomo13_uv" },
    { Header: "Nomo07_dlc", accessor: "nomo07_dlc" },
    { Header: "Nomo07_fec", accessor: "nomo07_fec" },
    { Header: "Nomo07_uv", accessor: "nomo07_uv" },
    { Header: "Fec_vertor", accessor: "fec_vertor" },
    { Header: "Uv_vertor", accessor: "uv_vertor" },
    { Header: "Fec_revvl", accessor: "fec_revvl" },
    { Header: "Rev_valuv", accessor: "rev_valuv" },
    { Header: "Vef01_dia", accessor: "vef01_dia" },
    { Header: "Vef01_marca", accessor: "vef01_marca" },
    { Header: "Vef01_ffab", accessor: "vef01_ffab" },
    { Header: "Vef01_fins", accessor: "vef01_fins" },
    { Header: "Vef02_dia", accessor: "vef02_dia" },
    { Header: "Vef02_marca", accessor: "vef02_marca" },
    { Header: "Vef02_ffab", accessor: "vef02_ffab" },
    { Header: "Vef02_fins", accessor: "vef02_fins" },
    { Header: "Vef03_dia", accessor: "vef03_dia" },
    { Header: "Vef03_marca", accessor: "vef03_marca" },
    { Header: "Vef03_ffab", accessor: "vef03_ffab" },
    { Header: "Vef03_fins", accessor: "vef03_fins" },
    { Header: "Vseg01_dia", accessor: "vseg01_dia" },
    { Header: "Vseg01_marca", accessor: "vseg01_marca" },
    { Header: "Vseg01_serie", accessor: "vseg01_serie" },
    { Header: "Vseg01_ffab", accessor: "vseg01_ffab" },
    { Header: "Vseg01_fins", accessor: "vseg01_fins" },
    { Header: "Vseg02_dia", accessor: "vseg02_dia" },
    { Header: "Vseg02_marca", accessor: "vseg02_marca" },
    { Header: "Vseg02_serie", accessor: "vseg02_serie" },
    { Header: "Vseg02_ffab", accessor: "vseg02_ffab" },
    { Header: "Vseg02_fins", accessor: "vseg02_fins" },
    { Header: "Vnor01_dia", accessor: "vnor01_dia" },
    { Header: "Vnor01_marca", accessor: "vnor01_marca" },
    { Header: "Vnor01_ffab", accessor: "vnor01_ffab" },
    { Header: "Vnor01_fins", accessor: "vnor01_fins" },
    { Header: "Ins_part_fel", accessor: "ins_part_fel" },
    { Header: "Ins_part_reg", accessor: "ins_part_reg" },
    { Header: "Ins_part_inf", accessor: "ins_part_inf" },
    { Header: "Remolque Clave", accessor: "remolque_clave" },
    { Header: "Marca Valvula Clave", accessor: "marcavl_clave" },
  ];

  const getAllMarcas = useValvulasPresionStore((state) => state.readAllValvulas);
  const allCC = useValvulasPresionStore((state) => state.allValvulas);
  const postCC = useValvulasPresionStore((state) => state.addValvula);
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

  const handleAddCentroCostos = async (data: ValvulaPresion) => {
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
          dialogTitle="Añadir nueva Valvula a Presión."
          title="Valvulas A Presión"
          dataTableData={{ rows: allCC, columns: columns }} // Pass the state to the prop.
          description="Información general de los Valvulas a Presion"
          buttonEditable={authorizedToWrite}
          modalInputs={[
            { label: "Clave", dbName: "clave", type: "text" },
            { label: "Nomo13_dlc", dbName: "nomo13Dlc", type: "text" },
            { label: "Nomo13_fec", dbName: "nomo13Fec", type: "text" },
            { label: "Nomo13_uv", dbName: "nomo13Uv", type: "text" },
            { label: "Nomo07_dlc", dbName: "nomo07Dlc", type: "text" },
            { label: "Nomo07_fec", dbName: "nomo07Fec", type: "text" },
            { label: "Nomo07_uv", dbName: "nomo07Uv", type: "text" },
            { label: "Fec_vertor", dbName: "fecVertor", type: "text" },
            { label: "Uv_vertor", dbName: "uvVertor", type: "text" },
            { label: "Fec_revvl", dbName: "fecRevvl", type: "text" },
            { label: "Rev_valuv", dbName: "revValuv", type: "text" },
            { label: "Vef01_dia", dbName: "vef01Dia", type: "text" },
            { label: "Vef01_marca", dbName: "vef01Marca", type: "text" },
            { label: "Vef01_ffab", dbName: "vef01Ffab", type: "text" },
            { label: "Vef01_fins", dbName: "vef01Fins", type: "text" },
            { label: "Vef02_dia", dbName: "vef02Dia", type: "text" },
            { label: "Vef02_marca", dbName: "vef02Marca", type: "text" },
            { label: "Vef02_ffab", dbName: "vef02Ffab", type: "text" },
            { label: "Vef02_fins", dbName: "vef02Fins", type: "text" },
            { label: "Vef03_dia", dbName: "vef03Dia", type: "text" },
            { label: "Vef03_marca", dbName: "vef03Marca", type: "text" },
            { label: "Vef03_ffab", dbName: "vef03Ffab", type: "text" },
            { label: "Vef03_fins", dbName: "vef03Fins", type: "text" },
            { label: "Vseg01_dia", dbName: "vseg01Dia", type: "text" },
            { label: "Vseg01_marca", dbName: "vseg01Marca", type: "text" },
            { label: "Vseg01_serie", dbName: "vseg01Serie", type: "text" },
            { label: "Vseg01_ffab", dbName: "vseg01Ffab", type: "text" },
            { label: "Vseg01_fins", dbName: "vseg01Fins", type: "text" },
            { label: "Vseg02_dia", dbName: "vseg02Dia", type: "text" },
            { label: "Vseg02_marca", dbName: "vseg02Marca", type: "text" },
            { label: "Vseg02_serie", dbName: "vseg02Serie", type: "text" },
            { label: "Vseg02_ffab", dbName: "vseg02Ffab", type: "text" },
            { label: "Vseg02_fins", dbName: "vseg02Fins", type: "text" },
            { label: "Vnor01_dia", dbName: "vnor01Dia", type: "text" },
            { label: "Vnor01_marca", dbName: "vnor01Marca", type: "text" },
            { label: "Vnor01_ffab", dbName: "vnor01Ffab", type: "text" },
            { label: "Vnor01_fins", dbName: "vnor01Fins", type: "text" },
            { label: "Ins_part_fel", dbName: "insPartFel", type: "text" },
            { label: "Ins_part_reg", dbName: "insPartReg", type: "text" },
            { label: "Ins_part_inf", dbName: "insPartInf", type: "text" },
            { label: "Remolque Clave", dbName: "remolqueClave", type: "text" },
            { label: "Marca Valvula Clave", dbName: "marcaValvulaClave", type: "text" },
            { label: "Id_remolques", dbName: "idRemolques", type: "text" },
            { label: "Id_marcavl", dbName: "idMarcavl", type: "text" },
          ]}
          onAdd={handleAddCentroCostos}
        />
      )}
      {!authorizedToRead && <Unauthorized />}
    </>
  );
}

export default ValvulasPresion;
