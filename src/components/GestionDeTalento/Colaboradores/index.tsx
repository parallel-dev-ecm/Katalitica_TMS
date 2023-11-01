import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultDoughnutChart from "components/Resources/DoughutChart";
import DataTableWithModal from "components/Resources/DataTableWithModal";
import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import SingleDataTable from "components/Resources/SingleDataTable";

type Props = {};

function Colaboradores({}: Props) {
  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <div>
          <SingleDataTable
            title="Colaboradores"
            description="Información general de mis colaboradores"
            dataTableData={dataTableData}
            modalInputs={[
              { label: "First Name", type: "text" },
              { label: "Last Name", type: "text" },
              { label: "Email", type: "email" },
            ]}
            onAdd={(data) => {
              console.log("Data submitted:", data);
            }}
          />
        </div>{" "}
        <br />
        <DefaultDoughnutChart
          icon={{ color: "info", component: "leaderboard" }}
          title="Distribución de colaboradores"
          description="¿Cómo estan repartidos mis colaboradores?"
          chart={{
            labels: ["Mecánico", "Mecánico AA", "Ingeniero", "Pasante", "RH"],
            datasets: {
              label: "Colaboradores",
              backgroundColors: ["info", "dark", "error", "secondary", "primary"],
              data: [15, 20, 12, 60, 20],
            },
          }}
        />
      </DashboardLayout>
    </div>
  );
}

export default Colaboradores;
