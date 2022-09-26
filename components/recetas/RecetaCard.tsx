import { FC, useState, useContext } from 'react';
import {Grid} from "@mui/material";
import { Receta as Recipe } from "../../interfaces/recetaInterface";
import { StarGoldenOrEmpty, SwitchInput} from "../ui";
import { Receta } from "./";
import { useModalReceta } from "../../hooks/useModalReceta";
import { RecetasContext } from "../../context/recetas";
import { useUpdateState } from '../../hooks/useUpdateState';

interface Props {
  receta: Recipe;
}

export const RecetaCard: FC<Props> = ({ receta }) => {
  const starTotal = [0, 1, 2, 3];
  const { open, handleClose, handleOpen } = useModalReceta();
  const {active,handleChangeState}= useUpdateState({receta})
  
  return (
    <>
      <Grid container spacing={2} style={{ padding: "8px" }}>
        <Grid item xs={5} md={8}>
          <span
            style={{
              color: !active ? "#DEDEDE" : "#000",
              cursor: "pointer",
            }}
            onClick={handleOpen}
          >
            {receta.name}
          </span>
        </Grid>
        <Grid item xs={4} md={2}>
          {starTotal.map((star, index) => (
            <StarGoldenOrEmpty
              isGolden={receta.review > star ? true : false}
              key={index}
            />
          ))}
        </Grid>
        <Grid item xs={3} md={2}>
          <SwitchInput
            disabledSwitch={false}
            checked={active}
            onChange={handleChangeState}
          />
        </Grid>
      </Grid>
      <Receta receta={receta} open={open} handleClose={handleClose} />
    </>
  );
};
