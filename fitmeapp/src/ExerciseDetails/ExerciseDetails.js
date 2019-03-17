import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/Model';
import SideBar from '../SideBar/SideBar';
import Navigation from '../NavigationBar/NavigationBar';
import gif from '../Images/loading.gif';
import './ExerciseDetails.css';


class ExerciseDetails extends Component	{
	constructor(props){

		super(props);
		this.state = {
			status: 'INITIAL',
			exercise: {},
			images: [],
			exerciseID: props.match.params.id,

		}
	}
	componentDidMount() {
		let exerciseID = this.props.match.params.id;
		modelInstance.getExercise(exerciseID).then(exercise => {
			
			modelInstance.getImages(exerciseID).then(response => {

				this.setState({
					status: 'LOADED',
					images: response.results,
					exercise: exercise,
				})
			}).catch(() => {
				this.setState({
					status: 'ERROR'
				})
			})
		}).catch(() => {
			this.setState({
				status: 'ERROR'
			})
		})

    }

	render() {
	let exName=null;	
	let exImages=null;
	let exCategory=null;
	let exEquipment=null;
	let exDescription=null;
	let buttons = null;

	
  	switch (this.state.status) {
    	case 'INITIAL':
	        exName = <em><img src={gif} alt="Loading..." /></em>
	        
	        break;
    	case 'LOADED':
	        exName = this.state.exercise.name
	        exImages = this.state.images.map((img) =>
	        	<img key={img.id} alt="" className="exImage" id={img.id} src={img.image}/>
	        
	        )
	        exCategory = this.state.exercise.category.name
	        exEquipment = this.state.exercise.equipment.map((eq)=>
	        	<p key={eq.id}>{eq.name}</p>
	        )

        	exDescription = this.state.exercise.description

			buttons = (<div className="row">
			        		<button 
			        			id="addExerciseToPlan" 
			        			onClick={() => {modelInstance.addExerciseToPlan(this.state.exercise, this.state.exerciseID, this.state.images)}}>
			        			<span>Add to Plan</span>
			        		</button>
			        		
			       			<Link to="/mainpage">
			       				<button id="goback3">Back to homepage</button>
			       			</Link>

			       			
			   			</div>)

        	break;
    	default:
	       	exName = <b>Failed to load data, please try again</b>
	        break;
    }    
		return	(

		<div className="ExerciseDetails">
			<Navigation/>
			<div className="container row col-sm-12">
				<SideBar />
				<div className="col-sm-9" id="detailbox">
		        	<h3 className="exName">{exName}</h3>
			    	<div className="row">

			    		<table>
			    			<tbody>
				    			<tr>
					    			<td className="title">Category:</td>
					    			<td className="content">{exCategory}</td>
				    			</tr>
				    			<tr>
					    			<td className="title">Equipment:</td>
					    			<td className="content">{(exEquipment === "") ? "N/A" : exEquipment}</td>
				    			</tr>
				    			<tr>
					    			<td className="title">Description:</td>
					    			<td className="content" 
					    				dangerouslySetInnerHTML={{ __html: (exDescription === "") ? "N/A" : exDescription }}>
					    			</td>
				    			</tr>
			    			</tbody> 
			        	</table>
		        		
		        		<div className="col-sm-8">
			    			{exImages}
			   			</div>

			   		</div>
		   			{buttons}  
				</div>  
		    </div>
	    </div>    

		)
	}	
}

export default ExerciseDetails;