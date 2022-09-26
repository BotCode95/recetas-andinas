
import { createContext } from 'react';
import {Receta}  from '../../interfaces/recetaInterface';

interface ContextProps {
   recipes: Receta[],
   recipesFilter: Receta[],
   messageError: string,
   loading: boolean,
   messageSearch: string,
   getRecipes: (recipes: Receta[]) => void
   addNewRecipe: (recipe: Receta) => void 
   getRecipesByFilter: (search: string, isActive: boolean |null) => void 
   recipeUpdateState : (id: number, state: boolean) => void
}

export const RecetasContext = createContext({} as ContextProps);