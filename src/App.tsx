import Application from 'components/app'
import Login from 'components/login'
import { Route, Routes } from 'react-router-dom'
// import { useAuth0 } from '@auth0/auth0-react'

function App() {
  // const { isLoading } = useAuth0()
  // if (isLoading) return <div>Loading....</div>
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="player" element={<Application/>} />
      </Routes>
    </>
  )
}

export default App
