import React from 'react';
import { firebase } from '../firebase';
import AuthUserContext from './AuthUserContext';
import {modelInstance} from '../data/Model';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
  	constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
      
      //console.log(this.state.authUser);
    }

    render() {
    	const { authUser } = this.state;
      modelInstance.currUser = this.state.authUser;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
}

export default withAuthentication;