import { createTheme } from "@mui/material";
import {common,red} from "@mui/material/colors";

export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: common.white
      },
      primary: {
        main: '#0C969D'
      },
      secondary: {
        main: '#FFD19A'
      },
      error:{
        main: red.A400
      }
    },
    typography :{
      fontFamily: "Poppins"
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          elevation : 0
        }
      }
    }
  });