
//signin server component function:
//create a function and pass down the database(db) and bctypt function as parameters(dependency injection)
const handleSignIn = (req ,res,db, bcrypt)=>{
  //check what we sent form frontend 
  db.select('email','hash').from('login')
  .where('email', '=', req.body.email)
  .then(data =>{
    //uncrypt the password
    const isValid = bcrypt.compareSync(req.body.password , data[0].hash);//return true or false
    if(isValid){
      return db.select('*').from('users')
        .where('email','=',req.body.email)
        .then(user =>{
          res.json(user[0])
        })
        .catch(err =>{
          res.status(400).json('unable to get user')
        })
    }else{
      //send a response message from server
      res.status(400).json('wrong email or password')
    }
  })
  .catch(err => res.status(400).json('wrong credentials'))
}


module.exports={
 handleSignIn: handleSignIn
};



