import { FC } from 'react'

interface Props {
    required: string
}
export const FormMessage: FC<Props> = ({required}: Props) => {
  return (
    <p style={{ color: "red" }}>{required}</p>
  )
}
