import React, {Component} from 'react';
import './Search.css';
import {modelInstance} from '../data/Model';
import gif from '../Images/Spinner-0.9s-200px.gif';



class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      exercNameIdArray: [],
      status: "INITIAL"

    }
  }

  componentDidMount = () => {
    modelInstance.addObserver(this)
    if (modelInstance.isEmpty()) {       
      modelInstance.recursiveExercGetter()
    }
    else {
      this.update()
    }
  }

  componentWillUnmount = () => {
    modelInstance.removeObserver(this);
  }

  update() {
    var exercObject = modelInstance.getExercObj()
    this.getExercNames(exercObject)
  }

  getExercNames(exercises) {
    var valuePairArray = [];
    var i = 0
    for (i = 0; i < exercises.results.length; i++) {
      valuePairArray.push([exercises.results[i].name, exercises.results[i].id])
    }
    window.localStorage.setItem('exercNameIdArray', JSON.stringify(valuePairArray))
    this.setState({
        status: 'LOADED',
        exercNameIdArray: valuePairArray
      })    
    }

  catchSearch(e) {
    e.preventDefault();

    let inputFromSearch = this.refs.exercInput.value;
    for (let j = 0; j < this.state.exercNameIdArray.length; j++) {
      if (this.state.exercNameIdArray[j][0] === inputFromSearch) {
        let id = this.state.exercNameIdArray[j][1]
        window.location.href = '/details/'+id;
        break
      }
    }
  }

  render() {
    let searchInsert = ""
    let exercNameDatalist = this.state.exercNameIdArray.map(valuePair => {
       return <option key={valuePair[1]} value={valuePair[0]}> </option>  
     });

    switch (this.state.status) {
      case 'INITIAL':
        searchInsert = <em><img id="gif2" src={gif} alt="Loading..." /></em>
        break;

      case 'LOADED':
        searchInsert = (
          <div>
            <label className="title" htmlFor="api-exercise-names">Search for an exercise </label>
            <input type="text" id="api-exercise-names" className="datalist"
              ref="exercInput" 
              list="exercName-datalist" 
              placeholder="e.g Arnold Press" 
              autoComplete="off"
              />
            <datalist id="exercName-datalist" onClick={this.catchSearch.bind(this)}>
              {exercNameDatalist}
            </datalist>
            <input type="submit" className="searchsubmit" value="View Exercise Details" />
          </div> )
        break;
      default:
          searchInsert = <b>Failed to load data, please try again</b>
          break;
    }

    return (
      <div id="search-div" className="">
        <p id="search-div-topText" className="d-flex">
        </p>
        <form onSubmit={this.catchSearch.bind(this)}>
          <div id="search-container" className="d-flex flex-row flex-wrap">
            {searchInsert}
          </div>
        </form>
      </div>
    ) 
    
  }
}


export default Search;