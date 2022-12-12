const { Console } = require("console");
const express = require("express"); 
const https = require("https"); 
const bodyParser = require("body-parser");

const app = express(); 

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){ 
     
   res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req,res){ 
    const query = req.body.city; 
    const unit = "metric";
    const appid = "4723e81579fc63d1609f7aed000dd4a1";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit+"#";
    https.get(url,function (response) { 
        
        response.on("data", function (data) {
          const weatherData = JSON.parse(data); 
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description
          const icon = weatherData.weather[0].icon 
        const ImageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
         //We can have only one res.send inside the app.get but we can have multiple res.write ! 
        // res.write("adad")
        // res.write("adad")
        //res.send();
    
          res.send("<h1>The temperature in <em>"+query+"</em>  is "+temp+" ° celcius<br>The weather is currently : "+description+"</h1><br><img src = "+ ImageURL+" >");
          
          //const Player = {
            // name:"Aditya",
            // age:19
        //   } 
        // JSON.stringify(Player)---> Converts object into a string ! 
          
        //   console.log(weatherData); 
        })
    }) 
    
})




 //To make get request to external server node
//--> HTTP - Standard NOde Library 
//--> Request Module 
//--> Axios 
//--> SuperAgent 
//--> Got 
// LAst four are the external NPM Packages  ans the NAtive HTTP is the node module 
app.listen(3000,function () {
    console.log("Server is runnig on the 3000 port"); 
}) 

// Status Code 
// 200 - All Okay 
// 404 - Sources NOt Found - wrong path/endpoint 
// 401 - wrong API ID / Unauthorised 


