import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing'
import Companies from './components/Companies'
import Sort from './components/Sort'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/sort' component={Sort}/>
        <Route path='/companies' component={Companies}/>
    </Switch>
)