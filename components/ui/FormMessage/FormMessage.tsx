import React from 'react'

interface Props {
    required: string
}
export const FormMessage = ({required}: Props) => {
  return (
    <p style={{ color: "red" }}>{required}</p>
  )
}
