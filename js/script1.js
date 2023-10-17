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
    const textBusNumber = document.createElement('p');
    const textBusDestination = document.createElement('p');
    const textBusTime = document.createElement('p');
    //const textNextBusTime = document.createElement('p');

    textBusNumber.textContent = data.LineNumber;
    textBusDestination.textContent = data.Destination;
    textBusTime.textContent = data.DisplayTime;
    //textNextBusTime.textContent = data.DisplayTime;

    busCon.style.display = 'flex';
    leftElem.style.display = 'flex';

    con.appendChild(busCon);
    busCon.appendChild(leftElem);
    leftElem.appendChild(textBusNumber);
    leftElem.appendChild(textBusDestination);
    busCon.appendChild(textBusTime);
    //busCon.appendChild(textNextBusTime);
};
//console.log(busArray)