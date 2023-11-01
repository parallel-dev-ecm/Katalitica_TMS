import React from "react";
import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import DataTableWithModal from "components/Resources/DataTableWithModal";

type Props = {};

function Remolques({}: Props) {
  return (
    <div>
      {/* <DataTableWithModal
        title="Remolques"
        description="Remolques(Tanques, plataformas, Cajas seca, Caja refrigerada)"
        dataTableData={dataTableData}
        modalInputs={[
          { label: "First Name", type: "text" },
          { label: "Last Name", type: "text" },
          { label: "Email", type: "email" },
        ]}
        onAdd={(data) => {
          console.log("Data submitted:", data);
        }}
      /> */}
    </div>
  );
}

export default Remolques;
