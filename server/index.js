const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
app.use(cors({
    origin: "https://phase3-mockup-frontend.vercel.app",
    methods: ["POST", "GET"],
    credentials: true
  }));

app.use(express.json())

mongoose.connect('mongodb+srv://vincent:123@employee.yvqm0ok.mongodb.net/?retryWrites=true&w=majority');


app.get("/", (req, res) => {
    res.json("Sucessful");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;

    res.header('Access-Control-Allow-Origin', 'https://phase3-mockup-frontend.vercel.app');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Credentials', 'true');

    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})
