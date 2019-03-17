import React, {Component} from 'react';
import { NavLink, Link } from 'react-router-dom';
import SignOutButton from '../Authentication/SignOut/SignOut';
import AuthUserContext from '../Authentication/AuthUserContext';
import Search from '../Search/Search';
import * as routes from '../routes';
import './NavigationBar.css';


const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

class NavigationAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchisHidden: true,

    };

    this.toggleSearch = this.toggleSearch.bind(this);

  }

  toggleSearch() {
    this.setState({
      searchisHidden: !this.state.searchisHidden
    });
  }

  render() {

    return (
      <div id="loggedinnav">

        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <div className="navbar-header col-sm-2">
              <span className="navbar-brand">FitMeApp</span>
            </div>
            <div className="col-sm-1 ts">
              <button id="togglesearch" className="fas fa-search" onClick={this.toggleSearch}></button>
            </div>
            <div className="btn-group col-sm-9"> 
              <NavLink to={routes.MAIN_PAGE} 
                className="mainpagelink"
                activeClassName="selected">
                  <span id="navlinktext">Home</span>
              </NavLink>

              <NavLink to={routes.MY_PLANS}
                activeClassName="selected"
                className="myplanslink">
                  <span id="navlinktext">My Saved Plans</span>
              </NavLink>

              <NavLink to={routes.ACCOUNT}
                className="accountpagelink"
                activeClassName="selected">
                  <span id="navlinktext">Account Settings</span>
              </NavLink>
              <SignOutButton />
            </div>
          </div>

          <div className="row col-sm-12">
            <div className="col-sm-8">
            {!this.state.searchisHidden && <Search />}
            </div>
          </div>
        </nav>
        
      </div>
    )
  }
}

const NavigationNonAuth = () =>
  <div id="notloggedinnav">
    <Link to={routes.WELCOME}>
      <button className="btn btn-primary mr-2">
        <span>Start Page</span>
      </button>
    </Link>
    <Link to={routes.SIGN_IN}>
      <button className="btn btn-primary">
        <span>Sign in</span>
      </button>
    </Link>
  </div>


export default Navigation;