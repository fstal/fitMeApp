import React, {Component} from 'react';
import withAuthorization from '../Authentication/withAuthorization';
import Navigation from '../NavigationBar/NavigationBar';
import SideBar from '../SideBar/SideBar';
import Exercises from '../Exercises/Exercises';
import '../index.css';


class MainPage extends Component {
	render() {
		return (
			<div>
				<Navigation/>
					<div className="container row col-sm-12">
						<SideBar/>
						<Exercises />
						
					</div>
			</div>
		)
	}
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(MainPage);