import React from 'react'
import {Switch, Redirect, Route} from 'react-router'

import Home from '../components/home/Home'
import TaskCrud from '../components/tasks/TasksCrud'
import ListaDeTarefas from '../components/tasks/ListaDeTarefas'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/tasks' component={TaskCrud} />
        <Route path='/list' component={ListaDeTarefas} />
        <Redirect from='*' to='/' />
    </Switch>