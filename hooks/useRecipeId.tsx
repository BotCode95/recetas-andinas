import React, { SyntheticEvent, useState } from 'react'

export const useRecipeId = () => {
    
    const [messageUpdate, setMessageUpdate] = useState<string>("")

    const onSubmit = (e: SyntheticEvent) => {
      e.preventDefault()

      setMessageUpdate("Proximamente podrás actualizar las recetas")
    }
  return {
    messageUpdate,
    onSubmit
  }
}
