// @mui material components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import Header from "layouts/pages/account/settings/components/Header";
import Notifications from "layouts/pages/account/settings/components/Notifications";

function UserSecurity(): JSX.Element {
  return (
    <BaseLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={0.1} justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header />
                </Grid>
                <Grid item xs={12}>
                  <Notifications />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </BaseLayout>
  );
}

export default UserSecurity;
