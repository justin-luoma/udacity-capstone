import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';
import {useLocation} from "react-router-dom";

const Callback = ({handleAuthentication}) => {
    const location = useLocation();

    handleAuthentication(location);

    return (
        <Dimmer active>
            <Loader content="Loading..." />
        </Dimmer>
    );
}

export default Callback;
