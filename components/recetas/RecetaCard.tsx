import { FormControlLabel, FormGroup, Grid, styled, Switch, SwitchProps, Divider} from "@mui/material";
import { FC } from "react";
import {Receta as Recipe} from '../../interfaces/recetaInterface'
import { StarGoldenOrEmpty } from '../ui'
import { Receta } from "./Receta";
import { useModalReceta } from '../../hooks/useModalReceta';

interface Props {
    receta: Recipe
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


export const RecetaCard: FC<Props>= ({receta}) => {
  const starTotal = [0,1,2,3];
  const {open, handleClose, handleOpen} = useModalReceta()

  return (
    <>
    <Grid container spacing={2} style={{padding: '8px'}}>
    <Grid item xs={5} md={8} >
      <span  style={({ color: !receta.active ? "#DEDEDE" : "#000", cursor: 'pointer'})} onClick={handleOpen}>{receta.name}</span>
    </Grid>
    <Grid item xs={4} md={2}>
      {starTotal.map((star, index)=> (
        <StarGoldenOrEmpty isGolden={receta.review > star ? true : false} key={index}/>
      ))}
    </Grid>
    <Grid item xs={3} md={2}>
      {receta.active ? (<FormGroup>
        <FormControlLabel
          control={<IOSSwitch defaultChecked disabled />}
          label=""
        />
      </FormGroup>) : (<FormGroup>
        <FormControlLabel
          control={<IOSSwitch checked={false} disabled/>}
          label=""
        />
      </FormGroup>)}
    </Grid>
  </Grid>
  <Receta receta={receta} open={open} handleClose={handleClose}/>
  </>
  )
}
