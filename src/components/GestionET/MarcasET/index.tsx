import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import DataTableWithModal from "components/Resources/DataTableWithModal";

function MarcasET(): JSX.Element {
  return (
    <div>
      <DataTableWithModal
        title="Marcas ET"
        description="Información general de las marcas de ET"
        dataTableData={dataTableData}
        // modalInputs={[
        //   { label: "First Name", type: "text" },
        //   { label: "Last Name", type: "text" },
        //   { label: "Email", type: "email" },
        // ]}
        onAdd={(data) => {
          console.log("Data submitted:", data);
        }}
      />
    </div>
  );
}

export default MarcasET;
