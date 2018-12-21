import React, { Component} from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'tasks',
    title: 'Tarafas',
    subtitle: 'Cadastro de Tarefas: Incluir, Listar, Alerar e Excluir'
}

const baseUrl = 'http://localhost:3001/tasks'
const initialState = {
    tasks: {name: '', description: '', term: '',priority: '' },
    list: []
}

export default class Tasks extends Component {
    
    state = {...initialState}

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    clear(){
        this.setState({tasks: initialState.tasks})
    }

    save(){
        const tasks = this.state.tasks
        const method = tasks.id ? 'put' : 'post'
        const url = tasks.id ? `${baseUrl}/${tasks.id}` : baseUrl
        axios[method](url, tasks)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({tasks: initialState.tasks, list})
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

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Tarefa</label>
                            <input type="text" className="form-control" name="name" value={this.state.tasks.name} onChange={e => this.updateField(e)} placeholder="Informa a Tarefa: "/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control" name="description" value={this.state.tasks.description} onChange={e => this.updateField(e)} placeholder="Informa a Descrição: "/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Prazo</label>
                            <input type="date" className="form-control" name="term" value={this.state.tasks.term} onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Prioridade</label>
                            <select className="custom-select" name="priority" value={this.state.tasks.priority} onChange={e => this.updateField(e)}>
                                <option >Baixa</option>
                                <option >Media</option>
                                <option>Alta</option>
                                <option >Muito Alta</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(tasks){
        this.setState({tasks})
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdateList(user, false)
            this.setState({list})
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Prazo</th>
                        <th>Prioridade</th>
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
                        <button className="btn btn-warning" onClick={() => this.load(tasks)}>
                            <i className="fa fa-pencil"></i>
                        </button>

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
            <Main {...headerProps} >
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}