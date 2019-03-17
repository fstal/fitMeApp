import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SignUpLink } from '../SignUp/SignUp';
import { auth } from '../../firebase';
import picture from '../../package.png';
import * as routes from '../../routes';
import './SignIn.css';

const SignInPage = ({ history }) =>
  <div className="signin">
    <SignInForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.MAIN_PAGE);
        
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div id="nopaddingmargin" className="container row col-sm-12">
        <div id="nopadding" className="col-sm-6">
          <img className="picture" src={picture} alt="Did not load"></img>
        </div>
        
        <div id="nopadding" className="signinfrom col-sm-5">
          <form className="signinform" onSubmit={this.onSubmit}>
            <div className="signintitle">
              <span>Member Login</span>
            </div>
            <div data-validate = "Valid email is required: ex@abc.xyz">
              <input className="signinemail"
                autoComplete = "email"
                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder="Email Address"/>
            </div>
            <div data-validate = "Password is required">
              <input className="signinpassword" 
                autoComplete = "current-pawword"
                value={password}
                onChange={event => this.setState(byPropKey('password', event.target.value))}
                type="password"
                placeholder="Password"/>
            </div>
            <div>
              <button disabled={isInvalid} type="submit" className="signinbtn2">
                Sign In
              </button>
              <SignUpLink />
            </div>
            { error && <p>{error.message}</p> }
          </form>
        </div>
        <div className="col-sm-1">
          <Link to={routes.WELCOME}>
            <button className="backtowelcome"><i className="fas fa-arrow-left"></i></button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};