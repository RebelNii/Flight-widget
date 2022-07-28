const tableBody = document.getElementById("table-body");

let flights = [
  {
    time: "9:00",
    destination: "LONDON",
    flight: "BX 16",
    gate: "D12",
    remarks: "CANCELLED",
  },
  {
    time: "10:30",
    destination: "BARCELONA",
    flight: "AS 5",
    gate: "W 45",
    remarks: "ON TIME",
  },
  {
    time: "11:40",
    destination: "TOKYO",
    flight: "XV 1",
    gate: "N12",
    remarks: "ON TIME",
  },
  {
    time: "13:34",
    destination: "PARIS",
    flight: "LP 90",
    gate: "V 9",
    remarks: "CANCELLED",
  },
  {
    time: "15:50",
    destination: "MOSCOW",
    flight: "K 16",
    gate: "KL 8",
    remarks: "DELAYED",
  },
];

const destination = ['BERLIN','MADRID','DUBAI','ACCRA','LAGOS','MILAN','BRUGGE'];
const remarks = ['ON TIME', 'DELAYED','CANCELLED'];
let hour = 15;

//function to populate table
function tableData() {
  for (const flight of flights) {
    //for each data from flights we create a tr
    const tableRow = document.createElement("tr");

    //now we loop through flight to get data
    for (const flightData in flight) {
      //now we create td
      const tableData = document.createElement("td");
      //we assign td with data
      //tableData.innerText = flight[flightData]

      //we split td into divs since we want to add flip animation
      const words = Array.from(flight[flightData]);

      for (const [index, letter] of words.entries()) {
        const letterElement = document.createElement("div");

        setTimeout(() => {
          letterElement.classList.add("flip"); //add class
          letterElement.innerText = letter;
          tableData.appendChild(letterElement);
        }, 100 * index);

        
      }

      //now we append tableData
      tableRow.appendChild(tableData);
    }

    tableBody.append(tableRow);
  }
};

tableData();


function generateLetter(){
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabets.charAt(Math.floor(Math.random() * alphabets.length))
}

function generateNumber(limit){
    const numbers = '1234567890';
    if(limit){
        const newLimit = numbers.slice(0,limit + 1);
        return newLimit.charAt(Math.floor(Math.random() * newLimit.length))
    }
    return numbers.charAt(Math.floor(Math.random() * numbers.length))
}

function generateTime(){
    let display = hour

    if(hour < 24){
        hour++
    }

    if(hour >= 24){
        hour = 1
        display = hour
    }

    if(hour < 10){
        display = '0' + hour  
    }

    return display + ':' + generateNumber(5) + generateNumber()
}

function shuffle(){
    flights.shift();//take first element
    flights.push({
        time: generateTime(),
        destination: destination[Math.floor(Math.random() * destination.length)],
        flight: generateLetter() + generateLetter() + '' + generateNumber(),
        gate: generateLetter() + '' + generateNumber() + generateNumber(),
        remarks: remarks[Math.floor(Math.random() * remarks.length)]
    });

    tableBody.textContent = '';
    tableData()
}

setInterval(shuffle,2000)


