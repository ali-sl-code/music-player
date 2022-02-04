import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useAuth0 } from '@auth0/auth0-react'
function Logout() {
  const LoginButton = styled(Button)({
    fontSize: '1.3rem',
    display: 'flex',
    justifySelf: 'center',
    margin: '20px auto',
    background: 'rgb(115, 50, 168)',
    color: 'rgb(176, 113, 30)',
  })

  const { logout, isAuthenticated } = useAuth0()
  return (
    isAuthenticated && (
      <LoginButton onClick={() => logout()}>LOG OUT</LoginButton>
    )
  )
}

export default Logout
