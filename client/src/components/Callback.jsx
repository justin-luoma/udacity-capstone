import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";

const Callback = () => {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth0();

    useEffect(() => {
        navigate("/", {replace: true});
    }, [isAuthenticated]);

    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default Callback;
