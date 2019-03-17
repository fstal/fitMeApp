import { firebase } from '../firebase';

const httpOptions = {
  headers: {'Accept': 'application/json',
            'Authorization': 'Token a2b7cb2a9a954cc48b03d01baad8fc933412964f'}
};


const Model = function () {

  let observers = [];
  let plan = [];
  let allExercisesObj = {};
  // let searchLoaded = false
  var currentPlanName = null;
  // var collisionKey = null;


  if (localStorage.getItem('plan')) {
    plan = JSON.parse(localStorage.getItem('plan')); 
  }

  this.isEmpty = function() {
    return Object.keys(allExercisesObj).length === 0;
  };

  this.setCurrentPlanName = function(sentName){
    currentPlanName = sentName;
    this.addToLocalStorage('planName', sentName)

    checkPlanName();
  }

  this.savePlan = function() {
    if(plan[0] === undefined){
      alert("You can't save an empty plan.")
    }
    else if(currentPlanName === null){
      alert("You need to give the plan a name.")
    }
    else{
      handlePlanNameCollision();
    } 
  }

  this.getExercObj = function() {
    return allExercisesObj
  }

  const processSearchInput = function(exercName) {
    var url = 'https://wger.de/api/v2/exercise?status=2&language=2'
    if (exercName) {
      url =+ "&name=" + exercName;
    }
    return url
  }


  //Set values functions--------------------------------------------

  this.addToLocalStorage = function(option, param){
    if(option === "plan"){
      localStorage.setItem('plan', JSON.stringify(param));
    }
    else if(option === "planName"){
      localStorage.setItem('planName', JSON.stringify(param));
    }

  }

  this.setPlan = function(newPlan, planName){
    this.addToLocalStorage('plan', newPlan);
    this.addToLocalStorage('planName', planName);
    console.log(planName);
    plan = newPlan;
    currentPlanName = planName;
    notifyObservers();
  }


  this.clearFullPlan = function(){
    plan = [];
    currentPlanName = null;
    this.addToLocalStorage('plan', plan);
    this.addToLocalStorage('planName', currentPlanName);
    notifyObservers();
  };


  this.addExerciseToPlan = function(exercises, id, images) { 
    if (!plan.some(d => d.name === exercises.name)){
      exercises.id = id;
      exercises.image = images;
      plan.push(exercises);
      this.addToLocalStorage('plan', plan);
    }
    notifyObservers();
  }

  this.removeExerciseFromPlan = function(exercises) {
    plan = plan.filter(d => d.name !== exercises.name);
    this.addToLocalStorage('plan', plan);
    notifyObservers();
  }


  //Fetch values functions------------------------------------------
  this.getFullPlan = function() {
    if (localStorage.getItem('plan')) {
      plan = JSON.parse(localStorage.getItem('plan')); 
    }
    return plan;
  };

  //Needed since we can't take from localStorage in 
  this.getCurrentPlan = function(){
    return plan;
  }


  this.getCurrentPlanName = function(){
    if (localStorage.getItem('planName')) {
      currentPlanName = JSON.parse(localStorage.getItem('planName')); 
    } 
    return currentPlanName;
  }




  //Firebase Database related functions-----------------------------
  this.deleteSavedPlan = function(key) {
    var name = firebase.auth.currentUser.uid;
    var dataRef = firebase.database.ref().child(name).child(key);
    dataRef.remove();
    notifyObservers();

  }


  const handlePlanNameCollision = async message =>{
    var trueFalse = false;
    var key = null;
    var currentPlan = this.getCurrentPlan();
    var name = firebase.auth.currentUser.uid;
    var dataRef = firebase.database.ref().child(name);
    const getDbData = await dataRef.once("value")
    var dbData = getDbData.val()

    for(var val in dbData){
      if (dbData[val].name === currentPlanName){
        key = val;
        console.log('set true');
        trueFalse = true;
      }
    }

    if(trueFalse){
      dataRef = firebase.database.ref().child(name).child(key);
      dataRef.remove();
      console.log('Sparades MED att ta bort')
      firebase.database.ref().child(name).push({
        plan: currentPlan,
        name: currentPlanName
      })
    }
    else {
      console.log('Sparades utan att ta bort')
      console.log(currentPlanName)
      firebase.database.ref().child(name).push({
        plan: currentPlan,
        name: currentPlanName
      })
    }
    alert("Your workout was successfully saved.")
    notifyObservers();
  }


  const checkPlanName = async message => {
    // var loadedPlans = null;
    var name = firebase.auth.currentUser.uid;
    var dataRef = firebase.database.ref().child(name);

    const getDbData = await dataRef.once("value")
    var dbData = getDbData.val()
    console.log(dbData);


    for(var val in dbData){
      if (dbData[val].name === currentPlanName){
        var alertMessage = "You already have a plan by the name: "+ currentPlanName +". If you save, your previous data will be overwritten."
        alert(alertMessage)
      }
    }
  }



  // API Calls--------------------------------------------------

  this.getSearchResults = function(exercName) {
    const url = processSearchInput(exercName);
    return fetch(url, httpOptions)
  }

  this.getImage = function (exercise) {
  	const url = 'https://wger.de/api/v2/exerciseimage' + exercise;
  	return fetch(url, httpOptions)
  }

  this.getAllCategories = function () {
    const url = 'https://wger.de/api/v2/exercisecategory';
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getExercise = function (id) {
    const url = 'https://wger.de/api/v2/exerciseinfo/' + id;
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getSomeExercises = function (categoryId, next) {
    let url = ""
    if (next) {
    url = next
    }
    else {
    url = 'https://wger.de/api/v2/exercise?status=2&language=2&category=' + categoryId;
    }
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  } 

  this.getAllExercises = function (potentialURL) {
    var url = potentialURL;
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
    }

  this.getImages = function (id) {
    const url = 'https://wger.de/api/v2/exerciseimage?exercise=' + id;
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }  
  
  // API Helper methods-----------------------------------------------------

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getSomeExercises() API Error:', error.message || error)
      })
    } else {
      console.error('getSomeExercises() API Error:', error.message || error)
    }
  }


  //Recursive function for retrieving all exercises, where every depth-iteration depends on what was recieved from the level above it
  this.recursiveExercGetter = function(potentialURL) {
    let url =""
    let i = 0
    if (potentialURL) {
      url = potentialURL;
    }
    else {
      url = "https://wger.de/api/v2/exercise?status=2&language=2" //Will only occur the first iteration
    }
    this.getAllExercises(url).then(exercises => {

      if (Object.keys(allExercisesObj).length === 0 && allExercisesObj.constructor === Object) { // Will only occur the first iteration
        allExercisesObj = exercises;
      }
      else {
        for (i = 0; i < exercises.results.length; i++) {      //on other iters, push new results to obj and update next & prev
          allExercisesObj.results.push(exercises.results[i])
        }
        allExercisesObj["next"] = exercises.next;
        allExercisesObj["previous"] = exercises.previous;
      }
      if (allExercisesObj.next !== null) {                  //if more pages with exercises exists, recursively call func with obj.next
        this.recursiveExercGetter(allExercisesObj.next)
        return                                              // return out of the inception shit
      }
      else {    
        console.log(allExercisesObj)
        // searchLoaded = true                                            //when no more nexts  exists (next: null), notify observers
        notifyObservers() }
    })
  }


  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);


  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new Model();