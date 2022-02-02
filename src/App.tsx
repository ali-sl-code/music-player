
import Application from "components/app";
import Login from "components/login";
import { useAuth0 } from '@auth0/auth0-react'

function App(){
const{ isLoading } =useAuth0()
if(isLoading)  return <div>Loading....</div>
return(
    <>
    <Login/>
    <Application/>
    </>
)



}

export default App