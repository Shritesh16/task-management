
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent:"center" , alignItems:"center" , height:"49vh", marginLeft : "80%"}}>
      <CircularProgress />
      <Box sx={{ml:2}}>...Loading</Box>
    </Box>
  );
}