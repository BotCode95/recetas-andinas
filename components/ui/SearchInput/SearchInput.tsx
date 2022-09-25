import { useState, useEffect, useContext } from 'react';
import { Grid } from "@mui/material";
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import {Search as SearchIcon,SearchOff as SearchOffIcon,} from "@mui/icons-material";

import styled from '../../../styles/UI.module.css'
import { RecetasContext } from '../../../context/recetas/RecetasContext';

interface Props{
  filtro?: boolean | null
}


export const SearchInput = ({filtro = null}: Props  ) => {
  const [textValue, setTextValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedValue = useDebouncedValue({textValue});
  const [isPrimerCarga, setPrimerCarga] = useState(true);
  const {getRecipesByFilter} = useContext(RecetasContext)
  useEffect(() => {
    if (!isPrimerCarga) {
      setIsLoading(true);
      console.log(debouncedValue)
      console.log(filtro)
      getRecipesByFilter(debouncedValue, filtro)
    }
    setPrimerCarga(false);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const cleanSearch = () => {
    setTextValue("");
  };
  return (
    <Grid item xs={9} md={4} className={styled.form_busqueda}>
        <SearchIcon sx={{ color: "#1E3646", fontSize: 30, marginX: 2 }} />
        <input
          type="text"
          className={styled.input_busqueda}
          placeholder="Buscador"
          name="textValue"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
          {debouncedValue.length !== 0 ? (
            <button className="btn" type="button" onClick={cleanSearch}>
              <SearchOffIcon sx={{ color: "red", fontSize: 35 }} />
            </button>
          ) : null}
    </Grid>
  )
}
