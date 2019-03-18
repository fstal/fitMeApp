# fitMeApp

Project for the course Interaction Programming and the Dynamic Web (IPROG)

See the deployed page here. Hosted via Firebase Hosting: https://fitmeup-eeeb9.firebaseapp.com/

Created using: JavaScript, React.js, HTML, CSS, Firebase

Created by: Filip Stål, Joel Weidenmark, Louise Gröndahl, Alexander Nordh

--------------------------------------------------------------

Original repository is located on the enterprise github server for the university of KTH.

--------------------------------------------------------------

## Application description:

>FitMeApp is a workout application where you can create an account, login and create your own workout routines. Browse different exercises depending on which muscle group you want to train, your access to gym equipment or simply find the exercise you are looking for through the smart search. Save your planned workout sessions and manage them from your saved plans and access them from anywhere.

--------------------------------------------------------------

### Setup and Installation

``` bash
# navigate to the projekt folder
cd ..iprog-project/fitmeapp

# install dependencies
npm install

# run the application locally
npm start

```

--------------------------------------------------------------

### Design decisions and known issues

* We originally intended to use redux, but as the project developed we came to the conclusion that its tradeoffs outnumbered its benefits in the scope of the project.

* In retrospect the Exercises component should have been kept pretty much as it is, but it should have had two child components - Namely Categories and ExerciseBoxes. Both which should've been 'dumb' components but which would have let us render them individually (both which are currently rendered directly by the exercise component)

* We should have decided on a better API. Most of the time-consuming issues originated from the fact that the API in many aspects were lacking which forced some solutions that were messier than we would have prefered. For example, the API can at most return 20 results per request. Wanting to stay consistent with using fetch and promises as the method of choice for retrieving data from the API probably was not the wisest either. It came with huge drawbacks when the next API request almost exclusively were dependent on what was returned from the last promise, while we simultaneously had to manage parts of the data which was returned. Using an array of promises or using promises as callbacks were alternatives but introduced other problems and made the code much harder on the eyes and to understand.

* The practice of returning a fetch from the the model to the components to fulfill the promises, which is what we did in previous labs and also initially did for all the API requests in this project - designates the processing of the returned data to be done withing the component. Which we midway through realised was far from optimal when we had complex requests and promises depending on oneanother. This is why we decided on keeping the API-request and processing which we deemed too extensive in the model.

* Another coding decision which stems from the lacking API is the logic behind of the exercise search. The API in itself only accepts exact search phrases, which implemented directly makes for a terrible user experience. We therefore decided that, in spite of it requiring a few API calls, implementing our own smart search utilizing HTML5's datalists were the far superior option. We also decided against onChange API calls in the search as we deemed it unnessesary and excessive. The downside is that depending on the current mood of the API initial load of the search may take a few seconds. This is only the case the first time a user decides to use the search.



--------------------------------------------------------------

### File structure:

```
..\IPROG-PROJECT-MASTER
|   .firebaserc
|   .gitignore
|   database.rules.json
|   firebase.json
|   package-lock.json
|   README.md
|   
+---fitmeapp
|   |   .firebaserc
|   |   .gitignore
|   |   package-lock.json
|   |   package.json
|   |   README.md
|   |   
|   +---public
|   |       dumbbellicon.ico
|   |       favicon.ico
|   |       index.html
|   |       manifest.json
|   |       
|   \---src
|       |   App.css
|       |   App.js 							# App component with routing
|       |   App.test.js 					# Test, making sure it doesnt throw during rendering (remove?)
|       |   index.css
|       |   index.js 						# Mounts DOM and root
|       |   logo.svg
|       |   package.png
|       |   registerServiceWorker.js
|       |   routes.js
|       |   
|       +---AccountPage						# Account page components, parent to the authentication components
|       |       AccountPage.css
|       |       AccountPage.js
|       |       
|       +---Authentication 					# Components for user authentication and password reset
|       |   |   AuthUserContext.js
|       |   |   PasswordForget.js
|       |   |   withAuthentication.js
|       |   |   withAuthorization.js
|       |   |
|       |   +---PasswordChange                                  # Component for changing password when logged in
|       |   |       PasswordChange.css
|       |   |       PasswordChange.js        
|       |   |    
|       |   +---SignIn						# Component for signing in to the application
|       |   |       SignIn.css
|       |   |       SignIn.js
|       |   |       
|       |   +---SignOut						# Component for logging out of the application
|       |   |       SignOut.css
|       |   |       SignOut.js
|       |   |       
|       |   \---SignUp						# Component for signing up and creating an account
|       |           SignUp.css
|       |           SignUp.js
|       |           
|       +---data							# Model
|       |       Model.js
|       |       
|       +---ExerciseDetails					# Component for viewing exercise details
|       |       ExerciseDetails.css
|       |       ExerciseDetails.js
|       |       
|       +---ExerciseOverview				# Component for viewing an overview of the currently selected exercises in sidebar
|       |       ExerciseOverview.css
|       |       ExerciseOverview.js
|       |       
|       +---Exercises						# Component for browsing exercise categories and actual exercises
|       |       Exercises.css
|       |       Exercises.js
|       |       
|       +---firebase						# Functions for firebase authentification and database
|       |       auth.js
|       |       firebase.js
|       |       index.js
|       |       
|       +---Images							# Loading .gif and spinners																	
|       |       loading.gif
|       |       Spinner-2.5s-200px.gif
|       |       
|       +---MainPage						# Component for viewing the main page with all its sub-components
|       |       MainPage.js
|       |       
|       +---MyPlans							# Component for viewing and managing user saved plans
|       |       MyPlans.css
|       |       MyPlans.js
|       |       
|       +---NavigationBar					# Component for the navigation bar
|       |       NavigationBar.css
|       |       NavigationBar.js
|       |       
|       +---Search							# Component for the exercise smart-search
|       |       Search.css
|       |       Search.js
|       |       
|       +---SideBar							# Component for the sidebar
|       |       SideBar.css
|       |       SideBar.js
|       |       
|       \---Welcome							# Component for viewing the welcome page
|               Welcome.css
|               Welcome.js
|               
+---functions								# Libraries
|   |   .eslintrc.json
|   |   index.js
|   |   package-lock.json
|   |   package.json
|   |   
|   \---node_modules
|       +---.bin
|       |       acorn
|       |       atob
|       |		...
|       |       
|       +---@firebase
|      		+---app
|      			...
|       
|     
|                 
|                   
\---Notes
        api_requests_exemplen.txt 			# Examples of requests and responses from the api
        
``


--------------------------------------------------------------
