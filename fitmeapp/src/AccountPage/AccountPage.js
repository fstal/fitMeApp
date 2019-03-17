import React, { Component } from 'react';
import AuthUserContext from '../Authentication/AuthUserContext';
import PasswordChangeForm from '../Authentication/PasswordChange/PasswordChange';
import withAuthorization from '../Authentication/withAuthorization';
import Navigation from '../NavigationBar/NavigationBar';
import './AccountPage.css';

class AccountPage extends Component {

  render() {

    return (
		<div className="AccountPage">
			<Navigation/>
			
				<AuthUserContext.Consumer>
				  {authUser =>
				    <div>
				      <h3 id="user">Logged in as: {authUser.email}</h3>
				      <PasswordChangeForm />
				    </div>
				  }
				</AuthUserContext.Consumer>
			
		</div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);