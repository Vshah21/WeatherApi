if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const API_KEY =process.env.API_KEY


const express= require('express');
const app = express()
var axios = require("axios").default;
app.use(express.json())
app.use(express.static('../public'))



app.post('/weather', async (req,res)=>{

    const { location } = req.body

    const options = {
        method: 'GET',
        url: 'https://yahoo-weather5.p.rapidapi.com/weather',
        params: {
          location: location,
          format: 'json',
          u: 'f'
        },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        res.json(response.data);
        
    } catch (error) {
        console.error(error);
    }

})

app.listen( 3000, ()=>{
    console.log(`server running on http://localhost:3000 `)
})