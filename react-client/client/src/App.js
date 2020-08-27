import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			'twitter_name': "",
		}
	}
	async componentDidMount() {
		const resp = await fetch("/api")
		console.log(resp)
		const unamej = await resp.json()
		console.log(unamej)
		const uname = await unamej.screen_name
		this.setState({ twitter_name: uname })

	}

	async loginTwitter() {
		const resp = await fetch("/api/twitter")
		console.log(resp)
		const unamej = await resp.json()
		console.log(unamej)
		const uname = await unamej.screen_name
		this.setState({ twitter_name: uname })
	}

	render() {
		if (this.state.twitter_name === "Please click on Log in with Twitter button"){
		return (
			<div>
				<p dangerouslySetInnerHTML={{ __html: this.state.twitter_name }} ></p>
				<form action="http://localhost:5000/api/twitter" method="get">
 					<input type="submit" value="Log in with Twitter"/>
 				</form>
			</div>
		)
		}
		else {
			return(
			<div>
				<p dangerouslySetInnerHTML={{ __html: this.state.twitter_name }} ></p>
				
			</div>)
		}


	}
}

export default App;
