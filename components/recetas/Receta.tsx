import { ChangeEvent, useState, SyntheticEvent, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  TextField,
  FormControl,
  Radio,
  IconButton,
} from "@mui/material";
import {
  DeleteForever as DeleteForeverIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Scale,
} from "@mui/icons-material";
import {v4 as uuidv4} from 'uuid'
import { Receta as Recipe, Ingredients } from '../../interfaces/recetaInterface';
import { SwitchInput } from "../../components/ui/SwitchInput/SwitchInput";
import { RecetasContext } from "../../context/recetas";
import { useForm } from "../../hooks/useForm";
import styles from "../../styles/Home.module.css";

interface Props {
    receta: Recipe
  open: boolean;
  handleClose: () => void;
}

export const Receta = ({ receta, open, handleClose }: Props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modal} sx={{ mt: 2, paddingX: "12px" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mt: 2, paddingX: 2 }}
        >
          Receta
        </Typography>
        <form>
          <Grid
            container
            sx={{ mt: 2, paddingX: "12px" }}
            id="modal-modal-description"
          >
            <Grid item xs={12} md={12}>
              <p>
                <strong>Nombre de la receta</strong>
              </p>
              <span>{receta.name}</span>
            </Grid>
            <Grid item xs={12} md={12} className="mt-5">
              <p>
                <strong>Ingredientes</strong>
              </p>
              {receta.ingredients?.map((ingredient: Ingredients, index: number) => (
                <Grid container className="mt-2 px-5" key={ingredient.id} alignContent={"center"}>
                  <Grid item md={2} className="d-flex align-items-center">{ingredient.id}</Grid>
                  <Grid item md={7}>
                    <span>{ingredient.description}</span>
                  </Grid>
                  </Grid> 
                ))}
            </Grid>
            <Grid container xs={12}>
                <p><strong>Preparación</strong></p>
                <p>{receta.preparation}</p>
            </Grid>      
            <p className="mt-2">
              <strong>Reseña</strong>
            </p>
            <Grid container>
                {receta.review}
            </Grid>
            <p className="mt-2">
              <strong>Cocinado antes</strong>
            </p>
            <Grid container sx={{ mt: 2, paddingX: 2 }}>
              <SwitchInput
                disabledSwitch={true}
                checked={receta.active}
              />
            </Grid>
            <Grid container justifyContent={"flex-end"} sx={{ p: 2 }}>
              <Button type="submit"  color="primary" variant="contained" sx={{borderRadius: '25px'}}>
                Editar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
