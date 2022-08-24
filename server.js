const express = require('express');
const path = require('path')
const app = express();
const {v4:uuidv4} = require('uuid')

const session = require('express-session')

const bodyParser = require('body-parser')

const router = require('./router')

const PORT = process.env.PORT || 3000;

app.use('/static',express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.use(session({
    secret : uuidv4( ),
    resave : false,
    saveUninitialized:true
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.use('/route',router)
app.get('/',(req,res)=>{
    res.render('base',{title:"Login System"})
})


app.listen(PORT,()=>console.log("Listening.. http://localhost:"+PORT));