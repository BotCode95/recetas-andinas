import { Grid } from "@mui/material";
import {
  Search as SearchIcon,
  SearchOff as SearchOffIcon,
} from "@mui/icons-material";
import { useSearch } from '../../../../hooks/useSearch';
import styled from "../../../../styles/UI.module.css";

interface Props {
  filtro?: boolean | null;
}

export const SearchInput = ({ filtro = null }: Props) => {

  const {textValue,debouncedValue,cleanSearch,setTextValue} = useSearch({filtro})
  return (
    <Grid item xs={11} md={4} className={styled.form_busqueda}>
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
  );
};
