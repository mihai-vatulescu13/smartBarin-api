const Clarifai = require('clarifai');

const app = new Clarifai.App({
  //our API key:
  apiKey:'e9bf0ddf8e544cd9af142c916e66d485'
})

//create an endpoint for clarifai input(return a response from request to api):
const handleApi = (req,res) =>{
  app.models
     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input) 
     .then(data =>{
      return res.json(data)
     })
     .catch(err =>{
      return res.status(400).json('error occured from connection with API')
     })
}


//image server component function:
const handleImage = (req ,resp ,db) =>{
  //recive user id form the body(postman/frontend)
  const {id} = req.body;
  db('users')
  .where('id','=',id)
  .increment('entries',1)//increment entries by 1 in database
  .returning('entries')
  .then(entries =>{
    resp.json(entries[0])
  })
  .catch(err =>{
    resp.status(400).json('unable to get entries')
  })
}

module.exports={
    handleImage: handleImage,
    handleApi: handleApi
};
