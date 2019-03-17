import React, {Component} from 'react';
import {modelInstance} from '../data/Model';

import gif from '../Images/loading.gif';
import { Link } from 'react-router-dom';
import './Exercises.css';
import * as routes from '../routes';


class Exercises extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      categories: [],
      image: [],
      exercises: [],
      bodyweightExercises: [],
      atGym: ''
    }
    this.categoryChosen = this.categoryChosen.bind(this);
  }

  componentWillMount() {
    localStorage.getItem('exr') && this.setState({
      exercises: JSON.parse(localStorage.getItem('exr')),
      status: 'LOADED' 
    })
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('exr', JSON.stringify(nextState.exercises));
  }

  componentDidMount() {
    this.catchCheckbox();
    this.updateCategories();
  }

  filterBodyweight(exerciseResults) {
    var bwExerc = []
    var i = 0;
    var k = 0;
    for (i = 0; i < exerciseResults.length; i++) { 
      for (k = 0; k < exerciseResults[i].equipment.length; k++) {
        if ((exerciseResults[i].equipment[k] === 7) || (exerciseResults[i].equipment.length === 0)) {
          bwExerc.push(exerciseResults[i]);
        }
      }
    }
    return bwExerc
  }

  updateCategories() {
    this.setState({
      status: 'INITIAL'
    })
    modelInstance.getAllCategories().then(categories => {
        this.setState({
          status: 'LOADED',
          categories: categories.results
        })
      }).catch(() => {
        this.setState({
          status: 'ERROR'
        })
      })
  }

  catchCheckbox() {
    if (document.getElementById("atGym").checked) {
      this.setState({   
        atGym: 'GYM'
      });
    }
    else {
      this.setState({   
        atGym: 'HOME'
      });
    }
  }
  
  categoryChosen(evt) {
    this.setState({
      status: 'INITIAL',
      currentcategory: evt.target.id,
      next: null
    })
    modelInstance.getSomeExercises(evt.target.id).then(exercises => {
      let bwExer = this.filterBodyweight(exercises.results)
        this.setState({
          status: 'LOADED',
          exercises: exercises.results,
          next: exercises.next,
          bodyweightExercises: bwExer
          }, () => this.checkForNext(this.state.currentcategory, this.state.next)
        );
    }).catch(() => {
        this.setState({
          status: 'ERROR'
        })
      })
  }

  checkForNext(id, next) {
    if (next !== null) {
      this.categoryChosenNext(id, next)
    }
  }

  categoryChosenNext(id, next) {
    modelInstance.getSomeExercises(id, next).then(exercisesNext => {
      let bwExerc = this.filterBodyweight(exercisesNext.results);
      let stateBwExerc = this.state.bodyweightExercises
      let i = 0;
      for (i = 0; i < bwExerc.length; i++) {     
        stateBwExerc.push(bwExerc[i]);
      }

      let stateExercises = this.state.exercises
      let j = 0
      for (j = 0; j < exercisesNext.results.length; j++) { 
        stateExercises.push(exercisesNext.results[j])
      }

      this.setState({
                status: 'LOADED',
                exercises: stateExercises,
                bodyweightExercises: stateBwExerc,
                next: null
      })
    }).catch(() => {
        this.setState({
          status: 'ERROR'
        })
      })
  }

  render() {
    let categoryList = null; 
    let exerciseList = null; 


    switch (this.state.status) {
      case 'INITIAL':
        categoryList = <em><img id="gif1" src={gif} alt="Loading..." /></em>
        break;
      case 'LOADED':
        categoryList = this.state.categories.map((categories) => 	
            <div key={categories.id} id={categories.id} className="category col-sm-2" onClick={evt => this.categoryChosen(evt)}>
              {categories.name}
            </div>
        )
        switch (this.state.atGym) {
          case 'INITIAL':
            exerciseList = <em><img id="gif1" src={gif} alt="Loading..." /></em>
            break;
          case 'GYM':
            exerciseList = this.state.exercises.map((exercises) =>
              <Link to = {routes.DETAILS +'/'+ exercises.id} key={exercises.id} className="col-sm-2 exercisesgym">
                <div id={exercises.id}  >
                  {exercises.name}
                </div>
              </Link>  
            )
          break;

          case 'HOME':
            exerciseList = this.state.bodyweightExercises.map((exercises) =>
              <Link to = {routes.DETAILS +'/'+ exercises.id} key={exercises.id} className="col-sm-2 exerciseshome">
                <div id={exercises.id}  >
                  {exercises.name}
                </div>
              </Link>  
              )
          break;
        default:
          exerciseList = <b>Failed to load data, please try again</b>
        }

        break;
      default:
        categoryList = <b>Failed to load data, please check your connection and try again</b>
        break;
    }
     

    return (
      <div className="AllContainer col-sm-9">
        
          <div className="" id="checkbox-container">
            <div>
              At the gym?
            </div>
            <div className="switch-container">
              <label className="switch">
                  <input type="checkbox" id="atGym" onClick={this.catchCheckbox.bind(this)} defaultChecked/>

                  <span className="slider round"></span>
              </label>
            </div>
        </div>
        <div className="row col-sm-9 CategoryContainer">
          {categoryList}
        </div>

        
        <div className="row col-sm-9 ExercisesContainer">
          {exerciseList}
        </div>

        
      </div>
    );
  }
}

export default Exercises;