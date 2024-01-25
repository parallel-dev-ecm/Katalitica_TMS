import React, { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { gsap } from "gsap";
import { useUsersStore } from "stores/Generales/Store_Users";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormField from "layouts/pages/account/components/FormField";
import { Alert, Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import { ordenReparacionStore } from "stores/Mantenimiento/Store_OrdenReparacion";
import OrdenReparacionInterface from "Interfaces";
import DataTableNoLayoutVariation from "components/Resources/DataTableVariation";

function GetOrdenMantenimiento(): JSX.Element {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const allOrdenes = ordenReparacionStore((state) => state.allOrdenes);
  const getAllOrdenes = ordenReparacionStore((state) => state.getAllOrdenes);
  const getOrdenById = ordenReparacionStore((state) => state.getOrdenById);
  const [currentOrden, setCurrentOrden] = useState<OrdenReparacionInterface>(
    {} as OrdenReparacionInterface
  );

  const el = useRef();
  const mainTitle = useRef();
  const formRef = useRef();
  const tl = gsap.timeline();

  const [segundoRemolque, setSegundoRemolque] = useState<boolean>(false);
  const allUsers = useUsersStore((state) => state.allUsers);
  const [authorizedToRead, SetAuthorizedToRead] = useState<boolean>(false);
  const [authorizedToWrite, SetAuthorizedToWrite] = useState<boolean>(false);
  const fetchUserApi = useUsersStore((state) => state.getUsers);

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
    getAllOrdenes();
  }, []);

  const generateColumns = (
    data: OrdenReparacionInterface
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
    allOrdenes.length > 0 ? allOrdenes[0] : ({} as OrdenReparacionInterface)
  );
  useEffect(() => {
    // Log the currentOrden whenever it changes
    console.log(currentOrden);
    console.log(currentOrden.km_remolque2);
  }, [currentOrden]);
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }} ref={el}>
      {
        <>
          <MDBox p={3} ref={mainTitle}>
            <MDTypography variant="h5">Ordenes de Reparación</MDTypography>
          </MDBox>
          {authorizedToRead && (
            <MDBox component="form" pb={3} px={3} ref={formRef}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    options={allOrdenes.map((option) => option.id)}
                    onChange={async (event, newValue) => {
                      if (newValue) {
                        const orden = await getOrdenById(newValue.toString());
                        setCurrentOrden(orden);
                        console.log(currentOrden);
                      }
                    }}
                    renderInput={(params) => (
                      <FormField
                        variant="outlined"
                        {...params}
                        label="Id Orden Reparación"
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormField
                    variant="outlined"
                    label="Compañia"
                    disabled={true}
                    value={currentOrden.compania}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormField
                    variant="outlined"
                    label="Taller"
                    disabled={true}
                    value={currentOrden.taller}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    disabled={disabled}
                    variant="outlined"
                    label="Folio"
                    value={currentOrden.folio}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField
                    disabled={disabled}
                    variant="outlined"
                    label="Motivo"
                    value={currentOrden.motivo}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormField
                    disabled={disabled}
                    variant="outlined"
                    label="Estatus"
                    value={currentOrden.estatus}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Fecha Entrada"
                        value={currentOrden.fech_entra}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Fecha Salida"
                        value={currentOrden.fech_sal}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Fecha Rep  "
                        value={currentOrden.fech_rep}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        variant="outlined"
                        label="Opearador"
                        disabled={true}
                        value={currentOrden.operador}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Mecanico"
                        value={currentOrden.mecanico}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        variant="outlined"
                        label="Tractor"
                        disabled={true}
                        value={currentOrden.tractor}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={true}
                        value={currentOrden.km_tractores}
                        label="Km Totales"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Remolque"
                        value={currentOrden.remolque}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={true}
                        value={currentOrden.km_remolques}
                        variant="outlined"
                        label="Km Totales"
                      />
                    </Grid>

                    {currentOrden.remolque2 && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            disabled={disabled}
                            variant="outlined"
                            label="Remolque 2"
                            value={currentOrden.remolque2}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            disabled={true}
                            value={currentOrden.km_remolque2}
                            variant="outlined"
                            label="Km Totales"
                          />
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Dolly"
                        value={currentOrden.dolly}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={true}
                        value={currentOrden.km_dollys}
                        variant="outlined"
                        label="Km Totales"
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <MDInput
                        style={{ width: "100%" }}
                        disabled={disabled}
                        multiline
                        variant="outlined"
                        value={currentOrden.observacion}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Actividad"
                        value={currentOrden.actividad}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Descripcion"
                        value={currentOrden.descripcion}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Clave Actividad"
                        value={currentOrden.cve_act}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Checked?"
                        value={currentOrden.chek}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        disabled={disabled}
                        variant="outlined"
                        label="Tiempo"
                        value={currentOrden.tiempo}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <DataTableNoLayoutVariation
                        dataTableData={{ rows: allOrdenes, columns: columns }} // Pass the state to the prop.
                        title="Ordenes Creadas"
                        description="Ordenes Creadas a la fecha"
                        buttonText="Añadir Orden"
                        buttonEditable={authorizedToWrite}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          )}
          {!authorizedToRead && <Alert severity="error">Sin permisos.</Alert>}
        </>
      }
    </Card>
  );
}

export default GetOrdenMantenimiento;
