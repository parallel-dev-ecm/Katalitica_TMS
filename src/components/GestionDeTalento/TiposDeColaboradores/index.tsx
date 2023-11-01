import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import MDBox from "components/MDBox";
import { Grid } from "@mui/material";

type Props = {};

function TiposColaboradores({}: Props) {
  return (
    <div>
      <BaseLayout>
        <MDBox pt={4} pb={3}>
          <Grid container spacing={5} justifyContent={"center"} alignItems={"center"}>
            <Grid item xs={12} sm={6} lg={6}>
              <MDBox mb={3}>
                <ProfileInfoCard
                  title="Colaborador A"
                  description="Encargados de supervisar area 2. "
                  info={{
                    Salario: "$2323",
                    Gerente: "alecthompson@mail.com",
                    Cantidad: "20",
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <MDBox mb={3}>
                <ProfileInfoCard
                  title="Colaborador B"
                  description="Encargados de supervisar area 2. "
                  info={{
                    Salario: "$2323",
                    Gerente: "alecthompson@mail.com",
                    Cantidad: "20",
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <MDBox mb={3}>
                <ProfileInfoCard
                  title="Colaborador C"
                  description="Encargados de supervisar area 1. "
                  info={{
                    Salario: "$2323",
                    Gerente: "alecthompson@mail.com",
                    Cantidad: "20",
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </BaseLayout>
    </div>
  );
}

export default TiposColaboradores;
