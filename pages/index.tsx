import { useState, useContext, useEffect } from 'react';
import type { GetStaticProps, NextPage } from "next";
import { Grid, Divider, Fab, Tooltip, Radio, FormControl, Select, MenuItem} from "@mui/material";
import {Add as AddIcon} from '@mui/icons-material'
import { Layout } from "../components/layouts";
import { Aside } from "../components/ui";
import { recetas } from "../data/data";
import { Receta } from "../interfaces/recetaInterface";
import { RecetaCard } from "../components/recetas/RecetaCard";
import { SearchInput } from "../components/ui/SearchInput/SearchInput";
import { NuevaReceta } from '../components/recetas/NuevaReceta';
import styles from '../styles/Home.module.css'
import { RecetasContext } from '../context/recetas';
interface Props {
  recetasList: Receta[];
}

const Home: NextPage<Props> = ({ recetasList }: Props) => {
  
  const [open, setOpen] = useState<boolean>(false);
  const [cocinadoAntes, setCocinadoAntes] = useState<string>("todos")
  const {recipes, messageSearch, recipesFilter, getRecipes, getRecipesByFilter}= useContext(RecetasContext)
  useEffect(() => {
      getRecipes(recetasList)  
    if(recipes.length > 0){
      getRecipes(recipes)  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes])

  useEffect(() => {
    const typeCocinadoAntes= isActive()
      getRecipesByFilter("", typeCocinadoAntes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cocinadoAntes])

  const isActive= () : boolean |null => {
    switch (cocinadoAntes) {
      case 'activos':
        return true
      case 'inactivos':
        return false
      default:
        return null
    }
  }
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <Aside />
        </Grid>
        <Grid item xs={12} md={10} sx={{ paddingLeft: "56px !important" }}>
          <h2>Recetas de Cocina</h2>
          <Grid container sx={{marginBotton: '24px'}}>
            <SearchInput filtro={isActive()}/>
            <Grid item md={3} style={{display:'flex', justifyContent: 'center',alignItems:'center',borderRadius: '16px', backgroundColor: '#EBF0F3', height:'48px', margin:'32px 24px 0 0'}}>
              <Grid item xs={3} md={5}>
                <span className="px-2"> Cocido antes: </span>
              </Grid>  
              <Grid item xs={3} md={7}>  
                <FormControl sx={{border:'none'}}>
                <Select
                variant='standard'
                  labelId="select-cocinadoAntes"
                  id="select-cocinadoAntes"
                  defaultValue={"todos"}
                  value={cocinadoAntes}
                  onChange={(e) => setCocinadoAntes(e.target.value)}
                >
                  <MenuItem value={"todos"}><strong>Todos</strong></MenuItem>
                  <MenuItem value={"activos"}><strong>Activos</strong></MenuItem>
                  <MenuItem value={"inactivos"}><strong>Inactivos</strong></MenuItem>
                </Select>
              </FormControl>
              </Grid>  
            </Grid>
          </Grid>
          <Grid container spacing={2} className={styles.grid_titulo}>
            <Grid item xs={6} md={8}>
              Nombre de la comida
            </Grid>
            <Grid item xs={3} md={2}>
              Reseñas
            </Grid>
            <Grid item xs={3} md={2}>
              Cocinado antes
            </Grid>
          </Grid>
          <Divider/>
          {recipesFilter.length > 0 ? 
            recipesFilter.map((receta: Receta) => (
              <RecetaCard receta={receta}  key={receta.id}/>
            )) : (messageSearch) ?
            <p className="mt-3"><strong>{messageSearch}</strong></p> :  
            recipes.map((receta: Receta) => (
              <RecetaCard receta={receta}  key={receta.id}/>
            ))
          } 
          {recipesFilter.length === 0 || messageSearch.length === 0 ? 
            (<Grid container justifyContent="flex-end" sx={{paddingX:'40px'}}>
              <Tooltip title="Añadir Receta" placement="left">
                <Fab color="primary" aria-label="add">
                  <AddIcon onClick={handleOpen} sx={{fontSize:'40px'}}/>
                </Fab>
              </Tooltip>
            </Grid>
            ) : null} 
        </Grid>
      </Grid>
      <NuevaReceta open={open} handleClose={handleClose}/>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      recetasList: recetas,
    },
  };
};

export default Home;


