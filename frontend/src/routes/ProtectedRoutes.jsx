import { useContext} from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function ProtectedRoutes() {
    const {token} = useContext(LoginContext)
    console.log('Sono nel protected Routes ' + token)
    return ( 
        token ? <Outlet/> : <Navigate to='/login'/>
    );
}

export default ProtectedRoutes;