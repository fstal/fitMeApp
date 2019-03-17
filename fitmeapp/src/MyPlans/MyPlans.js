import React, { Component } from 'react';
import withAuthorization from '../Authentication/withAuthorization';
import Navigation from '../NavigationBar/NavigationBar';
import SideBar from '../SideBar/SideBar';
// import { database } from '../firebase';
import './MyPlans.css';
import {modelInstance} from '../data/Model';
import gif from '../Images/loading.gif';
import { firebase } from '../firebase';

class MyPlans extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      loadedPlans: {}
    }
  }

  update() {
    this.setState({
      status: 'INITIAL'
    })
  }

  componentDidMount() {
      modelInstance.addObserver(this)
      this.setState({
        status: 'INITIAL'
      })
    }

  componentWillUnmount = () => {
      modelInstance.removeObserver(this);
    }

  getData = async message => {
    var loadedPlans = null;
    var name = firebase.auth.currentUser.uid;
    var dataRef = firebase.database.ref().child(name);

    const getDbData = await dataRef.once("value")
    loadedPlans = getDbData.val();
    this.setState({
        status: 'LOADED',
        loadedPlans: loadedPlans
      })
  }

  render() {
    var printPlans = null;
    var exercise = null;
    var savedPlans = this.state.loadedPlans; 
    var objList = [];


   

    for(var key in savedPlans){
      var obj = savedPlans[key];
      obj.plan.key = key;
      objList.push(obj);
    } 
    

    switch (this.state.status) {
        case 'INITIAL':
          printPlans = <em><h3>Waiting For Network</h3><img src={gif} alt="Loading..." /></em>
          this.getData();
          
          break;
        case 'LOADED':

          printPlans = objList.map((plan) => {

            exercise = plan.plan.map((exercise)=>{

              return(
                <tr key={exercise.id}>
                  <td>
                    {exercise.name}
                  </td>
                  <td>
                    {exercise.category.name}
                  </td>
                </tr>
              )
            })
            return(
              <div className="border border-dark rounded col-sm-12" key={plan.plan.key}>
                <h3>{plan.name}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Exercise Name</th>
                      <th id="muscleGroup">Muscle Group</th>
                    </tr>
                  </thead>
                  <tbody>
                      {exercise}
                  </tbody>
                </table>
                <div className="buttons">
                  <button className="loadplans" onClick={() => modelInstance.setPlan(plan.plan, plan.name)}>Load Plan</button>
                  <button className="deleteplan" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) modelInstance.deleteSavedPlan(plan.plan.key) } }>Delete Plan</button>
                </div>
              </div>
            )
          })
          break;
         default:
          printPlans = <b>Failed to load data, please try again</b>
          break;
      }



    return (
      <div className="MyPlans">
        <Navigation/>
        <div className="container row col-sm-12">
          <SideBar />
          <div className="col-sm-9" id="myplans">
          <h3>Here's your saved plans mate</h3>
          <div id="sad">
            {printPlans}
          </div>
          </div>
        </div>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(MyPlans);