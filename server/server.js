if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const API_KEY =process.env.API_KEY

const express= require('express');
const app = express()
var axios = require("axios").default;
app.use(express.json())
app.use(express.static('../public'))



app.post('/weather', (req,res)=>{

    const { location } = req.body

    var options = {
        method: 'GET',
        url: 'https://yahoo-weather5.p.rapidapi.com/weather',
        params: {location: `${location}`, format: 'json', u: 'f'},
        headers: {
          'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com',
          'x-rapidapi-key': API_KEY
        }
      };
      
      axios.request(options)
      .then((response) => {
           const data = response.data;
          res.json(data);
      })
      .catch( (error)=> {
          res.json(error)
      });

})


app.listen( 3000, ()=>{
    console.log(`server running on http://localhost:3000 `)
})