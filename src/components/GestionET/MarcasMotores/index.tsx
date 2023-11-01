import { Box } from "@mui/system"; // Import Box from MUI
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import MDButton from "components/MDButton";

function MarcasMotores(): JSX.Element {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            p={3}
            lineHeight={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              {" "}
              {/* New Box component for grouping the typography elements */}
              <MDTypography variant="h5" fontWeight="medium">
                Marcas de equipo de transporte.
              </MDTypography>
              <MDTypography variant="button" color="text">
                Información general de las marcas de ET.
              </MDTypography>
            </Box>
            <MDButton variant="gradient" color="dark">
              Add new
            </MDButton>
          </MDBox>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MarcasMotores;
