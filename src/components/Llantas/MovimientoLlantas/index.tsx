import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useRef } from "react";
import DataTable from "examples/Tables/DataTable";
import { Box } from "@mui/system";
// Data
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import MovLlantasScene from "components/Three-Fiber/MovimientoLlantasScene/MovLlantaScene";
import { MovimientoLlantas, useMovimientoLlantasStore } from "stores/Llantas/MovimientoLlantas";
import {
  useMaterialReactTable,
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_Cell,
  createMRTColumnHelper,
} from "material-react-table";
import { useGeneralesStore } from "stores/Generales/Store_Generales";
import { UpdateTableDynamically } from "Interfaces";
import { Button, Grid } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import EditableDataTable from "components/Resources/EditableDataTable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import EditableDataTableNoLayout from "components/Resources/EditableTableNoLayout";
import gsap from "gsap";
type Props = {};

function MovimientoLlantasIndex({}: Props) {
  const EditableDataTableRef = useRef(null);
  const allData = useMovimientoLlantasStore((state) => state.allData);
  const readAllData = useMovimientoLlantasStore((state) => state.readAllData);
  const updateTable = useGeneralesStore((state) => state.updateTable);
  const postCC = useMovimientoLlantasStore((state) => state.addData);
  const tableName = "  KataliticaTMS_Test.Llantas.MovimientoLlantas";
  const columnHelper = createMRTColumnHelper<MovimientoLlantas>();
  const generateColumns = (data: MovimientoLlantas): { Header: string; accessor: string }[] => {
    // Assuming Colaborador is an interface, you can get its keys using Object.keys
    const colaboradorKeys = Object.keys(data);

    // Dynamically generate the columns array
    return colaboradorKeys.map((key) => ({
      Header: key.charAt(0).toUpperCase() + key.slice(1),
      accessor: key,
    }));
  };
  useEffect(() => {
    const readPath = "/movimientoLlantas/getAllMovimientoLlantas";

    readAllData(readPath);
  });

  const columns = generateColumns(allData.length > 0 ? allData[0] : ({} as MovimientoLlantas));

  const pushPath = "/movimientoLlantas/postMovimientoLlanta";
  const handleAddCentroCostos = async (data: MovimientoLlantas) => {
    const isSuccess = await postCC(data, pushPath);
    console.log(data);
    if (isSuccess) {
      document.location.reload();
    } else {
      console.log("Failed to add.");
    }
  };

  const columnsET = columns.map((column) => {
    const accessor = column.accessor as keyof MovimientoLlantas; // Type assertion

    return {
      ...columnHelper.accessor(accessor, {
        header: column.Header,
        muiEditTextFieldProps: ({
          cell,
          row,
          table,
        }: {
          cell: MRT_Cell<MovimientoLlantas, string>;
          row: MRT_Row<MovimientoLlantas>;
          table: MRT_TableInstance<MovimientoLlantas>;
        }) => ({
          onBlur: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
            const req: UpdateTableDynamically = {
              id: row.original.id,
              tableName: tableName,
              value: event.target.value,
              columnName: column.accessor,
            };
            updateTable(req);
            //validate data
            //save data to api and/or rerender table
            // table.setEditingCell(null) is called automatically onBlur internally
          },
        }),
      }),
    };
  });

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows: MRT_Row<MovimientoLlantas>[], tableTitle?: string) => {
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation);
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columnsET.map((c) => c.header);
    const rowData = rows.map((row: any) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
    if (tableTitle) {
      doc.text(tableTitle, 15, 10);
    }

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      styles: {},
      pageBreak: "auto",
      showHead: true,
    });

    doc.save("Dolly.pdf");
  };
  const table = useMaterialReactTable({
    columns: columnsET,
    data: allData,
    enableRowSelection: false,
    editDisplayMode: "cell",
    enableEditing: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          disabled={false}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows, "Información Llantas")
          }
          startIcon={<FileDownloadIcon />}
        >
          Exportar todas las filas
        </Button>
        <Button
          disabled={false}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export filas actuales
        </Button>
      </Box>
    ),
  });
  const modalInputs = [
    { label: "Número de Orden", dbName: "num_orden", type: "string" },
    { label: "Fecha", dbName: "fecha", type: "date" },
    { label: "Posición Montada", dbName: "pos_montada", type: "string" },
    { label: "Número Montada", dbName: "num_montada", type: "string" },
    { label: "DOT Montada", dbName: "dot_montada", type: "string" },
    { label: "MM Montada", dbName: "mm_montada", type: "string" },
    { label: "Marca Montada", dbName: "marca_montada", type: "string" },
    { label: "Piso Montada", dbName: "piso_montada", type: "string" },
    { label: "Motivo Montada", dbName: "motivo_montada", type: "string" },
    { label: "Destino Montada", dbName: "destino_montada", type: "string" },
    { label: "Número Montadar", dbName: "num_montadar", type: "string" },
    { label: "DOT Montadar", dbName: "dot_montadar", type: "string" },
    { label: "MM Montadar", dbName: "mm_montadar", type: "string" },
    { label: "Marca Montadar", dbName: "marca_montadar", type: "string" },
    { label: "Piso Montadar", dbName: "piso_montadar", type: "string" },
    { label: "ID Estatus", dbName: "id_estatus", type: "string" },
    { label: "ID Dolly", dbName: "id_dolly", type: "string" },
    { label: "ID Remolque", dbName: "id_remolque", type: "string" },
    { label: "ID Tractor", dbName: "id_tractor", type: "string" },
    { label: "ID Llanta", dbName: "id_llanta", type: "string" },
  ];

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}></MDBox>
        <MDBox>
          <Grid container>
            <Grid item xs={3} sm={3}>
              <MDBox>
                <MDButton variant="gradient" color="dark" onClick={() => console.log("clicked")}>
                  Ver Llantas Montadas
                </MDButton>
              </MDBox>
            </Grid>

            <Grid item xs={3} sm={3}>
              <MDBox>
                <MDButton variant="gradient" color="dark" onClick={() => console.log("Hola")}>
                  Ver Llantas Por Montar
                </MDButton>
              </MDBox>
            </Grid>

            <Grid item xs={3} sm={3}>
              <MDBox>
                <MDButton
                  variant="gradient"
                  color="dark"
                  onClick={() =>
                    gsap.fromTo(
                      EditableDataTableRef.current,
                      { opacity: 0 },
                      { opacity: 1, duration: 1 }
                    )
                  }
                >
                  Ver todos los movimientos
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <div style={{ opacity: 0 }} ref={EditableDataTableRef}>
          <EditableDataTableNoLayout
            title="Todos Movimientos Llantas"
            table={table}
            onAdd={handleAddCentroCostos}
            modalInputs={modalInputs}
          />
        </div>
      </DashboardLayout>
      <Footer />
    </>
  );
}

export default MovimientoLlantasIndex;