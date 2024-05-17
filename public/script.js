const submitBtn = document.querySelector(".search-btn"),
      cityValue = document.querySelector(".city-search"),
      windElement = document.querySelector("[data-wind]"),
      temperatureElement = document.querySelector("[data-temperature]"),
      humidityElement = document.querySelector("[data-humidity]"),
      statusElement = document.querySelector("[data-status"),
      locationElement  =document.querySelector("[data-location")



submitBtn.addEventListener("click", ()=>{
    getWeather()
})

const  getWeather = async () => {

    try{
        console.log(cityValue.value)
        let location  = cityValue.value
        const response = await fetch('/weather',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:  JSON.stringify({
                location: location
            })
            
        })
        const data = await response.json();
        setWeatherData(data)
    }
    catch{
        console.log("Incorrect location Entered") 
    }
    
   
}

const setWeatherData = (data) =>{

    const currentDay = data.current_observation 
    const location = data.location
    console.log(data.location)
    let temp = currentDay.condition['temperature']
    celcius= (temp - 32) * 5/9;

    locationElement.textContent = `${location['city']} , ${location['country']} `
    statusElement.textContent = currentDay.condition['text']
    windElement.textContent = currentDay.wind['speed']
    temperatureElement.textContent = Math.round(celcius);
    humidityElement.textContent = currentDay.atmosphere['humidity']

}