// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
// Start up an instance of app

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
//get route by the help of udacity lessons
app.get('/all',getData);
function getData(req ,res) {
    res.send(projectData);

};
//post route
app.post('/add',postData);
//I read some stackoverflow posts to be able to write that part
function postData(req, res){
  
        projectData.date= req.body.date;
        projectData.temp= req.body.temp;
        projectData.feelings= req.body.feelings;
        res.send(projectData);  
}
 
// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{
    console.log(`running on localhost: ${port}`)
   })






