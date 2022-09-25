
import { Receta as Recipe } from '../../interfaces/recetaInterface';
import { NuevaReceta } from "./NuevaReceta";
import { RecetaId } from "./RecetaId";

interface Props {
  receta?: Recipe
  open: boolean;
  handleClose: () => void;
}

export const Receta = ({ receta, open, handleClose }: Props) => {

  const starTotal = [0,1,2,3];
  return (
    (receta) 
    ? <RecetaId receta={receta} open={open} handleClose={handleClose} starTotal={starTotal}/>
    : <NuevaReceta open={open} handleClose={handleClose} starTotal={starTotal}/>
  );
};
