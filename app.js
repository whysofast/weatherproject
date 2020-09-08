const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require("body-parser")
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));   

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req,res)=>{  
    const city = req.body.cityName;
    const apiKey = "439d4b804bc8187953eb36d2a8c26a02";
    const unit = "metric";
    const url = "https://openweathermap.org/data/2.5/weather?q=" +city + "&appid=" + apiKey + "&units=" + unit
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = Math.round(Number(weatherData.main.temp));
            const name = weatherData.name;
            const weather = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            res.write(`<h1>The temperature in ${name} (${weatherData.sys.country})  is ${temp} degrees C.</h1>`);
            res.write(`<h2>The weather is ${weather}</h2>`);
            res.write("<img src= http://openweathermap.org/img/wn/" + icon + "@2x.png>");
            res.send();
        })
    });
})




app.listen(port,()=>{
    console.log(`working at port: ${port}`);
});