import './Logo.css'
import React from 'react'
//import {Link} from 'react-router'
import Logo from '../../assets/image/desafio.png'

export default props =>
    <aside className="logo">
        <a href="#" className="logo">
            <img src={Logo} alt="Logo Do Desafio"/>
        </a>
    </aside>