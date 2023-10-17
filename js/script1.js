//let busArray = [];
fetch('https://api.sl.se/api2/realtimedeparturesV4.json?key=67fa0a3157ae45f594d9af038f51e91f&siteid=7000&timewindow=30')
    .then(res => res.json())
    .then(json => {
        json.ResponseData.Buses.forEach(data => {
            sl(data);
        });
    });


const sl = (data) => {
/*     let busNumber = data.LineNumber;
    let busDestination = data.Destination;
    let busTime = data.DisplayTime;

    function Bus(number, destination, time, nextBus) {
        this.number = number;
        this.destination = destination;
        this.time = time;
        this.nextBus = nextBus;
    }
    const existingBus = busArray.find(bus => bus.destination === busDestination);

    if (!existingBus) {
        busArray.push(new Bus(busNumber, busDestination, busTime, null));
    } else {
        if (existingBus.nextBus === null) {
            existingBus.nextBus = busTime;
        }
    } */
    const con = document.getElementById('sl-con');
    const busCon = document.createElement('div');
    const leftElem = document.createElement('div');
    const busLogo = document.createElement('img');
    const textBusNumberDestination = document.createElement('div');
    const textBusTime = document.createElement('div');

    textBusNumberDestination.textContent = data.LineNumber + ' ' + data.Destination;
    textBusTime.textContent = data.DisplayTime;

    busColor = "";
    data.GroupOfLine == null ? busColor = "busLogoRed" : busColor = "busLogoBlue";

    busCon.style.display = 'flex';
    leftElem.style.display = 'flex';
    busCon.setAttribute('class','singleBusDiv')
    busLogo.setAttribute("src","../img/Bus-logo.svg.png");
    busLogo.setAttribute("alt","Bus Logo");
    busLogo.setAttribute("class", busColor);

    con.appendChild(busCon);
    busCon.appendChild(leftElem);
    leftElem.appendChild(busLogo);
    leftElem.appendChild(textBusNumberDestination);
    busCon.appendChild(textBusTime);
};

fetch('https://api.openweathermap.org/data/2.5/weather?q=huddinge&units=metric&appid=dbf87de7264865416362ce390de95c52')
    .then(res => res.json())
    .then(data => {
        showInfo(data);
    })
    const showInfo = (data) => {
    const location = document.getElementById('location');
    const temp = document.querySelector("#tempDiv div")
    const weatherIcon = document.querySelector("#tempDiv img")
    const tempDesc = document.querySelector('#väder-con>div>p')

    const textWind = document.getElementById('wind');
    const textHumidity = document.getElementById('humidity');
    const textVisibility = document.getElementById('visibility');
    const textPressure = document.getElementById('pressure');

    location.textContent = data.name + ", " + data.sys.country;
    temp.textContent = Math.floor(data.main.temp) + "°C";
    weatherIcon.setAttribute('src','https://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png');
    tempDesc.textContent = 'Feels like ' + Math.floor(data.main.feels_like) + ' °C ' + data.weather[0].main + '. ' + data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

    textWind.textContent = 'Wind: ' + data.wind.speed + ' m/s W';
    textHumidity.textContent = 'Humidity: ' + data.main.humidity + ' %';
    textVisibility.textContent = 'Visibility: ' + data.visibility/1000 + ' km';
    textPressure.textContent = 'Pressure: ' + data.main.pressure + ' hPa';
}


function updateTime() {
    const currentTime = document.getElementById("currentTime");

    let time = new Date();
    let sweDays = ['Sön','Mån','Tis','Ons','Tor','Fre','Lör'];
    let sweMonth = ['Jan','Feb','Mar','Apr','Maj','Jul','Jun','Aug','Sep','Okt','Nov','Dec']
    let day = sweDays[time.getDay()];
    let date = time.getDate();
    let month = sweMonth[time.getMonth()]; 
    let now = time.toLocaleTimeString();


   currentTime.textContent = day + ' ' + date + ' ' + month + ' ' + now;
}
updateTime();
setInterval(updateTime, 1000);