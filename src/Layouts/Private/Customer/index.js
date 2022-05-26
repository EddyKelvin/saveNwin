import Dashboard from '../../../Views/Private/Customer/Dashboard'

import React from 'react'
import { Switch, Route } from 'react-router-dom'

const CustomerRoutes = () => {
    return (
        <Switch>
            <Route path='/' exact >
                <Dashboard />
            </Route>
        </Switch>
    )
}

export default CustomerRoutes
