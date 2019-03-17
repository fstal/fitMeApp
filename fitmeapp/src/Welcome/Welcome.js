import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import picture from '../package.png';
import * as routes from '../routes';
import './Welcome.css';


class Welcome extends Component {
	render() {
		return (
			
			<div id="nopaddingmargin" className="container row col-sm-12 welcome">
				<div id="nopadding" className="col-sm-6">
					<img className="picture" src={picture} alt="Didn't show up"></img>
				</div>
				
				<div className="col-sm-6 textandtbns">
				    <p id="wtext">
		            	Welcome to FitMeApp.
		            </p>
		            <p id="wtext1">
		            	Please sign up if you don't already have an account.  
		        	</p> 
					<div className="row wbuttons">
				    	<div className="btn-group">
					    	<Link to = {routes.SIGN_UP}>
								<button className="signupbtn1">
									<span>Sign up</span>
								</button>  
							</Link>
							<Link to = {routes.SIGN_IN}>
								<button className="signinbtn1">
									<span>Sign in</span>
								</button>
							</Link> 
						</div> 
				    </div>
				</div>
			</div>
		);
	}
}	

export default Welcome;