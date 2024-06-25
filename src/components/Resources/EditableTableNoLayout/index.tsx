import React, { useState } from "react";
import { Box } from "@mui/system";
import { MaterialReactTable } from "material-react-table";

import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useDollyStore } from "stores/GestionET/Store_dollys";
import { useRemolquesStore } from "stores/GestionET/Store_Remolques";
import { useTractoresStore } from "stores/GestionET/Store_Tractores";

import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { Autocomplete, Grid } from "@mui/material";
import FormField from "layouts/pages/account/components/FormField";

interface InputProps {
  label: string;
  dbName: string;
  type?: string;
  options?: any;
  func?: (event: any, newValue: any) => Promise<number>;
}

interface DataTableWithModalProps {
  title: string;
  table: any;
  onAdd?: (data: any) => void; // Callback when Add is clicked
  modalInputs?: InputProps[];
  inputData?: any;
  dropDownFunc?: (event: any, newValue: any) => Promise<number>;
}
function EditableDataTableNoLayout({
  title,
  table,
  onAdd,
  modalInputs,
  inputData,
  dropDownFunc,
}: DataTableWithModalProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({}); // Step 1: Create formData state

  let key = 0;
  let secondKey = 1000;
  const handleOpen = () => {
    setFormData({});

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (label: string, value: string) => {
    // Step 2: Update formData state with new input values
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <>
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            p={3}
            lineHeight={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <MDTypography variant="h5" fontWeight="medium">
                {title}
              </MDTypography>
            </Box>
            <MDButton variant="gradient" color="dark" onClick={handleOpen}>
              Añadir nuevo
            </MDButton>
          </MDBox>
          <Dialog open={open} onClose={handleClose} style={{ marginBottom: "8px" }}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              {modalInputs &&
                modalInputs.map((input, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12} sm={6}>
                      <p
                        key={index}
                        style={{ color: "black", marginBottom: "1px", opacity: "50%" }}
                      >
                        {input.label}
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {input.type === "dropdown" ? (
                        <Autocomplete
                          key={index + key++}
                          options={input.options}
                          onChange={async (event, newValue: any) => {
                            if (newValue) {
                              const id = await input.func(event, newValue);
                              handleInputChange(input.dbName, id.toString());
                            }
                          }}
                          renderInput={(params: any) => (
                            <FormField
                              key={index}
                              variant="outlined"
                              {...params}
                              label={input.label}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />
                      ) : (
                        <MDInput
                          margin="dense"
                          inputProps={{
                            style: { color: "black" },
                            value: formData[input.dbName] || "",
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                              handleInputChange(input.dbName, e.target.value),
                          }}
                          type={input.type || "text"}
                          fullWidth
                        />
                      )}
                    </Grid>
                  </Grid>
                ))}
            </DialogContent>
            <DialogActions>
              <MDButton onClick={handleClose} color="dark">
                Cancelar
              </MDButton>
              <MDButton
                variant="gradient"
                color="dark"
                onClick={() => {
                  if (onAdd) {
                    onAdd(formData);
                  }
                }}
              >
                Añadir
              </MDButton>
            </DialogActions>
          </Dialog>
          <MaterialReactTable table={table} />
        </Card>
      </MDBox>
    </>
  );
}

export default EditableDataTableNoLayout;
