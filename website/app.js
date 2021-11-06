/* Global Variables */
//api key
const apiKey = "b5e7c9e4a674455bad884cb1acd31aa6";



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();
//Adding function to event listner
document.getElementById('generate').addEventListener('click',updateWeather);

//Building the the function in the listner
function updateWeather(){
    // Making variable for feeling
let personFeeling =document.getElementById('feelings').value;
//defining zip code
    let zip = document.getElementById('zip').value;
    getWeather(zip)
    .then(function(data) {     
        console.log(data);
        postData('/add',{temp: data.main.temp, date: newDate, feelings:personFeeling});
          })
          .then(function () {
              updateUI()
          })
       .catch (function(){
           alert('Invalid zip code')
          })
}
// Get api data by fetching api
// I have read some stackoverflow post to be able to fetch the api that way
    const getWeather = async (zip) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?zip="+zip+"&units=metric&appid="+apiKey ;   
    const res= await fetch(url)
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('error', error);
    }     
    }

// Posting the data
//I got some help from classroom lessons before writing that part
const postData = async (url = '',data = {}) => {
    console.log(data);
    const response = await fetch(url,
        {method: "POST",
        credentials: "same-origin",
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData= await response.json();  
        return newData;
    }
    catch(error){
       console.log('error', error)
    }  
}
//Getting project data displayed in UI

const updateUI = async () => {
   
    const request = await fetch('/all');
    try {
    const allData = await request.json();
    console.log(allData);
    
    document.getElementById('temp').innerHTML = "Temperature: " + allData.temp + " C"; 
    document.getElementById('date').innerHTML = "Date: " + allData.date;
    document.getElementById('content').innerHTML = "Feeling: " + allData.feelings;
    
}
 catch(error){
    console.log("error",error)
}
}










