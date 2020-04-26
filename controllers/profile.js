
//profile server component function:
const handleProfile = (req ,resp, db) =>{
    const {id} = req.params;//what comes from /profile/given_id

    db.select('*')
    .from('users')
    .where({
      id:id //id from user database table and given id(from request)
    })
    .then(user=>{
      if(user.length !==0){
        resp.json(user[0])//user data
      }else{
        resp.status(400).json('Not found')
      }
    })
    .catch(err =>{
      resp.status(400).json('error getting user')
    })
  
}

module.exports={
    handleProfile: handleProfile
};