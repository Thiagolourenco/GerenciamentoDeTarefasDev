import React, { Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'table',
    title: 'Lista de Tarefas',
    subtitle: 'Lista de Tarefas adicionadas pelo usuário'
}

const baseUrl = 'http://localhost:3001/tasks'
const initialState = {
    tasks: {name: '', description: '', term: '',priority: '' },
    list: []
}

export default class ListaDeTarefas extends Component{
    state = {...initialState}

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    getUpdateList(tasks, add = true){
        const list = this.state.list.filter(u => u.id !== tasks.id)
        if(add) list.unshift(tasks)
        return list
    }

    updateField(event){
        const tasks = {...this.state.tasks}
        tasks[event.target.name] = event.target.value
        this.setState({tasks})
    }

    remove(tasks){
        axios.delete(`${baseUrl}/${tasks.id}`).then(resp => {
            const list = this.getUpdateList(tasks, false)
            this.setState({list})
        })
    }

renderTables(){
    return(
        <table className="table mt-4">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Prazo</th>
                <th>Prioridade</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {this.renderRows()}
        </tbody>
    </table>
    )
}

renderRows(){
    return this.state.list.map(tasks => {
        return (
            <tr key={tasks.id}>
                <td>{tasks.id}</td>
                <td>{tasks.name}</td>
                <td>{tasks.description}</td>
                <td>{tasks.term}</td>
                <td>{tasks.priority}</td>
                <td>
                    <button className="btn btn-danger ml-2" onClick={() => this.remove(tasks)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })
}
    render(){
        return(
           <Main {...headerProps}>
               {this.renderTables()}
           </Main>
        )
    }
}