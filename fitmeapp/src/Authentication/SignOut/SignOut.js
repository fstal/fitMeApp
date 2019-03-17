import React, {Component} from 'react';
import { auth } from '../../firebase';

import './SignOut.css';

// const SignOutButton = () =>
class SignOutButton extends Component {


	render(){

		return(
			<div className="logoutbtndiv">
			<button className="logoutbtn" onClick={auth.doSignOut}>
				<span>Sign Out</span>
			</button>
			
				{this.clearData}
			</div>
		)
		
	}
}

	

export default SignOutButton;