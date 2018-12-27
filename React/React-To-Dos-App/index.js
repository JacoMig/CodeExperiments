let tasks = [];
let showTasks = [];
class Results extends React.Component{
	constructor(){
		super();
	}
	handleCheckBoxes(){
		this.props.checkTask(this.props.task,this.props.index);
	}
	
	render(){
		return<li key={this.props.index}><input type="checkbox" checked={this.props.checked} ref={(input) => this._input = input} value={this.props.task} onChange={this.handleCheckBoxes.bind(this)} />{this.props.task}</li>;
		
		
		
	}
}



class Wrapper extends React.Component{
    constructor() {
     super();
     this.state={showAll : true}
    }
	handleChange(e) {
		//this.setState({ inputValue: e.target.value});
	}
	handleSubmit(event) {
		event.preventDefault();
		if(this._task.value != ""){
			tasks.push({task : this._task.value, completed : false})
		if(this.state.showAll){
			showTasks = tasks;	
		}
		this.forceUpdate();
		}
		
		
	}

	addCheckedTasks(task, index){
		if(this.state.showAll)
		tasks[index].completed ?  tasks[index].completed = false : tasks[index].completed = true
		else
		showTasks[index].completed ?  showTasks[index].completed = false : showTasks[index].completed = true
		this.forceUpdate();
		console.log(showTasks) 
	}

	showAll(){
		this.setState({showAll : true});
		showTasks = tasks;	
	}

	showCompleted(){
		showTasks = tasks.filter((task) => 
		   task.completed
		);
		this.setState({showAll : false});
	}
	showNotCompleted(){
		showTasks = tasks.filter((task) =>
			!task.completed
			
		);
		this.setState({showAll : false});
		//this.forceUpdate();
		console.log(showTasks)
		
	}

	render(){
		return <div className="Wrapper">
				<h2>Things to do</h2>
				<div>
					<form>
						<input id="inputTask" type="text" placeholder="Add a task"  ref={(input) => this._task = input} />
						<button href="#" onClick={this.handleSubmit.bind(this)}>+</button>
					</form>
				</div>
				<div className="tasks-list">
					<ul>{showTasks.map((value,index) => <Results show={this.state.showAll} checked={value.completed} checkTask={this.addCheckedTasks.bind(this)} task={value.task} index={index} /> )}</ul>
				</div>
				<div className="buttons">
					<button onClick={this.showCompleted.bind(this)}>show completed</button>
					<button onClick={this.showNotCompleted.bind(this)}>show not completed</button>
					<button onClick={this.showAll.bind(this)}>show All</button>
				</div>
			</div>
	}

}



ReactDOM.render(<Wrapper />, document.getElementById('root'));