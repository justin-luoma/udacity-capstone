import React from 'react';
import {createRoot} from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import AuthRouter from "./components/AuthRouter";
import {BrowserRouter} from "react-router-dom";

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthRouter/>
    </BrowserRouter>
);

