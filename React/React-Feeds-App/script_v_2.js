/// Convert html mockup to React Components
/// Create 2 Components
/// Pass props to a Component

const commentList = [];

// CHILD COMPONENT "FOR ENTRIES"
class EnterCommentForm extends React.Component{
	constructor(props){
		super();
	}
	handleSubmit(event){
		event.preventDefault();
		let name = this._name;
		let comment = this._comment;
		const regExp = /^[0-9\W]*$/;
		if(regExp.test(name.value) || name.value == "")
			alert('Please enter a valid name')
		else if(name.value != "" && comment.value == "")
			alert('Please enter a Message')
		else if(name.value == "" && comment.value == "")
			alert('Please enter some informations')
		else{
			this.props.addComment(name.value, comment.value);
			name.value = "";
			comment.value = "";
		}
	}
	render(){
		return <form className="enterItem clearfix my-5" onSubmit={this.handleSubmit.bind(this)}>
			<div className="form-group">
				<input type="text" onFocus={(input) => this.value=""} placeholder="Name" className="form-control" ref={(input) => this._name = input}  />
			</div>
			<div className="form-group">
				<textarea type="textarea" rows="3" placeholder="Message" className="form-control" ref={(comment) => this._comment = comment}></textarea>
			</div>
			<button type="submit" className="btn btn-primary float-right">Post!</button>
		</form>
	}
}

// CHILD COMPONENT "FOR COMMENT LIST"
class Comment extends React.Component {
	constructor(){
		super();
	}
	render(){
		return(
			<div className="comment row p-3" id={this.props.id}>
				<div className="col-sm-2">
					<img src="img/avatar.png" className="align-top rounded"/>
				</div>
				<div className="px-4 col-sm-10">
					<h4 className="author">{this.props.author}</h4>
					<p>{this.props.bodyText}</p>
					<a href="#" className="delete-comment float-right" onClick={(e) => this.props.callbackRemoveComment(e)}>delete comment</a>
				</div>
			</div>
		);
	}
} 

// PARENT COMPONENT
class CommentBox extends React.Component {
	constructor(){
		super();
		this.state = {Hide_Comment : false, HideClass : '', HideText : 'Hide Comments'}
	}
	hideComment(){
		this.setState({Hide_Comment : !this.state.Hide_Comment}, 
			() => { 
				let myHideClass = '';
				let myHideText = '';
				if(this.state.Hide_Comment){
					myHideClass = 'hide'; 
					myHideText = 'Show Comments';
				}else{
					myHideClass = '';
					myHideText = 'Hide Comments';	
				} 
				this.setState({HideClass : myHideClass, HideText : myHideText});			
		}); 
	}
    removeComment(e) {
       commentList.splice(e.target.parentElement.id,1);
       this.forceUpdate();
    }
    addingNewComment(name,comment){
    	commentList.push({author : name, body : comment});	
    	this.forceUpdate();
    }
    render(){
		const comments = this._getComments();
			return<div className="comments-wrapper container">
					<EnterCommentForm addComment={this.addingNewComment.bind(this)} />
					<div className="comment-box">
						<div className="clearfix my-3 comment-head">
							<h3 className="float-left">Comments</h3>
							<button className="btn btn-secondary float-right" onClick={this.hideComment.bind(this)}>{this.state.HideText}</button>
						</div>
						<h5 className="comments-count underline text-right p-2 my-5">{commentList.length} comments</h5>
						<div className={'comment-list container '+this.state.HideClass}>
							{comments}
						</div>
					</div>
				</div>
	}
	_getComments() {
		return commentList.map((comment,index) => <Comment  callbackRemoveComment={this.removeComment.bind(this)} author={comment.author} bodyText={comment.body} id={index} avatarUrl={comment.avatarImg} />)
	}
} 


ReactDOM.render(<CommentBox />, document.getElementById('root'));
