import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import dataTableData from "layouts/ecommerce/orders/order-list/data/dataTableData";
import DataTableWithModal from "../DataTableWithModal";

interface InputProps {
  label: string;
  type?: string;
}

interface DataTableProps {
  title: string;
  description: string;
  dataTableData: any;
  modalInputs?: InputProps[];
  onAdd?: (data: any) => void; // Callback when Add is clicked
}

function DataTableVariation({
  title,
  description,
  dataTableData,
  modalInputs,
  onAdd,
}: DataTableProps): JSX.Element {
  return (
    <div>
      {/* <DataTableWithModal
        dataTableData={dataTableData}
        title={title}
        description={description}
        {...(modalInputs ? { modalInputs } : {})}
        {...(onAdd ? { onAdd } : {})}
      />{" "} */}
    </div>
  );
}

export default DataTableVariation;
