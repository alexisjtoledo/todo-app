// Imports
import React, {Component} from 'react';

// App
class App extends Component {

    constructor(){
        super();
        // Initializing the state of the Tasks
        this.state = {
            _id: '',
            title: '',
            description: '',
            tasks:[]
        }
        // Joining the functions with the constructor
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Creating the function of the submit button
    addTask(e) {
        // Checking if I am creating a new task or updating someone that already exists
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html:'Task updated'});
                })
                .then(this.setState({_id:'', title:'', description:''}))
                .then(this.fetchTasks())
                .catch(err => console.log(err));
        } else {
            // Sending the state to the API
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                // Translating the response to a JSON
                .then(res => res.json())
                .then(data => {
                    // Showing the response in console
                    console.log(data);
                    // Sending a toast
                    M.toast({html:'Task saved'});
                    // Cleaning the state
                    this.setState({title:'', description:''});
                    this.fetchTasks();
                })
                // Catching if there's an error and showing it in the console
                .catch(err => console.log(err));   
        }
        // Cancelling the default function of the button
        e.preventDefault();
    }

    // Preloading the tasks list
    componentDidMount(){
        this.fetchTasks();
    }

    // Creating the method to fetch the tasks from DB
    fetchTasks(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
                console.log(this.state.tasks);
            })
            .catch(err => console.log(err));
    }

    // Creating a function to listen the changes in the form fields
    handleChange(e) {
        const {name, value} = e.target;
        // Setting the state with the new values obteined from the form
        this.setState({
            [name]: value
        });
    }

    // Creating a function that edits the data of the DB
    editTask(id){
        // Fetching the DB to obtain the document i want to edit
        fetch(`/api/tasks/${id}`)
            // Transforming the response into a JSON
            .then(res => res.json())
            // Using the info to update the state
            .then(data => {
                this.setState({
                    _id: data._id,
                    title: data.title,
                    description: data.description
                })
            })
    }

    // Creating a function that delete the data of the DB
    deleteTask(id){
        // Are you sure to delete?
        if (confirm('Are you sure you want to delete it?') == true){
            // If the asnwer is yes, then 
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                // Converting the response into a JSON
                .then(res => res.json())
                // Showing the response on the console
                .then(data => console.log(data))
                // Updating the list of tasks
                .then(this.fetchTasks())
                // Showing if there is a possible error
                .catch(err => console.log(err));
        }
    }

    // App rendering
    render(){
        return(
            <div>
                {/* Navigation */}
                <nav className="teal lighten-2">
                    <div className="nav-wrap">
                        <a className="brand-logo center" href="/">Simple To-Do App</a>
                    </div>
                </nav>
                <br />
                {/* Content */}
                <div className="container">
                    <div className="row">
                        {/* Presentation */}
                        <div className="col s12">
                            <div className="card z-depth-2 teal lighten-2">
                                <div className="card-content">
                                <p className="white-text center">App created by Alexis Toledo to practice MERN Stack &#40;MongoDB, Express, React and NodeJS&#41;</p>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <div className="col s5">
                            <div className="card z-depth-2">
                                <div className="card-content"> 
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input
                                                    type = "text"
                                                    name = "title" 
                                                    onChange = {this.handleChange}
                                                    placeholder = "Add a task"
                                                    value = {this.state.title}
                                                    />
                                                <textarea                                                    
                                                    name = "description"
                                                    onChange = {this.handleChange}
                                                    className = "materialize-textarea" 
                                                    placeholder = "Add a description for your task" 
                                                    value = {this.state.description} 
                                                    />
                                            </div>
                                            <button
                                                className="btn waves-effect waves-light teal lighten-2 col s12" 
                                                type="submit" 
                                                name="send"
                                                >
                                                Add new task
                                                </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* Tasks List */}
                        <div className="col s7 valign">
                            <div className="card z-depth-2">
                                <div className="card-content"> 
                                    <table className="responsive-table striped">
                                        <thead>
                                            <tr>
                                                <th>Task</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.tasks.map(task => {
                                                    return(
                                                        <tr key={task._id}>
                                                            <td>{task.title}</td>
                                                            <td>{task.description}</td>
                                                            <td>
                                                                <button
                                                                    className="btn waves-effect waves-light teal lighten-2"
                                                                    onClick = {() => 
                                                                        this.editTask(task._id)
                                                                    }
                                                                >
                                                                <i className="material-icons">edit</i>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn waves-effect waves-light teal lighten-2"
                                                                    onClick = {() => 
                                                                        this.deleteTask(task._id)
                                                                    }
                                                                >
                                                                <i className="material-icons">delete</i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Exports
export default App;