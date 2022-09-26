import React, { useState, useContext, useEffect } from 'react'
import { RecetasContext } from '../context/recetas';
import { useDebouncedValue } from './useDebouncedValue';

interface Props {
    filtro? : boolean | null;
}
export const useSearch = ({filtro = null} : Props) => {
    const [textValue, setTextValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const debouncedValue = useDebouncedValue({ textValue });
    const [isPrimerCarga, setPrimerCarga] = useState(true);
    const { getRecipesByFilter } = useContext(RecetasContext);
    useEffect(() => {
      if (!isPrimerCarga) {
        setIsLoading(true);
        getRecipesByFilter(debouncedValue, filtro);
      }
      setPrimerCarga(false);
      setIsLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);
  
    const cleanSearch = () => {
      setTextValue("");
    };
  return {
    textValue,
    setTextValue,
    debouncedValue,
    cleanSearch
  }
}
