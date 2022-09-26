import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import { useSelectCocinadoAntes } from "../../../../hooks/useSelectCocinadoAntes";

export const SelectCocinadoAntes = () => {
  const { cocinadoAntes, setCocinadoAntes } = useSelectCocinadoAntes();

  const opciones = [
    { name: "todos", value: "Todos" },
    { name: "activos", value: "Activos" },
    { name: "inactivos", value: "Inactivos" },
  ];
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
      <Grid item xs={5} md={6}>
        <span className="px-3"> Cocido antes: </span>
      </Grid>
      <Grid item xs={7} md={6}>
        <FormControl sx={{ border: "none" }}>
          <Select
            variant="standard"
            labelId="select-cocinadoAntes"
            id="select-cocinadoAntes"
            defaultValue={"todos"}
            value={cocinadoAntes}
            onChange={(e) => setCocinadoAntes(e.target.value)}
          >
            {opciones.map((item, index) => (
              <MenuItem value={item.name} key={index} sx={{ width: "100%" }}>
                <strong>{item.value}</strong>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
