import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  Receta as Recipe,
  Ingredients,
} from "../../interfaces/recetaInterface";
import { SwitchInput, StarGoldenOrEmpty, FormMessage} from "../../components/ui";
import { useRecipeId } from "../../hooks/useRecipeId";
import styles from "../../styles/Home.module.css";

interface Props {
  receta: Recipe;
  open: boolean;
  handleClose: () => void;
  starTotal?: number[];
}

export const RecetaId = ({
  receta,
  open,
  handleClose,
  starTotal = [0, 1, 2, 3],
}: Props) => {
  const { messageUpdate, onSubmit } = useRecipeId();
  return receta ? (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modal} sx={{ mt: 2, paddingX: "12px" }}>
        <Grid container sx={{ mt: 2, paddingX: 2 }}>
          <Grid item xs={11}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {receta.name}
            </Typography>
          </Grid>
          <Grid item xs={1} justifyContent={"flex-end"} alignItems={"flex-end"}>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Grid>
        </Grid>

        <form onSubmit={onSubmit}>
          <Grid
            container
            sx={{ mt: 2, paddingX: "12px" }}
            id="modal-modal-description"
          >
            <Grid item xs={12} md={12} className="mt-2">
              <p>
                <strong>Ingredientes</strong>
              </p>
              {receta.ingredients?.map((ingredient: Ingredients) => (
                <Grid container className="mt-2" key={ingredient.id}>
                  <ul>
                    <li>{ingredient.description} </li>
                  </ul>
                </Grid>
              ))}
            </Grid>
            <Grid container xs={12}>
              <p>
                <strong>Preparación</strong>
              </p>
              <p>{receta.preparation}</p>
            </Grid>
            <p className="mt-2">
              <strong>Reseña</strong>
            </p>
            <Grid container>
              {starTotal.map((star, index) => (
                <StarGoldenOrEmpty
                  isGolden={receta.review > star ? true : false}
                  key={index}
                />
              ))}
            </Grid>
            <p className="mt-2">
              <strong>Cocinado antes</strong>
            </p>
            <Grid container sx={{ mt: 2, paddingX: 2 }}>
              <SwitchInput disabledSwitch={true} checked={receta.active} />
            </Grid>
            <Grid container justifyContent={"flex-end"} sx={{ p: 2 }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ borderRadius: "25px", width: " 110px", height: "48px" }}
              >
                Editar
              </Button>
            </Grid>
          </Grid>
        </form>
        {messageUpdate ? <FormMessage required={messageUpdate} /> : null}
      </Box>
    </Modal>
  ) : null;
};
