import { RecetasState } from "./";
import { Receta } from "../../interfaces/recetaInterface";

type RecipesActionType =
  | { type: "GetRecipes"; payload: Receta[] }
  | { type: "AddRecipe"; payload: Receta }
  // | { type: "RecipeUpdate"; payload: Receta }
  | { type: "ErrorMessage"; payload: string }
  | { type: "GetRecipesByFilter"; payload: {search: string, isActive: boolean | null }}

  const searchRecipes = (recipe: Receta, search: string, isActive: boolean | null): Receta | undefined => {
    if(isActive !== null){
      if((recipe.active === isActive) && recipe.name.toLowerCase().includes(search.toLowerCase())){
        return recipe
      }
    }else{
      if(recipe.name.toLowerCase().includes(search.toLowerCase())){
        return recipe
      }
    }
  }
export const RecetasReducer = (state: RecetasState,action: RecipesActionType): RecetasState => {

  switch (action.type) {
    case "GetRecipes":
      return {
        ...state,
        recipes: action.payload,
      };
    case "AddRecipe":{
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };}
    case "GetRecipesByFilter": 
      return {
        ...state,
        recipesFilter: (action.payload.search.length !== 0) 
          ? state.recipes.filter((recipe) => (searchRecipes(recipe,action.payload.search,action.payload.isActive))) 
          : state.recipes.filter((recipe) => recipe.active === action.payload.isActive),
        messageSearch: (action.payload.search !== '') ? ("La búsqueda no arrojo resultados"): ''
      }
    
    case "ErrorMessage":
      return {
        ...state,
        messageError: action.payload,
      };
    default:
      return state;
  }
};



