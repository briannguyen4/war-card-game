const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");

const app = express();
const path = __dirname + '/views/';
app.use(express.static(path));

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path + "index.html");
})

app.listen(3000, () => {
    console.log("server running");
});

const mongoose = require('mongoose');
const Player = require("./models/player");
// const playerRoute = require('./src/routes/playerRoute');
mongoose.connect("mongodb+srv://briannguyen4:mongodbpassword@cluster0.uw4jp.mongodb.net/warcardgame?retryWrites=true&w=majority"
).then(() => console.log("connected")).catch((err)=> console.log(err));

app.get('/players', (req, res) => {
    Player.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
});

// app.use("/api/players", playerRoute);

