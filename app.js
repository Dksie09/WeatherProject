const express = require("express")
const https = require('node:https');
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.urlencoded({extended: true}))

// app.get("/",function(req, res){
//     res.sendFile(__dirname+"/index.html")
// })
app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html")   
})

app.post("/", function(req, res){
    // res.send("hey")
    var cityName = req.body.cityName
        https.get("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=deffedb8018d091bcbd36d4145f2c875", function (response) {
        console.log(response.statusCode)
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            // console.log(weatherData);
            const temp = weatherData.main.temp
            console.log(temp);
            const desc = weatherData.weather[0].description
            console.log(desc);
            var icon = weatherData.weather[0].icon
            var imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            // var city = weatherData.name
            res.write("<h1>The temperature in "+ cityName+" is "+temp+" kelvins.</h1><br>The weather is currently "+desc+"<br>")
            res.write("<img src="+imgURL+">")
            res.send()

        })
})
})


app.listen(3000, function(){
    console.log("server is running on port 3000");
})