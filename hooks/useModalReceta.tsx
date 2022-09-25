import { useState } from 'react'

export const useModalReceta = () => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return {
    open,
    handleOpen,
    handleClose
  }
}
