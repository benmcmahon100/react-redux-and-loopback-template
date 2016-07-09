# React-Redux and Loopback template
This template for creating react-redux applications on top of a loopback application

# Installation
#### Step One: 

  clone the repo using git clone:
  
    git clone https://github.com/benmcmahon100/react-redux-and-loopback-template.git yourAppName

#### Step Two
  
  Change directory into the new app:
  
    cd ./yourAppName
    
#### Step Three:

  Install the dependancies for the application

    npm install
    
#### Step Four:

  Run the app using either npm start
  
    npm start
    
  The template app also works with nodemon out of the box
  
    nodemon
    
##### Other Notes:

  This app implements a webpack watcher child process. This means that when the app starts, it also begins a webpack --watch to compile the react application while you work. The output of webpack is sent to the console.
