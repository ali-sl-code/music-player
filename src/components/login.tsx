
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import { Style } from '@mui/icons-material'
import { height, styled } from '@mui/system';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import IMGB from './img/AdobeStock_121177062.svg'
function Login(){

const LoginButton = styled(Button)({
  fontSize: '2.3rem',
  display:'flex',
  justifySelf:'center',
  margin:'200px auto',
  background:'rgb(168, 153, 50)'

})

const MYTypography = styled(Typography)({
  color:'orange',
  fontFamily: 'fantasy',
  marginTop:'100px'
  

})



    const { loginWithRedirect,isAuthenticated } = useAuth0()
    return (
      
      !isAuthenticated && (
        <Stack sx={{backgroundImage:`url('${ IMGB}')` ,width:'100%',height:'103vh',margin:'-9px'}} >
          <MYTypography align='center' variant='h1'>#PLAYER</MYTypography>
        <LoginButton variant="contained" onClick={()=>loginWithRedirect()}>
Sing In/ UP
        </LoginButton></Stack>
        )
     
    )
}

export default Login