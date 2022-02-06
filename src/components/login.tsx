import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth0 } from '@auth0/auth0-react'
import { Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import IMGB from './../img/sing.svg'

const LoginButton = styled(Button)({
  fontSize: '2.3rem',
  display: 'flex',
  justifySelf: 'center',
  margin: '200px auto',
  background: 'rgb(168, 153, 50)',
})

const MYTypography = styled(Typography)({
  color: 'orange',
  fontFamily: 'fantasy',
  marginTop: '100px',
})

export default function Login() {
  const navigate = useNavigate()
  // const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    //isAuthenticated&&
    <Stack
      sx={{
        backgroundImage: `url('${IMGB}')`,
        width: '100%',
        height: '103vh',
        margin: '-9px',
      }}
    >
      <MYTypography align="center" variant="h1">
        #PLAYER
      </MYTypography>
      <LoginButton
        variant="contained"
        onClick={() => {
          //loginWithRedirect
          navigate('player')
        }}
      >
        Sing In/ UP
      </LoginButton>
    </Stack>
  )
}
