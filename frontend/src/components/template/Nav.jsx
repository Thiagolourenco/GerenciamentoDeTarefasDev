import './Nav.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> HOME
            </Link>
            <Link to="/tasks">
                <i className="fa fa-tasks"></i> TAREFAS 
            </Link>
            <Link to="#">
                <i className="fa fa-table"></i> LISTA TAREFAS
            </Link>
        </nav>
    </aside>