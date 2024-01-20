const selectElement = (s) => document.querySelector(s);
const navLinks = document.querySelectorAll(".nav-link");

selectElement(".burger-menu-icon").addEventListener("click", () => {
    selectElement(".nav-list").classList.toggle("active");
    selectElement(".burger-menu-icon").classList.toggle("toggle")

    navLinks.forEach((link, index) => {
        if (link.style.animation){
            link.style.animation = ""
        }else{
            link.style.animation = `navLinkAnimate 0.5s ease forwards ${ index/7 + 0.5}s`
            console.log(index/7 + 0.5)
        }
    })
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        selectElement(".nav-list").classList.toggle("active");
        selectElement(".burger-menu-icon").classList.toggle("toggle");

        navLinks.forEach((link, index) => {
            if (link.style.animation){
                link.style.animation = ""
            }else{
                link.style.animation = `navLinkAnimate 0.5s ease forwards ${ index/7 + 0.5}s`
                console.log(index/7 + 0.5)
            }
        })
    })
})



// https://open-meteo.com/en/docs
// https://ipinfo.io/developers

async function WeatherAPI()  {
    const IpResp= await fetch('https://ipinfo.io/?token=66cee980b20a94')
    const IpRespresult = await IpResp.json() ; 
    const city = IpRespresult.city;
    const coordinatesArray = IpRespresult.loc.split(',');
    // Extract latitude and longitude from the array
    const latitude = coordinatesArray[0];
    const longitude = coordinatesArray[1];
    const weatherRespond= await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure&timezone=auto&forecast_days=1`)
    const weatherRespondresult = await weatherRespond.json() ; 
    document.getElementById("API").innerHTML += `<p>Last Update for ${city} ${weatherRespondresult.current.time.slice(-5)}</p>`
    document.getElementById("API").innerHTML += `<p>Current Temperature:  ${weatherRespondresult.current.temperature_2m}&deg;C</p>`
    document.getElementById("API").innerHTML += `<p>Current Humidity: ${weatherRespondresult.current.relative_humidity_2m}%</p>`
}

WeatherAPI()