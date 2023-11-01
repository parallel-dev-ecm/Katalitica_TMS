import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import DataTableWithModal from "components/Resources/DataTableWithModal";

function MarcasValvulas(): JSX.Element {
  return (
    <div>
      {/* <DataTableWithModal
        title="Marcas de valvulas"
        description="Información general de las marcas de valvulas"
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

export default MarcasValvulas;
