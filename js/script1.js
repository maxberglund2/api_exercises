const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function updateTime() {
    const currentTime = document.getElementById("currentTime");

    let time = new Date();
    let day = daysOfWeek[time.getDay()];
    let date = time.getDate();
    let month = months[time.getMonth()]; 
    let now = time.toLocaleTimeString();

    currentTime.textContent = day + ' ' + date + ' ' + month + ' ' + now;
}
updateTime();
setInterval(updateTime, 1000);

fetch('https://api.sl.se/api2/realtimedeparturesV4.json?key=67fa0a3157ae45f594d9af038f51e91f&siteid=7000&timewindow=25')
    .then(res => res.json())
    .then(json => {
        json.ResponseData.Buses.forEach(data => {
            sl(data);
        });

        const con = document.getElementById('sl-con');
        const line = document.createElement('div');
        line.setAttribute('style','border-bottom: 2px solid rgb(59, 142, 250); margin: 0 0 10px 0;')
        con.appendChild(line);
    })

const sl = data => {
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

fetch('https://api.sl.se/api2/realtimedeparturesV4.json?key=67fa0a3157ae45f594d9af038f51e91f&siteid=7006&timewindow=120')
    .then(res => res.json())
    .then(json => {
        json.ResponseData.Trains.forEach(data => {
            sl2(data);
        });
    })

const sl2 = data => {
    const con = document.getElementById('sl-con');
    const trainCon = document.createElement('div');
    const leftElem = document.createElement('div');
    const trainLogo = document.createElement('img');
    const trainDestination = document.createElement('div');
    const textTrainTime = document.createElement('div');

    trainDestination.textContent = data.Destination;
    textTrainTime.textContent = data.DisplayTime;

    trainCon.style.display = 'flex';
    leftElem.style.display = 'flex';
    trainCon.setAttribute('class','singleBusDiv')
    trainLogo.setAttribute("src","../img/Pendeltåg.png");
    trainLogo.setAttribute("alt","Train Logo");
    trainLogo.setAttribute("class", 'trainLogo');

    con.appendChild(trainCon);
    trainCon.appendChild(leftElem);
    leftElem.appendChild(trainLogo);
    leftElem.appendChild(trainDestination);
    trainCon.appendChild(textTrainTime);
};

fetch('https://api.openweathermap.org/data/2.5/weather?q=huddinge&units=metric&appid=dbf87de7264865416362ce390de95c52')
    .then(res => res.json())
    .then(data => {
        showInfo(data);
    })

const showInfo = data => {
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

fetch('https://api.openweathermap.org/data/2.5/forecast?lat=59.237&lon=17.9819&units=metric&appid=dbf87de7264865416362ce390de95c52')
    .then(res => res.json())
    .then(json => {
        json.list.forEach(data => {
            showInfoMore(data);
        });
    });

const showInfoMore = data => {
    const timeCheck = data.dt_txt.split(' ');

    const inputDate = new Date(timeCheck[0]);

    const dayOfWeek = daysOfWeek[inputDate.getDay()];
    const month = months[inputDate.getMonth()];
    const day = inputDate.getDate();

    const formattedDate = `${dayOfWeek}, ${month} ${day}`;

    const isToday = new Date().getDay() === inputDate.getDay();
    if (timeCheck[1] === '15:00:00' && !isToday) {
        const outerCon = document.getElementById('väder-con');
        const innerCon = document.createElement('div');
        const textDate = document.createElement('p');
        const image = document.createElement('img');
        const tempText = document.createElement('p');
        const descText = document.createElement('p');

        innerCon.setAttribute('id','weatherDays')
        textDate.textContent = formattedDate;
        image.setAttribute('src','https://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png');
        tempText.textContent = `${Math.ceil(data.main.temp_max)}/${Math.floor(data.main.temp_min)}°C`;
        descText.textContent = data.weather[0].description;

        outerCon.appendChild(innerCon);
        innerCon.appendChild(textDate);
        innerCon.appendChild(image);
        innerCon.appendChild(tempText);
        innerCon.appendChild(descText);
    }
}

fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=5iq2VaveeSRXdAg0WnW9QnUtQyQAWFRT')
    .then(res => res.json())
    .then(json => {
        json.results.books.forEach(data => {
            bestBooks(data);
        });
    });

const bestBooks = data => {
    const outerCon = document.getElementById('book-con');
    const innerCon = document.createElement('div');
    const rank = document.createElement('h2');
    const title_n_author = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('p');

    rank.textContent = data.rank;
    title.textContent = data.title;
    author.textContent = data.author;

    outerCon.appendChild(innerCon);
    innerCon.appendChild(rank);
    innerCon.appendChild(title_n_author);
    title_n_author.appendChild(title);
    title_n_author.appendChild(author);

    innerCon.setAttribute('class','book');
}