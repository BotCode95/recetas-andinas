import { useContext, useEffect, useState } from 'react'
import { RecetasContext } from '../context/recetas'

export const useSelectCocinadoAntes = () => {
    const [cocinadoAntes, setCocinadoAntes] = useState<string>("todos")
    const { getRecipesByFilter}= useContext(RecetasContext)
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
  return {
    cocinadoAntes,
    setCocinadoAntes,
    isActive
  }
}
