import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../NavigationBar/NavigationBar';
import {modelInstance} from '../data/Model';

import gif from '../Images/loading.gif';
import * as routes from '../routes';
import './ExerciseOverview.css';


class ExerciseOverview extends Component	{
	constructor(props){
		super(props);
		this.state = {
			status: 'INITIAL',
			plan: {},
			planEmpty: true,
		}
	}


	onClick(event){
		modelInstance.savePlan();

	}


	componentDidMount() {
	    modelInstance.addObserver(this)
	    var plans = modelInstance.getFullPlan();
	    var planName = modelInstance.getCurrentPlanName();
	    if (plans === undefined || Object.keys(plans).length === 0 ) {
	    	this.setState({planEmpty:true});
	    }  else{
	    	this.setState({planEmpty:false});
	    }
	    this.setState({
	      status: 'LOADED',
	      plan: plans,
	      planName: planName
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

	componentWillUnmount = () => {
    	modelInstance.removeObserver(this);
    }

  	update() {
	    var plans = modelInstance.getFullPlan();
	    var planName = modelInstance.getCurrentPlanName();
	    if (plans === undefined || Object.keys(plans).length === 0 ) {
	    	this.setState({planEmpty:true});
	    }  else{
	    	this.setState({planEmpty:false});
	    }
	    this.setState({
	      status: 'LOADED',
	      plan: plans,
	      planName: planName
	    })
	  }
	

	render() {
		var printPlan = null;
    	// var exName = null;
    	var exImages = null;
    	var planName = this.state.planName;

    	

		switch (this.state.status) {
	      case 'INITIAL':
	        printPlan = <em><img src={gif} alt="Loading..." /></em>
	        
	        break;
	      case 'LOADED':
	      	
	        printPlan = this.state.plan.map((exercise) =>{
	        	if(exercise.image !== undefined){
		        	exImages = exercise.image.map((img) =>{
		        		return(
		        				<img key={img.id} alt="Didn't show up" src={img.image} className="col-sm-3"/>
		        			)
		        		}
		       		)
	        	}
	        	else{
	        		exImages = [];
	        	}
	        	
	        	return(
	        		
	        		<Link to = {routes.DETAILS +'/'+ exercise.id} key={exercise.id} >
			        	<div className="border border-dark rounded col-sm-12">
			        		<table>
			        			<thead>
			        				<tr>
			        					<th>Exercise Name</th>
			        					<th>Muscle Group</th>
			        					<th>Description</th>
			        				</tr>
			        			</thead>
			        			<tbody>
			        				<tr>
			        					<td>{exercise.name}</td>
			        					<td>{exercise.category.name}</td>
			        					<td dangerouslySetInnerHTML={{ __html: exercise.description }}></td>	
			        				</tr>
			        			</tbody>
			        		</table>
			        		<div className="exImages">
			        			{exImages}
			        		</div>

			        	</div>
			        </Link>
	        	)}
	        )
	        break;
	       default:
	        printPlan = <b>Failed to load data, please try again</b>
	        break;
	    }

		return	(

		<div className="ExerciseOverview">
		<Navigation/>
			<h3 id="h3overview">Your exercise overview</h3>
			<div id="inputBox" className="ml-3">
            	<input type ="text" className="EOsetnameplanbox" ref="planName" placeholder="Set Plan Name" />
            	<input type="button" value="Set Name" className="EOsetNameBtn" onClick={this.catchName.bind(this)}/>
          	</div>
			<div className="col-sm-12">
				<button id="savebutton" disabled={this.state.planEmpty} onClick={() => {this.onClick();}}>Save Workout</button>
				
				<Link to="/mainpage">
		        	<button className="goback">Back</button>
		        </Link>
				<h3>{planName}</h3>
				{(printPlan === null || printPlan.length === 0 ) ?  <h3>You haven't saved any exercises to the overview.</h3> : printPlan}		
			</div>	
		</div>
		)
	}
}
export default ExerciseOverview;

