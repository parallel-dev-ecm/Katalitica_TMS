import React, { useState, ChangeEvent, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// react-router-dom components
import { gsap } from "gsap";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components

// Images
import bgImage from "assets/images/bg-sign-in-cover.jpeg";
import CoverLayout from "../Components/CoverLayout";
import { useAuthStore } from "Store_Auth";

function Cover(): JSX.Element {
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const authenticate = useAuthStore((state) => state.authenticate);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [username, setUsername] = useState<string>(""); // New state
  const [password, setPassword] = useState<string>("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const el = useRef();
  const mainBox = useRef();
  const signInRef = useRef();
  const tl = gsap.timeline();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboards/analytics");
    }
  }, []);

  const handleLogin = async () => {
    const success = await authenticate(username, password);
    if (success) {
      navigate("/dashboards/analytics");
    } else {
      console.log(success);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mainBoxTween = gsap.fromTo(mainBox.current, { scale: 0 }, { scale: 1 });
      tl.add(mainBoxTween);

      const signInTween = gsap.fromTo(signInRef.current, { opacity: 0 }, { opacity: 1 });
      tl.add(signInTween);
    }, el);

    // cleanup function will be called when component is removed
    return () => {
      ctx.revert(); // animation cleanup!!
    };
  }, []);

  return (
    <CoverLayout image={bgImage}>
      <Card ref={el}>
        <MDBox
          ref={mainBox}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Iniciar Sesión
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Inicia sesión con tu usuario de AD.
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox ref={signInRef} component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="username"
                label="Username"
                variant="standard"
                fullWidth
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} // Update username
                placeholder="john@example.com"
                InputLabelProps={{ shrink: true }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                placeholder="************"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} // Update password
                InputLabelProps={{ shrink: true }}
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleLogin} variant="gradient" color="info" fullWidth>
                Iniciar Sesión
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
