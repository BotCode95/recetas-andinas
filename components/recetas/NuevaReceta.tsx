import { ChangeEvent } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  TextField,
  FormControl,
  Radio,
} from "@mui/material";
import {
  DeleteForever as DeleteForeverIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { FormMessage, SwitchInput } from "../ui";
import { useNewRecipe } from "../../hooks/useNewRecipe";
import styles from "../../styles/Home.module.css";

interface Props {
  open: boolean;
  handleClose: () => void;
  starTotal?: number[];
}

export const NuevaReceta = ({ open, handleClose }: Props) => {
  const {
    form,
    required,
    selectedValue,
    addNewIngredient,
    deleteIngredient,
    handleChange,
    onChange,
    onChangeIngredient,
    onSubmit,
    setForm,
  } = useNewRecipe({ handleClose });

  const { name, ingredients, review, preparation, active } = form;

  return (
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
              Nueva Receta
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
            <Grid item xs={12} md={12}>
              <strong>Nombre de la receta</strong>
              <FormControl variant="filled" fullWidth>
                <TextField
                  id="name"
                  label={"Titulo*"}
                  name="name"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.value, "name")
                  }
                  placeholder="P.ej. Olla caliente de carne y arroz en la olla de cocción lenta"
                  multiline
                />
              </FormControl>
              {required.name.length > 0 ? (
                <FormMessage required={required.name} />
              ) : null}
            </Grid>
            <Grid item xs={12} md={12} className="mt-5">
              <p>
                <strong>Ingredientes</strong>
              </p>
              {ingredients?.map((ingredient, index) => (
                <Grid
                  container
                  className="mt-2 px-3"
                  key={ingredient.id}
                  alignContent={"center"}
                >
                  <Grid item xs={1} md={1} className="d-flex align-items-center">
                    {index + 1}
                  </Grid>
                  <Grid item xs={9} md={9}>
                    <TextField
                      id="ingredient"
                      label="Tipo de Ingrediente"
                      variant="outlined"
                      placeholder="Tipo de Ingrediente"
                      name={ingredient.description}
                      value={ingredient.description}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChangeIngredient(e, ingredient.id)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2} md={2} className="d-flex px-2 mt-2">
                    {index + 1 === ingredients.length ? (
                      <AddCircleOutlineIcon
                        onClick={() => addNewIngredient(ingredient.id)}
                        style={{ color: "#8DC63F" }}
                        fontSize={"large"}
                        sx={{ cursor: "pointer" }}
                      />
                    ) : (
                      <DeleteForeverIcon
                        onClick={() => deleteIngredient(ingredient.id)}
                        style={{ color: "#F7941D" }}
                        fontSize={"large"}
                        sx={{ cursor: "pointer" }}
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
              {required.ingredients.length > 0 ? (
                <FormMessage required={required.ingredients} />
              ) : null}
              <p className="mt-2">
                <strong>Preparación</strong>
              </p>
              <FormControl variant="filled" fullWidth>
                <TextField
                  id="outlined-textarea"
                  label="Instrucciones*"
                  placeholder="Escribe los pasos..."
                  multiline
                  rows={5}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.value, "preparation")
                  }
                  value={preparation}
                />
              </FormControl>
              {required.preparation.length > 0 ? (
                <FormMessage required={required.preparation} />
              ) : null}
            </Grid>
            <p className="mt-2">
              <strong>Reseñas</strong>
            </p>
            <Grid container>
              <Grid item md={3}>
                <Radio
                  checked={selectedValue === 1}
                  onChange={handleChange}
                  value={1}
                  name="radio-buttons"
                  inputProps={{ "aria-label": "1" }}
                />
                <span>1</span>
              </Grid>
              <Grid item md={3}>
                <Radio
                  checked={selectedValue === 2}
                  onChange={handleChange}
                  value={2}
                  name="radio-buttons"
                  inputProps={{ "aria-label": "2" }}
                />
                <span>2</span>
              </Grid>
              <Grid item md={3}>
                <Radio
                  checked={selectedValue === 3}
                  onChange={handleChange}
                  value={3}
                  name="radio-buttons"
                  inputProps={{ "aria-label": "3" }}
                />
                <span>3</span>
              </Grid>
              <Grid item md={3}>
                <Radio
                  checked={selectedValue === 4}
                  onChange={handleChange}
                  value={4}
                  name="radio-buttons"
                  inputProps={{ "aria-label": "4" }}
                />
                <span>4</span>
              </Grid>
            </Grid>
            <p className="mt-2">
              <strong>Cocinado antes</strong>
            </p>
            <Grid container sx={{ mt: 2, paddingX: 2 }}>
              <SwitchInput
                disabledSwitch={false}
                checked={active}
                onChange={() => setForm({ ...form, active: !active })}
              />
            </Grid>
            <Grid container justifyContent={"flex-end"} sx={{ p: 2 }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ borderRadius: "25px", width: " 110px", height: "48px" }}
              >
                Crear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
