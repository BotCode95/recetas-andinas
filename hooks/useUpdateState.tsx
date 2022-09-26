import { useContext, useState } from "react";
import { RecetasContext } from "../context/recetas";
import { Receta } from "../interfaces/recetaInterface";

interface Props {
    receta: Receta
}

export const useUpdateState = ({receta} : Props) => {
    const [active, setActive] = useState<boolean>(receta.active);
    const {recipeUpdateState} = useContext(RecetasContext)
    
  const handleChangeState = () => {
    recipeUpdateState(receta.id, !active)
    setActive(!active)
  }
  return {
    active,
    handleChangeState
  }
}
