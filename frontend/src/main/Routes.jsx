import React from 'react'
import {Switch, Redirect, Route} from 'react-router'

import Home from '../components/home/Home'
import TaskCrud from '../components/tasks/TasksCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/tasks' component={TaskCrud} />
        <Redirect from='*' to='/' />
    </Switch>