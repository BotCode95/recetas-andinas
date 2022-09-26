import {useContext, useEffect } from 'react';
import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layouts";
import { recetas } from "../data/data";
import { Receta as Recipe} from "../interfaces/recetaInterface";
import { RecetasContext } from '../context/recetas';
import { ListRecetas } from '../components/recetas';
interface Props {
  recetasList: Recipe[];
}

const Home: NextPage<Props> = ({ recetasList }: Props) => {
  
  const {recipes, getRecipes}= useContext(RecetasContext)
  useEffect(() => {
      getRecipes(recetasList)  
    if(recipes.length > 0){
      getRecipes(recipes)  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes])
  return (
    <Layout>
      <ListRecetas/>
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


