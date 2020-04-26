
//register server component function:
//define register function  as separated component
const handleRegister = (req ,resp,db, bcrypt)=>{
   //destructuring the object(req.body) properties that recive form front-end/postman():
   const {email,password,name} = req.body 
   //enctypt the password and store 
   const hash = bcrypt.hashSync(password);
    //create an transaction trx comes from transaction(new table)
    db.transaction(trx =>{
    trx.insert({
        hash: hash,//comes from bctypt
        email:email//comes form request.body(front-end)
    })
    .into('login')
    .returning('email')
    .then(loginEmail =>{
        //add an (new) user to database(users table):
        return trx('users') //must be returned(new created table)
        .returning('*')//returning all selected
        .insert({
        email: loginEmail[0],//we are returning an array
        name: name,
        joined: new Date()
        })
        .then(user =>{
        resp.json(user[0]);//connecting to database->promise
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
    })
    .catch(err => resp.status(400).json('unable to register'))

}

//exoprt the function
module.exports={
  handleRegister: handleRegister
};
