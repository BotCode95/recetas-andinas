import { FC, useEffect, useReducer } from 'react';
import { RecetasContext,RecetasReducer } from './';
import { Receta } from '../../interfaces/recetaInterface';
export interface RecetasState {
   recipes: Receta[];
   recipesFilter: Receta[];
   messageError: string;
   messageSearch: string;
   loading: boolean
}

interface Props {
    children: React.ReactNode
}


const RECIPES_INITIAL_STATE : RecetasState = {
    recipes: [],
    recipesFilter: [],
    messageError: '',
    messageSearch: '',
    loading: true
}

export const RecetasProvider: FC<Props> = ({children}) => {

  const [state, dispatch] = useReducer(RecetasReducer, RECIPES_INITIAL_STATE)


  const getRecipes = (recipes: Receta[]) => {
    try {
      dispatch({
        type: 'GetRecipes',
        payload: recipes
      })
    } catch (error:any) {
      dispatch({
        type: 'ErrorMessage',
        payload: error.message.toString()
      })
    }

  }
  const addNewRecipe = (newRecipe: Receta) => {
    dispatch({type: 'AddRecipe', payload: newRecipe})
  }

  const getRecipesByFilter = (search: string, isActive: boolean |null) => {
    dispatch({
      type: 'GetRecipesByFilter',
      payload: {search : search, isActive: isActive}

    })
  }
  
  return (
    <RecetasContext.Provider value={{
        recipes: state.recipes,
        recipesFilter: state.recipesFilter,
        messageError: state.messageError,
        loading: state.loading,
        messageSearch: state.messageSearch,
        getRecipes,
        addNewRecipe,
        getRecipesByFilter
    }}>
       {children}
    </RecetasContext.Provider>
  )
}