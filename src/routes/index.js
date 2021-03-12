import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './config';

export const Routes = () => {
    const mapRoutes = () => {
        return routes.map(route => {
            return <Route path={route.path} exact={route.exact} component={route.component} />
        });
    }
    return (
        <Router>
            <Switch>
                {mapRoutes()}
            </Switch>
      </Router>
    )
};

