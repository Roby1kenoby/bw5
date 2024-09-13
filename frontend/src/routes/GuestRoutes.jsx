import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function GuestRoutes() {
    const {token} = useContext(LoginContext)
    console.log('sono nel geust routes' + token)
    return ( 
        !token ? <Outlet/> : <Navigate to='/'/>
    );
}

export default GuestRoutes;