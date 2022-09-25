import React from 'react'
import { useSelectCocinadoAntes } from '../../../hooks/useSelectCocinadoAntes'
import { SearchInput,SelectCocinadoAntes } from '../index'

export const Search = () => {
    const {isActive}= useSelectCocinadoAntes()
  return (
    <>
        <SearchInput filtro={isActive()}/>
        <SelectCocinadoAntes/>
    </>
  )
}
