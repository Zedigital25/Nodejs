
var express = require("express")
var htpp = require("http")
var path = require("path")
var cors = require("cors")

var nodemailer = require("nodemailer")

var app = express()

var server = htpp.Server(app)

var port = 500

app.set("port", port)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "../public/index.html")))
app.use(cors({
    origin : 'http://localhost:3000', 
    methods : "GET, POST", 
}))



app.get("/", function(req, response){
    response.sendFile(path.join(__dirname, "../public/index.html"))
})

app.post("/send_email", function(req, response){
    var from = req.body.from
    var to = req.body.to
    var subject = req.body.subject
    var message = req.body.message

    var transporter = nodemailer.createTransport({
        service : 'gmail', 
        auth : {
            user : 'zedigital25@gmail.com',
            pass : "zdooxgcfqvxkshwz"
        }
    })

    var mailOptions = {
        from : from, 
        to : to, 
        subject : subject, 
        html : message  
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent");
        }
    })
})

server.listen(port, function(){
    console.log("starting server on port " + port);
})

console.clear();