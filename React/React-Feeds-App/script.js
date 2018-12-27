/// Convert html mockup to React Components
/// Create 2 Components
/// Pass props to a Component

const commentList = [];

// CHILD COMPONENT "FOR ENTRIES"
class EnterComment extends React.Component{
	constructor(props){
		super();
		this.state = {inputName : 'Enter a Name', inputComment : 'Enter a Comment'}
	}
	handlerChange(e){
		let thisClass = e.target.className;
		if(thisClass === 'inputName')
			this.setState({inputName : e.target.value}); 	
		if(thisClass === 'inputComment'){
			this.setState({inputComment : e.target.value}); 	
		}
	}
	render(){
		return <div className="enterItem">
			<input type="text" className="inputName" value={this.state.inputName} onChange={this.handlerChange.bind(this)} />
			<textarea type="textarea" className="inputComment" value={this.state.inputComment} onChange={this.handlerChange.bind(this)}></textarea>
			<button onClick={() => this.props.enterComment(this.state.inputName,this.state.inputComment)}>Post it!</button>
		</div>
	}
}

// CHILD COMPONENT "FOR COMMENT LIST"
class Comment extends React.Component {
	constructor(){
		super();
	}
	render(){
		return(
			<div className="comment" id={this.props.id}>
				<img src="img/avatar.png" />
				<h4 className="author">{this.props.author}</h4>
				<p>{this.props.bodyText}</p>
				<a href="#" className="delete-comment" onClick={(e) => this.props.callbackRemoveComment(e)}>X</a>
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
				this.setState({HideClass : myHideClass, HideText : myHideText}, () => console.log(myHideClass));			
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
			return<div className="comments-wrapper">
					<EnterComment enterComment={this.addingNewComment.bind(this)} />
					<div className="comment-box">
						<h3>Comments</h3>
						<div className="comment-hide">
							<a href="#" onClick={this.hideComment.bind(this)}>{this.state.HideText}</a>
						</div>
						<h4 className="comments-count">{commentList.length} comments</h4>
						<div className={'comment-list '+this.state.HideClass}>
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
