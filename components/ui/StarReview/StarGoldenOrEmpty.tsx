import {Star as StarIcon, StarBorder as StarBorderIcon} from '@mui/icons-material';

interface Props {
   isGolden: boolean
  }
export const StarGoldenOrEmpty = ({isGolden}: Props) => {
    return (
      isGolden ? 
        <StarIcon color="secondary"/> : 
        <StarBorderIcon style={{color:'#E9DBCB'}}/>
    )
  }
