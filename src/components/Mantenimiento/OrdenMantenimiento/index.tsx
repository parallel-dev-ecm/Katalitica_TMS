import OrdenMantenimientoForm from "components/Resources/OrdenMantenimiento";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import BasicInfo from "layouts/pages/account/settings/components/BasicInfo";
import React from "react";

type Props = {};

function OrdenMantenimientoIndex({}: Props) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />

      <OrdenMantenimientoForm />
    </DashboardLayout>
  );
}

export default OrdenMantenimientoIndex;
