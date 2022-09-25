import {
  ChangeEvent,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import { RecetasContext } from "../context/recetas";
import { Receta } from "../interfaces/recetaInterface";
import { useForm } from "./useForm";
import { v4 as uuidv4 } from "uuid";

interface Props {
  handleClose: () => void;
}
export const useNewRecipe = ({ handleClose }: Props) => {
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [required, setRequired] = useState({
    name: "",
    ingredients: "",
    preparation: "",
  });
  const { form, setForm, onChange } = useForm<Receta>({
    id: parseInt(uuidv4()),
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
    if (ingredients.length === 1) {
      setRequired({
        ...required,
        ingredients: "La receta debe contener al menos un ingrediente",
      });
      return;
    }
    setForm({
      ...form,
      ingredients: ingredients.filter((ingredient) => ingredient.id !== id),
    });
  };

  const onChangeIngredient = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const ingredientes = ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return {
          id,
          description: e.target.value,
        };
      }
      return ingredient;
    });
    setForm({
      ...form,
      ingredients: ingredientes,
    });
  };

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
    handleClose();
    setForm({
      id: parseInt(uuidv4()),
      name: "",
      ingredients: [
        { id: 1, description: "" },
        { id: 2, description: "" },
      ],
      review: 0,
      preparation: "",
      active: true,
    });
  };
  return {
    form,
    onChange,
    onSubmit,
    onChangeIngredient,
    handleChange,
    addNewIngredient,
    deleteIngredient,
    required,
    selectedValue,
    setForm,
  };
};
