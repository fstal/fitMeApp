import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../firebase';
import picture from '../../package.png';
import * as routes from '../../routes';
import './SignUp.css';


const SignUpPage = ({ history }) =>

  <div>
    
    <SignUpForm history={history} />
  </div>


const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <div id="nopaddingmargin" className="container row col-sm-12">
        
        <div id="nopadding" className="col-sm-6">
          <img className="picture" src={picture} alt="Did not load"></img>
        </div>

        <div id="nopadding" className="signupfrom col-sm-5">
          <form className="signupfrom" onSubmit={this.onSubmit}>
            <div className="signuptitle">
              <span>Sign Up</span>
            </div>
            <div className="" data-validate = "Valid email is required: ex@abc.xyz">
              <input className="signupemail"
                autoComplete="email"
                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder="Email Address"/>
            </div>
            <div className="" data-validate = "Password is required">
              <input className="signuppasswordone"
                autoComplete="new-password"
                value={passwordOne}
                onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                type="password"
                placeholder="Password"/>
            </div>
            <div className="" data-validate = "Password is required">
              <input className="signuppasswordtwo"
                autoComplete="new-password"
                value={passwordTwo}
                onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                type="password"
                placeholder="Confirm Password"/>
            </div>
            <div className="signup2">
              <button className="signupbtn2" disabled={isInvalid} type="submit">
                Sign Up
              </button>
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

const SignUpLink = () =>

  <div className="signup1 ">
    <p>
      Don't have an account?
      {' '}
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  </div>


export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};