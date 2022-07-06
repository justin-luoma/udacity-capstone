import React from 'react';
import {Grid, Menu} from "semantic-ui-react";
import {Link, Route, Routes} from "react-router-dom";
import LogIn from "./components/LogIn";
import NotFound from "./components/NotFound";

const App = ({auth}) => {

    const handleLogin = () => {
        auth.login();
    }

    const handleLogout = () => {
        auth.logout();
    }

    const logInLogOutButton = () => {
        if (auth.isAuthenticated()) {
            return (
                <Menu.Item name="logout" onClick={handleLogout}>
                    Log Out
                </Menu.Item>
            )
        } else {
            return (
                <Menu.Item name="login" onClick={handleLogin}>
                    Log In
                </Menu.Item>
            )
        }
    }

    const generateMenu = () => {
        return (
            <Menu>
                <Menu.Item name="home">
                    <Link to="/">Home</Link>
                </Menu.Item>

                <Menu.Menu position="right">{logInLogOutButton()}</Menu.Menu>
            </Menu>
        )
    }

    const generateCurrentPage = () => {
        if (!auth.isAuthenticated()) {
            return <LogIn auth={auth}/>
        }

        return (
            <Routes>
                <Route
                    path="/"
                    exact
                    element={<div>Testing</div>}
                />

                {/*<Route*/}
                {/*  path="/todos/:todoId/edit"*/}
                {/*  exact*/}
                {/*  render={props => {*/}
                {/*    return <EditTodo {...props} auth={this.props.auth} />*/}
                {/*  }}*/}
                {/*/>*/}

                <Route element={NotFound}/>
            </Routes>
        )
    }

    return (

            <Grid container stackable verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column width={16}>
                        {generateMenu()}

                        {generateCurrentPage()}
                    </Grid.Column>
                </Grid.Row>
    {/*<Segment style={{padding: '8em 0em'}} vertical>*/}
    {/*    </Segment>*/}
            </Grid>
    );
}

export default App;
