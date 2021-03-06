const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

//import functions
const image = require('./controllers/image')
const profile = require('./controllers/profile')
const register = require('./controllers/register')
const signin = require('./controllers/signin')


//to connect database with the server we use knex
const knex = require('knex')
//db -> database
const db = knex({ 
  client: 'pg',//our client(pg->postgres)
  connection:{
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, 
  }
});


const app = express();
//use to convert
app.use(bodyParser.json());
app.use(cors());


//get(request) just recive a source
app.get('/',(req,res)=>{
  res.send('Home')
});

//signin request(create a signin) when we connect(using https) endpoint
app.post('/signin',(req,res)=>{
 return signin.handleSignIn(req,res,db,bcrypt)
})

//register (add to database using post method) when create account endpoint
app.post('/register',(req,resp)=>{
  return register.handleRegister(req,resp,db,bcrypt)
});

//access/get profile endpoint
app.get('/profile/:id',(req,resp)=>{
  return profile.handleProfile(req,resp,db)
});

//image(to update the entries) endpoint
app.put('/image',(req,resp)=>{ 
  return image.handleImage(req,resp,db)
});

//image api endpoint
app.post('/imageUrl',(req,res)=>{
  return image.handleApi(req,res)
})

let port = 3000 || process.env.PORT;

app.listen(port ,()=>{
    console.log(`app is running on port ${port}`)
});



