import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import SignUpPage from './Authentication/SignUp/SignUp';
import SignInPage from './Authentication/SignIn/SignIn';
// import Navigation from './NavigationBar/NavigationBar';
import PasswordForgetPage from './Authentication/PasswordForget';
import MainPage from './MainPage/MainPage';
import MyPlans from './MyPlans/MyPlans';
import AccountPage from './AccountPage/AccountPage';
import withAuthentication from './Authentication/withAuthentication';
import ExerciseDetails from './ExerciseDetails/ExerciseDetails';
import ExerciseOverview from './ExerciseOverview/ExerciseOverview';
// import firebase, { auth } from './firebase/firebase.js';
import * as routes from './routes';
import './index.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'FitMeApp',
    }
  }
  render() {
    return (
      <Router >
        <div className = "App">
          <header className = "App-header">
            
          </header>
          <Route exact path={'/'} component={Welcome}/>
          <Route path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          <Route path={routes.MAIN_PAGE} render={() => <MainPage />} />
          <Route path={routes.MY_PLANS} component={() => <MyPlans />} />
          <Route path={routes.ACCOUNT} component={() => <AccountPage />} />
          <Route path={routes.DETAILS +'/:id'} component={ExerciseDetails} />
          <Route path={routes.EXCERSISE_OVERVIEW} component={() => <ExerciseOverview />} />

        </div>
      </Router>
      );
  }
}

export default withAuthentication(App);
