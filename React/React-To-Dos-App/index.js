let tasks = [];
let tasks_to_show = [];
class Results extends React.Component{
	constructor(){
		super();
	}
	updateTasks(action){
		this.props.update_tasks(this.props.id, action)
	}
	render(){
		return<li key={this.props.id}>
				<input type="checkbox" checked={this.props.checked} id={`task#${this.props.id}`} onChange={() => this.updateTasks('check') } />
				<label htmlFor={`task#${this.props.id}`}>{this.props.task_content}</label>
				<span onClick={() => this.updateTasks('delete') } className="delete_task"></span>
			</li>;
	}
}


class Wrapper extends React.Component{
    constructor() {
     super();
     this.state={showState : 'all', id : 0, message: 'No tasks added!', classMessage : 'visible'}
    }
	
	handleSubmit(event) {
		event.preventDefault();
		if(event.keyCode === 13 || event.target.tagName !== "INPUT"){
			this.setState((state) => {id : state.id++ })
			if(this._task.value != ""){
				tasks.push({id: this.state.id, task : this._task.value, completed : false})
			
				this.showTasks('all')
			}	
		}
	}

	updateTasks(id, action){
		if(action === 'check'){
			const taskIndex = tasks.findIndex(task => task.id === id)
			tasks[taskIndex].completed = !tasks[taskIndex].completed	
			this.forceUpdate()
		}else if(action === 'delete'){
			const taskIndex = tasks.findIndex(task => task.id === id)
			tasks.splice(taskIndex,1);
			this.showTasks(this.state.showState)
		}
	}
	
	showTasks(taskState){
		let message = '';
		if(taskState === "completed"){
			tasks_to_show = tasks.filter((task) => task.completed);
			message = 'No completed tasks!';
		}else if(taskState === "not completed"){
			tasks_to_show = tasks.filter((task) => !task.completed);
			message = 'No tasks has to be done!';
		}else if(taskState === "all"){
			tasks_to_show = tasks;
			message = 'No tasks added!';
		}
		tasks_to_show.length === 0 ? this.setState({message : message, classMessage : 'visible'}) : this.setState({message : message, classMessage : 'hidden'})	
		this.setState({showState : taskState});
	}
	
	render(){
		return <div className="Wrapper">
				<h2>To do list</h2>
				<div className="form">
					<input id="inputTask" type="text" placeholder="Add a task" onKeyUp={this.handleSubmit.bind(this)}  ref={(input) => this._task = input} />
					<button className="__add_task" onClick={this.handleSubmit.bind(this)}>+</button>
				</div>
				<div className="buttons">
					<button className="__completed" onClick={() => this.showTasks('completed')}>Completed</button>
					<button className="__not_completed" onClick={() => this.showTasks('not completed')}>Not completed</button>
					<button className="__all" onClick={() => this.showTasks('all')}>All</button>
				</div>
				<div className="tasks-list">
					<h3 className={`message ${this.state.classMessage}`}>{this.state.message}</h3>
					<ul>{tasks_to_show.map((item,index) => <Results key={item.id} checked={item.completed} update_tasks={this.updateTasks.bind(this)} task_content={item.task} id={item.id} /> )}</ul>
				</div>
			</div>
	}

}

ReactDOM.render(<Wrapper />, document.getElementById('root'));