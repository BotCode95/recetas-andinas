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
import { Receta} from "../../interfaces/recetaInterface";
import { SwitchInput } from "../../components/ui/SwitchInput/SwitchInput";
import { RecetasContext } from "../../context/recetas";
import { useForm } from "../../hooks/useForm";
import styles from "../../styles/Home.module.css";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const NuevaReceta = ({ open, handleClose }: Props) => {
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [required, setRequired] = useState({
    name: "",
    ingredients: "",
    preparation: "",
  });
  const { form, setForm, onChange } = useForm<Receta>({
    id:parseInt(uuidv4()),
    name: "",
    ingredients: [
      { id: 1, description: "" },
      { id: 2, description: "" },
    ],
    review: 0,
    preparation: "",
    active: true,
  });

  const { addNewRecipe } = useContext(RecetasContext);

  const { id, name, ingredients, review, preparation, active } = form;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt(e.target.value));
    setForm({ ...form, review: parseInt(e.target.value) });
  };

  const addNewIngredient = (id: number) => {
    let newIngredient = { id: id + 1, description: "" };
    setForm({
      ...form,
      ingredients: [...ingredients, newIngredient],
    });
  };

  const deleteIngredient = (id: number) => {
    setForm({
      ...form,
      ingredients: ingredients.filter((ingredient) => ingredient.id !== id),
    });
  };

  const onChangeIngredient = (e: ChangeEvent<HTMLInputElement>, id : number) => {
    const ingredientes = ingredients.map(ingredient => {
      if(ingredient.id === id){
        return {
          id,
          description: e.target.value
        }
      }
      return ingredient
    })
    setForm({
      ...form,
      ingredients:ingredientes
    })
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (name === "") {
      setRequired({ ...required, name: "* Requerido" });
      return;
    }
    if (preparation === "") {
      setRequired({ ...required, preparation: "* Requerido" });
      return;
    }
    if (ingredients.length < 2) {
      setRequired({
        ...required,
        preparation: "* Requerido - escriba al menos un ingredientes",
      });
      return;
    }
    const recipe: Receta = {
      id,
      name,
      ingredients,
      preparation,
      review,
      active,
    };
    addNewRecipe(recipe);
    handleClose()
    setForm(
      {
        id: parseInt(uuidv4()),
        name: "",
        ingredients: [
          { id: 1, description: "" },
          { id: 2, description: "" },
        ],
        review: 0,
        preparation: "",
        active: true
      })
  };
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
          Nueva Receta
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid
            container
            sx={{ mt: 2, paddingX: "12px" }}
            id="modal-modal-description"
          >
            <Grid item xs={12} md={12}>
              <p>
                <strong>Nombre de la receta</strong>
              </p>
              <FormControl variant="filled" fullWidth>
                <TextField
                  id="name"
                  label={"Titulo*"}
                  name="name"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value, "name")}
                  placeholder="P.ej. Olla caliente de carne y arroz en la olla de cocción lenta"
                  multiline
                />
              </FormControl>
              {required.name.length > 0 ? (
                <p style={{ color: "red" }}>{required.name}</p>
              ) : null}
            </Grid>
            <Grid item xs={12} md={12} className="mt-5">
              <p>
                <strong>Ingredientes</strong>
              </p>
              {ingredients?.map((ingredient, index) => (
                <Grid container className="mt-2 px-5" key={ingredient.id} alignContent={"center"}>
                  <Grid item md={2}>{index + 1}</Grid>
                  <Grid item md={7}>
                    <TextField
                      id="ingredient"
                      label="Tipo de Ingrediente"
                      variant="outlined"
                      placeholder="Tipo de Ingrediente"
                      name={ingredient.description}
                      value={ingredient.description}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeIngredient(e, ingredient.id)}
                    />
                  </Grid>
                  <Grid item md={3} className="d-flex px-2 mt-2">
                    {ingredient.id === ingredients.length ? (

                      <AddCircleOutlineIcon
                        onClick={() => addNewIngredient(ingredient.id)}
                        style={{color: '#8DC63F'}}
                        fontSize={'large'}
                        sx={{cursor: 'pointer'}}
                        
                        />
                    ) : (
                      <DeleteForeverIcon
                        onClick={() => deleteIngredient(ingredient.id)}
                        style={{color: '#F7941D'}}
                        fontSize={'large'}
                        sx={{cursor: 'pointer'}}
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
              {required.ingredients.length > 0 ? (
                <p style={{ color: "red" }}>{required.ingredients}</p>
              ) : null}
              <p>
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
                <p style={{ color: "red" }}>{required.preparation}</p>
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
              <Button type="submit" color="primary" variant="contained" sx={{borderRadius: '25px'}}>
                Crear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
