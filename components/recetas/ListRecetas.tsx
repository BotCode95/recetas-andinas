import React, { useContext } from "react";
import { Grid, Divider, Fab, Tooltip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Receta as Recipe } from "../../interfaces/recetaInterface";
import { Aside, Search } from "../ui";
import { RecetaCard } from "./RecetaCard";
import { Receta } from "./Receta";
import { RecetasContext } from "../../context/recetas";
import { useModalReceta } from "../../hooks/useModalReceta";
import styles from "../../styles/Home.module.css";

export const ListRecetas = () => {
  const { recipes, messageSearch, recipesFilter } = useContext(RecetasContext);
  const { open, handleOpen, handleClose } = useModalReceta();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <Aside />
        </Grid>
        <Grid
          item
          xs={12}
          md={10}
          sx={{ paddingLeft: "56px !important", paddingRight: "8px" }}
        >
          <h2>Recetas de Cocina</h2>
          <Grid container sx={{ marginBotton: "24px" }}>
            <Search />
          </Grid>
          <Grid container spacing={2} className={styles.grid_titulo}>
            <Grid item xs={5} md={8}>
              Nombre de la comida
            </Grid>
            <Grid item xs={4} md={2}>
              Reseñas
            </Grid>
            <Grid item xs={3} md={2}>
              Cocinado antes
            </Grid>
          </Grid>
          <Divider />
          {recipesFilter.length > 0 ? (
            recipesFilter.map((receta: Recipe) => (
              <RecetaCard receta={receta} key={receta.id} />
            ))
          ) : messageSearch ? (
            <p className="mt-3">
              <strong>{messageSearch}</strong>
            </p>
          ) : (
            recipes.map((receta: Recipe) => (
              <RecetaCard receta={receta} key={receta.id} />
            ))
          )}
          {recipesFilter.length === 0 || messageSearch.length === 0 ? (
            <Grid container justifyContent="flex-end" className="px-4 mb-2">
              <Tooltip title="Añadir Receta" placement="left">
                <Fab color="primary" aria-label="add">
                  <AddIcon onClick={handleOpen} sx={{ fontSize: "40px" }} />
                </Fab>
              </Tooltip>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Receta open={open} handleClose={handleClose} />
    </>
  );
};
