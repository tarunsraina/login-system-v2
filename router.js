const express = require('express');

const router = express.Router();
const fs = require('fs');
// login



router.post('/login',(req,res)=>{
    const email = req.body.loginemail+"";
    const pass = req.body.loginpassword+"";
    
    let passFound = false;
    let emailFound = false;
    console.log("hereeeeee");
    fs.readFile('storeEmail.txt','utf8',(err,data)=>{
        if(err) return console.log(err);
        let emails = data;
        console.log(emails);
        let emailSplt = emails.split("#");
        for(let i=0;i<emailSplt.length;i++){
            if(emailSplt[i]==email){
                console.log("looking for "+email+" but found "+emailSplt[i])
                emailFound = true;
            }
        }
    })

    fs.readFile('storePass.txt','utf8',(err,data)=>{
        if(err) return console.log(err);
        let pwds = data;
        console.log(pwds);

        let passSplt = pwds.split("#");
        
        for(let i=0;i<passSplt.length;i++){
            if(passSplt[i]==pass){
                console.log("looking for "+pass+" but found "+passSplt[i])
                passFound = true;
            }
        }

        if(emailFound&&passFound){
            res.render('dashboard');
        }else{
            res.render('forgotPass')
        }

    })


    console.log("email :"+emailFound);
    console.log("pass :"+passFound);
    



    
})

router.post('/register',(req,res)=>{
    const email = req.body.email+"";
    const pass = req.body.password+"";
    console.log("hereeeeee");
    fs.appendFile('storeEmail.txt',email+"#",(err)=>{
        if(err) return console.log(err);
        console.log('stored email')
    })

    fs.appendFile('storePass.txt',pass+"#",(err)=>{
        if(err) return console.log(err);
        console.log('stored password')
    })

    res.render('login')



    
})

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
    res.render('dashboard',{user:req.session.user})
    }else{
        res.send("Unauthorized user");
    }
})

//logout

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }else{
            res.render('base',{title:"Login",logout:"Logout success!"})
        }
    })
})


module.exports = router