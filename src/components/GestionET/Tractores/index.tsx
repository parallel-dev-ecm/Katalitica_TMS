import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import DataTableWithModal from "components/Resources/DataTableWithModal";

function TractoresTable(): JSX.Element {
  return (
    <div>
      {/* <DataTableWithModal
        title="Tractores"
        description="Información general de los tractores"
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

export default TractoresTable;
