const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const path = require('path');

//initializing app
const app = express();

//configure database
mongoose.connect('mongodb://localhost:27017/first_task' , { useNewUrlParser: true , useUnifiedTopology: true})
.then(response => {
    console.log('Connected To Database');
}).catch(err => {
    console.log('Trouble Connecting To Databse');
})

//configure express
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));

//setup view engine for handlebars
app.engine('handlebars' , hbs({defaultLayout: 'default'}));
app.set('view engine' , 'handlebars');

//setup routes
const defaultRoutes = require('./routes/defaultRoutes');
app.use('/',defaultRoutes);

//Setup port
app.listen(4000 ,() => {
    console.log("App is running on port: 4000");
})
