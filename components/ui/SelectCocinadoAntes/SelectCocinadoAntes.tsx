import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import { useSelectCocinadoAntes } from "../../../hooks/useSelectCocinadoAntes";

export const SelectCocinadoAntes = () => {
  const { cocinadoAntes, setCocinadoAntes } = useSelectCocinadoAntes();
  return (
    <Grid
      item
      xs={12}
      md={3}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "16px",
        backgroundColor: "#EBF0F3",
        height: "48px",
        margin: "32px 24px 0 0",
      }}
    >
      <Grid item xs={5} md={5}>
        <span className="px-2"> Cocido antes: </span>
      </Grid>
      <Grid item xs={7} md={7}>
        <FormControl sx={{ border: "none" }}>
          <Select
            variant="standard"
            labelId="select-cocinadoAntes"
            id="select-cocinadoAntes"
            defaultValue={"todos"}
            value={cocinadoAntes}
            onChange={(e) => setCocinadoAntes(e.target.value)}
          >
            <MenuItem value={"todos"}>
              <strong>Todos</strong>
            </MenuItem>
            <MenuItem value={"activos"}>
              <strong>Activos</strong>
            </MenuItem>
            <MenuItem value={"inactivos"}>
              <strong>Inactivos</strong>
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
