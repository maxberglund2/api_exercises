const workDates = [];
const findDaysInWeek = () => {
    const now = new Date();
    const currentDay = now.getDay();

    const daysToAddMonday = 1 - currentDay;
    const mondayDate = now.getDate() + daysToAddMonday;
    for (let x = 0;x<5;x++) {
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const date = (x + mondayDate).toString().padStart(2, '0');
        workDates.push(`${year}-${month}-${date}`);
    }
}

findDaysInWeek()


let allLessons = [];
fetch('https://www.googleapis.com/calendar/v3/calendars/c_d9aaaa6aa5b776b23b57ec82ab49a0b39b34177b8390aa055f926d10033e3648@group.calendar.google.com/events?key=AIzaSyDrTln-fZ60Q2ja7yix7YMs4s7T2csxinc')
    .then(res => res.json())
    .then(json => {
        json.items.forEach(data => {
            putIntoArray(data);
        })
        allLessons.sort((a, b) => {
            const dateA = new Date(a.split(';')[3]);
            const dateB = new Date(b.split(';')[3]);
            return dateA - dateB;
        });
        lessonCards();
    });

    const putIntoArray = data => {
        if (data.start.dateTime && data.end.dateTime) {
            const startTime = data.start.dateTime.split('T');
            const endTime = data.end.dateTime.split('T');
            if (workDates.includes(startTime[0])) {
                allLessons.push(`${startTime[1].split('+')[0].slice(0,5)};${endTime[1].split('+')[0].slice(0,5)};${data.summary};${startTime[0]}`);
                // startTime;endTime;summary;Date
                allLessons.sort();
            }
        }
    }
    

const lessonCards = () => {
    const assignDiv = {
        1 : 'monDiv',
        2 : 'tueDiv',
        3 : 'wedDiv',
        4 : 'thuDiv',
        5 : 'friDiv'
    }
    
    allLessons.forEach((item) => {
        const now = new Date(item.split(';')[3]);
        const outerCon = document.getElementById(assignDiv[now.getDay()]);
        const innerCon = document.createElement('div');
        const lessonNmae = document.createElement('p');
        const lessonTime = document.createElement('p');
    
        lessonNmae.textContent = item.split(';')[2];
        lessonTime.textContent = `${item.split(';')[0]} - ${item.split(';')[1]}`;
        innerCon.setAttribute('class', 'lessonDiv')
    
        outerCon.appendChild(innerCon);
        innerCon.appendChild(lessonNmae);
        innerCon.appendChild(lessonTime);
    })
}