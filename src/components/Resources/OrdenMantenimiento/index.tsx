import React, { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { gsap } from "gsap";
import { User, useUsersStore } from "stores/Generales/Store_Users";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormField from "layouts/pages/account/components/FormField";
import MDButton from "components/MDButton";
import { Alert, Autocomplete } from "@mui/material";
import OrdenReparacionInterface, { ClaveRequest } from "Interfaces";
import { handleChange } from "../functions";
import MDInput from "components/MDInput";
import { useDollyStore } from "stores/GestionET/Store_dollys";
import { useTractoresStore } from "stores/GestionET/Store_Tractores";
import { useRemolquesStore } from "stores/GestionET/Store_Remolques";
import { useTalleresStore } from "stores/Mantenimiento/Store_Talleres";
import { currentCompanyStore } from "stores/Generales/Store_Company";
import { Hubodometro, useHubodometroStore } from "stores/Mantenimiento/Store_Hubodometro";
import {
  OrdenReparacionActividades,
  useOrdenReparacionActividadesStore,
} from "stores/Mantenimiento/Store_OrdenReparacionActividades";
import DataTableNoLayout from "../DataTableWithModal/DataTableNoLayout";

function OrdenMantenimientoForm(): JSX.Element {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAllActividades = useOrdenReparacionActividadesStore((state) => state.readAllActividades);
  const allActividades = useOrdenReparacionActividadesStore((state) => state.allActividades);

  const getHubodometroByClave = useHubodometroStore((state) => state.getByClave);
  const updateKm_actuales = useHubodometroStore((state) => state.updateKm_actuales);
  const updateKm_totales = useHubodometroStore((state) => state.updateKm_totales);

  const getAllCompanias = currentCompanyStore((state) => state.getAllCompanies);
  const allCompanies = currentCompanyStore((state) => state.allCompanies);
  const getAllDollys = useDollyStore((state) => state.readAllDollys);
  const getAllRemolques = useRemolquesStore((state) => state.readAllRemolques);
  const getRemolqueByClave = useRemolquesStore((state) => state.getByClave);
  const getAllTractores = useTractoresStore((state) => state.readAllMarcas);
  const getAllTalleres = useTalleresStore((state) => state.readAllPuestos);
  const allTalleres = useTalleresStore((state) => state.allPuestos);
  const allDollys = useDollyStore((state) => state.allDollys);
  const allTractores = useTractoresStore((state) => state.allTractores);
  const getTractorByClave = useTractoresStore((state) => state.getByClave);
  const getDollyFromClave = useDollyStore((state) => state.getByClave);
  const allRemolques = useRemolquesStore((state) => state.allRemolques);
  const inputData = { allDollys, allTractores, allRemolques, allTalleres, allCompanies };
  // State variables for each form field
  const [compania, setCompania] = useState<string>("");
  const [taller, setTaller] = useState<string>("");
  const [folio, setFolio] = useState<string>("");
  const [motivo, setMotivo] = useState<string>("");
  const [estatus, setEstatus] = useState<string>("");
  const [fech_entra, setFechEntra] = useState<Date>(new Date());
  const [fech_sal, setFechSal] = useState<Date>(new Date());
  const [operador, setOperador] = useState<string>("");
  const [mecanico, setMecanico] = useState<string>("");
  const [tractor, setTractor] = useState<string>("");
  const [remolque, setRemolque] = useState<string>("");
  const [dolly, setDolly] = useState<string>("");
  const [observacion, setObservacion] = useState<string>("");
  const [id_actividades, setIdActividades] = useState<number>(0);
  const [id_centrocosto, setIdCentroCosto] = useState<number>(0);
  const [id_taller, setIdTaller] = useState<number>(0);
  const [id_operador, setIdOperador] = useState<number>(0);
  const [id_remolques, setIdRemolques] = useState<number>(0);
  const [id_tractores, setIdTractores] = useState<number>(0);
  const [id_dollys, setIdDollys] = useState<number>(0);
  const [id_compania, setIdCompania] = useState<number>(0);
  const [cve_act, setCveAct] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [actividad, setActividad] = useState<string>("");
  const [tiempo, setTiempo] = useState<number>(0);
  const [chek, setChek] = useState<boolean>(false);
  const [fech_rep, setFechRep] = useState<Date>(new Date());
  const [km_editable_remolques, setKmEditableRemolques] = useState<number>(0); // Add the missing property
  const [km_remolques, setKmRemolque] = useState<number>(0); // Add the missing property
  const [km_tractores, setKmTractores] = useState<number>(); // Add the missing property
  const [km_editable_tractores, setKmEditableTractores] = useState<number>(0); // Add the missing property
  const [km_dollys, setKmDollys] = useState<number>(0); // Add the missing property
  const [km_editable_dollys, setKmEditableDollys] = useState<number>(0); // Add the missing property

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const el = useRef();
  const mainTitle = useRef();
  const formRef = useRef();
  const tl = gsap.timeline();

  const allUsers = useUsersStore((state) => state.allUsers);
  const [authorizedToRead, SetAuthorizedToRead] = useState<boolean>(false);
  const [authorizedToWrite, SetAuthorizedToWrite] = useState<boolean>(false);
  const fetchUserApi = useUsersStore((state) => state.getUsers);

  const [idHubodometroRemolque, setIdHubodometroRemolque] = useState<number>();
  const [idHubodometroTractor, setIdHubodometroTractor] = useState<number>();
  const [idHubodometroDolly, setIdHubodometroDolly] = useState<number>();

  const handleSaveChanges = async () => {
    setIdCompania(1);
    setIdTaller(1);

    const ordenReparacion: OrdenReparacionInterface = {
      compania,
      taller,
      folio,
      motivo,
      estatus,
      fech_entra,
      fech_sal,
      operador,
      mecanico,
      tractor,
      remolque,
      dolly,
      km_remolques,
      km_editable_remolques,
      km_dollys,
      km_editable_dollys,
      observacion,
      id_actividades,
      id_centrocosto,
      id_taller,
      id_operador,
      id_remolques,
      id_tractores,
      id_dollys,
      id_compania,
      cve_act,
      descripcion,
      actividad,
      tiempo,
      chek,
      fech_rep,
      km_tractores, // Add the missing property
      km_editable_tractores, // Add the missing property
    };

    // Call the store function to update the company
    const updated = false;
    if (updated) {
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    } else {
      console.log(updated);
      console.log("error");
    }
  };

  useEffect(() => {
    async function fetchCompanyDetails() {
      setLoading(false); // Assuming 1 is the ID of the company you want to fetch
    }

    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    fetchUserApi();
  }, []);
  useEffect(() => {
    // Get username from sessionStorage
    const storedUsername = sessionStorage.getItem("userName");

    const user = allUsers.find((u) => u.username === storedUsername);

    if (user) {
      SetAuthorizedToRead(user.readMantenimientoET);
      SetAuthorizedToWrite(user.editMantenimientoEt);
    } else {
      console.log("User not found");
    }
  }, [allUsers]);

  useLayoutEffect(() => {
    if (!loading) {
      const gtx = gsap.context();
    }
    const ctx = gsap.context(() => {
      const mainBoxTween = gsap.fromTo(mainTitle.current, { opacity: 0 }, { opacity: 1, delay: 1 });
      tl.add(mainBoxTween);

      const signInTween = gsap.fromTo(formRef.current, { opacity: 0 }, { opacity: 1 });
      tl.add(signInTween);
    }, el);

    // cleanup function will be called when component is removed
    return () => {
      ctx.revert(); // animation cleanup!!
    };
  }, []);

  // get the data from the stores
  useEffect(() => {
    getAllDollys();
    getAllRemolques();
    getAllTractores();
    getAllTalleres();
    getAllCompanias();
    getAllActividades();
  }, []);

  const generateColumns = (
    data: OrdenReparacionActividades
  ): { Header: string; accessor: string }[] => {
    // Assuming Colaborador is an interface, you can get its keys using Object.keys
    const colaboradorKeys = Object.keys(data);

    // Dynamically generate the columns array
    return colaboradorKeys.map((key) => ({
      Header: key.charAt(0).toUpperCase() + key.slice(1),
      accessor: key,
    }));
  };
  const columns = generateColumns(
    allActividades.length > 0 ? allActividades[0] : ({} as OrdenReparacionActividades)
  );

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }} ref={el}>
      {
        <>
          <MDBox p={3} ref={mainTitle}>
            <MDTypography variant="h5">Orden de Reparación</MDTypography>
          </MDBox>
          {authorizedToRead && (
            <MDBox component="form" pb={3} px={3} ref={formRef}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    options={inputData.allCompanies.map((option) => option.nombre_corto)}
                    disabled={disabled}
                    onChange={(event, newValue) => {}}
                    renderInput={(params) => (
                      <FormField
                        variant="outlined"
                        {...params}
                        label="Compañia"
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    options={inputData.allTalleres.map((option) => option.nom_corto)}
                    disabled={disabled}
                    renderInput={(params) => (
                      <FormField
                        variant="outlined"
                        {...params}
                        label="Taller"
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    disabled={disabled}
                    variant="outlined"
                    label="Folio"
                    onChange={handleChange(setFolio)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField
                    disabled={disabled}
                    variant="outlined"
                    label="Motivo"
                    onChange={handleChange(setMotivo)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField
                    disabled={disabled}
                    variant="outlined"
                    label="Estatus"
                    onChange={handleChange(setEstatus)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <FormField
                        type="date"
                        disabled={disabled}
                        variant="outlined"
                        label="Fecha Entrada"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const dateString = e.target.value;

                          // Assuming the date string is in the format "YYYY-MM-DD"
                          const formattedDate = dateString
                            ? new Date(dateString + "T00:00:00")
                            : null;
                          setFechEntra(formattedDate);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        type="date"
                        label="Fecha Salida"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const dateString = e.target.value;

                          // Assuming the date string is in the format "YYYY-MM-DD"
                          const formattedDate = dateString
                            ? new Date(dateString + "T00:00:00")
                            : null;
                          setFechSal(formattedDate);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        type="date"
                        label="Fecha Alta"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const dateString = e.target.value;

                          // Assuming the date string is in the format "YYYY-MM-DD"
                          const formattedDate = dateString
                            ? new Date(dateString + "T00:00:00")
                            : null;
                          setFechRep(formattedDate);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Operador"
                        onChange={handleChange(setOperador)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Mecanico"
                        onChange={handleChange(setMecanico)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        options={inputData.allTractores.map((option) => option.clave)}
                        disabled={disabled}
                        onChange={async (event, newValue) => {
                          if (newValue) {
                            const req: ClaveRequest = { clave: newValue };
                            const tractorId = await getTractorByClave(req);
                            setIdTractores(tractorId);
                            const hubodometroRequest: ClaveRequest = {
                              clave: req.clave.replace(/\s/g, ""),
                            };
                            const currentHub: Hubodometro = await getHubodometroByClave(
                              hubodometroRequest
                            );
                            setIdHubodometroTractor(currentHub.id);
                            setKmTractores(currentHub.km_actuales);
                          }
                        }}
                        renderInput={(params) => (
                          <FormField
                            variant="outlined"
                            {...params}
                            label="Tractor"
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormField disabled={true} value={km_tractores} label="Km Actuales" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Km Editable"
                        onChange={handleChange(setKmEditableTractores)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        options={inputData.allRemolques.map((option) => option.clave)}
                        disabled={disabled}
                        onChange={async (event, newValue) => {
                          if (newValue) {
                            const req: ClaveRequest = { clave: newValue };
                            const remolqueId = await getRemolqueByClave(req);
                            setIdRemolques(remolqueId);
                            const hubodometroRequest: ClaveRequest = {
                              clave: req.clave.replace(/\s/g, ""),
                            };
                            const currentHub: Hubodometro = await getHubodometroByClave(
                              hubodometroRequest
                            );
                            setIdHubodometroRemolque(currentHub.id);
                            setKmRemolque(currentHub.km_actuales);
                          }
                        }}
                        renderInput={(params) => (
                          <FormField
                            variant="outlined"
                            {...params}
                            label="Remolque"
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormField
                        disabled={true}
                        value={km_remolques}
                        variant="outlined"
                        label="Km Actuales"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Km Editable"
                        onChange={handleChange(setKmEditableRemolques)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        options={inputData.allDollys.map((option) => option.clave)}
                        disabled={disabled}
                        onChange={async (event, newValue) => {
                          if (newValue) {
                            const req: ClaveRequest = { clave: newValue };
                            const dollyId = await getDollyFromClave(req);
                            setIdDollys(dollyId);
                            const hubodometroRequest: ClaveRequest = {
                              clave: newValue.replace(/\s/g, "O-"),
                            };
                            const currentHub: Hubodometro = await getHubodometroByClave(
                              hubodometroRequest
                            );
                            setIdDollys(currentHub.id);
                            setKmDollys(currentHub.km_actuales);
                          }
                        }}
                        renderInput={(params) => (
                          <FormField
                            variant="outlined"
                            {...params}
                            label="Dolly"
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormField
                        disabled={true}
                        value={km_dollys}
                        variant="outlined"
                        label="Km Actuales"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Km Editable"
                        onChange={handleChange(setKmEditableDollys)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <MDInput
                        style={{ width: "100%" }}
                        disabled={disabled}
                        multiline
                        variant="outlined"
                        label="Observaciones"
                        onChange={handleChange(setObservacion)}
                      />
                    </Grid>
                    <br />
                    <Grid item xs={12} sm={12}>
                      <DataTableNoLayout
                        dataTableData={{ rows: allActividades, columns: columns }} // Pass the state to the prop.
                        title="Actividades"
                        description="Información General Actividades"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <MDBox display="flex">
                  {showSuccessAlert && (
                    <Alert severity="success">Compañia actualizada exitosamente.</Alert>
                  )}
                </MDBox>
                {
                  <Grid item xs={12} sm={6}>
                    <MDBox display="flex" justifyContent="flex-end">
                      <MDButton
                        disabled={!authorizedToWrite}
                        variant="gradient"
                        color="dark"
                        onClick={handleSaveChanges}
                      >
                        Guardar Cambios
                      </MDButton>
                    </MDBox>
                  </Grid>
                }
              </Grid>
            </MDBox>
          )}
          {!authorizedToRead && <Alert severity="error">Sin permisos.</Alert>}
        </>
      }
    </Card>
  );
}

export default OrdenMantenimientoForm;
