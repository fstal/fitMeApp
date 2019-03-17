import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../routes';
import {modelInstance} from '../data/Model';
import './SideBar.css';
import gif from '../Images/loading.gif';

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      plan: {},
      planName: 'INITIAL',
      planEmpty: true
    }
  }

  componentDidMount() {
    modelInstance.addObserver(this)
    var plans = modelInstance.getFullPlan();
    var nameOfPlan = modelInstance.getCurrentPlanName();
    if (plans === undefined || Object.keys(plans).length === 0 ) {
      this.setState({planEmpty:true});
    }  else{
      this.setState({planEmpty:false});
    }

    this.setState({
      status: 'LOADED',
      plan: plans,
      planName: nameOfPlan
    })
  }

  componentWillUnmount = () => {
      modelInstance.removeObserver(this);
  }

  update() {
    var plans = modelInstance.getCurrentPlan();
    var nameOfPlan = modelInstance.getCurrentPlanName();
    if (plans === undefined || Object.keys(plans).length === 0 ) {
        this.setState({planEmpty:true});
      }  else{
        this.setState({planEmpty:false});
      }
    this.setState({
      status: 'LOADED',
      plan: plans,
      planName: nameOfPlan
    })
  }

  catchName(e) {
    e.preventDefault();
    let inputName = this.refs.planName.value;
    var plans = modelInstance.getCurrentPlan();
    modelInstance.setCurrentPlanName(inputName);

    this.setState({
      status: 'LOADED',
      plan: plans,
      planName:inputName
    })
  }


  render() {
    var printPlan = null;
    var nameOfPlan = "Set a new name";

    switch (this.state.status) {
      case 'INITIAL':
        nameOfPlan = <em><img src={gif} alt="Loading..." /></em>
        
        break;
      case 'LOADED':
        if(this.state.planName !== 'INITIAL' && this.state.planName !== null ){
          nameOfPlan = this.state.planName;
        }
        printPlan = this.state.plan.map((exercise) =>
          <tr key={exercise.name}>
            <th>{exercise.name}</th>
            <th>{exercise.category.name}</th>
            <th>
              <button className="delete" onClick={() => {modelInstance.removeExerciseFromPlan(exercise)}}>X</button>
            </th>
          </tr>
        )
        break;
       default:
        nameOfPlan = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="col-sm-3 sidebarbox">
        <div className="Sidebar">
          <h3>Plan</h3>
          <div id="inputBox" className="">

            <input type ="text" className="setnameplanbox" ref="planName" placeholder="Set Plan Name" />
          </div>
          <input type="button" value="Set Name" className="setNameBtn" onClick={this.catchName.bind(this)}/>
          <h4 id="planname">{nameOfPlan}</h4>
          <table id="SideBarTable" border="1">
            <thead>
              <tr>
                <th className="tableHeader">Excersise</th>
                <th className="tableHeader">Muscle</th>
                <th className="tableHeader">Remove</th>
              </tr>
              </thead>
              <tbody>
                {printPlan}
              </tbody>
          </table>  

          <Link to={routes.EXCERSISE_OVERVIEW}>
              <button id="confirmbutton" className="">Overview Plan</button>
          </Link>
          <button id="clearPlanButton" onClick={() => {modelInstance.clearFullPlan()}}>Clear Plan</button>
          <button id="sidebarSaveButton" disabled={this.state.planEmpty} onClick={() => {modelInstance.savePlan();}}>Save Workout</button>
        </div>
      </div>
    );
  }
}

export default Sidebar;