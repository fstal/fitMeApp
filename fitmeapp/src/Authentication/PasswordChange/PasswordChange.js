import React, { Component } from 'react';
import { auth } from '../../firebase';
import './PasswordChange.css';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <div className="changepasswordform">
        <form onSubmit={this.onSubmit}>
          <div>
          <input id="newpassword"
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            autoComplete = "new-password"
            placeholder="New Password"/>
          </div>
          <div>  
          <input id="confirmpassword"
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            autoComplete = "new-password"
            placeholder="Confirm New Password"/>
          </div>
          <div>
          <button disabled={isInvalid} type="submit" className="changepassword">
            Reset My Password
          </button>
          </div>
          { error && <p>{error.message}</p> }
        </form>
      </div>
    );
  }
}

export default PasswordChangeForm;