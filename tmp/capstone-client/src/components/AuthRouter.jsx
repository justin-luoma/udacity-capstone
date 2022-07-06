import React from "react";
import {Route, Routes, useNavigate} from 'react-router-dom'
import Auth from "../auth/Auth";
import Callback from "./Callback";
import App from "../App";


const AuthRouter = () => {
    const navigate = useNavigate();
    const auth = new Auth(navigate);

    console.log("auth router");

    const handleAuthentication = (location) => {
        console.log("Location: " + location);
        if (/access_token|id_token|error/.test(location.hash)) {
            auth.handleAuthentication()
        }
    }
    return (
        <Routes>
            <Route
                path="/callback"
                element={<Callback handleAuthentication={handleAuthentication}/>}
            />
            <Route
                path="/"
                element={<App auth={auth}/>}
            />
        </Routes>
    )
}

export default AuthRouter;
