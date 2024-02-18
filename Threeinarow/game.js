let MyDiv = document.querySelector('#theGame');
let Minute,Sec;
let StartTimer;
let CheckBoxTimer;
let MyTime ='';
let MinuteShow ='';
let SecShow='';

const getGameFromAPI = async () => {
    // let response = await fetch('https://prog2700.onrender.com/threeinarow/sample');
    let response = await fetch('https://prog2700.onrender.com/threeinarow/random');
    CurrentResponse = await response.json();
    const InitialValues = JSON.parse(JSON.stringify(CurrentResponse.rows)) //create a deep copy of CurrentResponse.rows array
    const lengthOfData = CurrentResponse.rows.length; //its 6 right now
    createTable(lengthOfData);
    applyBasicState(CurrentResponse.rows); //like coloring,adding event listener to each cells
    addEventHandlerToCheckBtn(CurrentResponse.rows);
    addEventHandlerToRestartGame(CurrentResponse.rows);
    addEventListenertoChckBox(CurrentResponse.rows);
    addEventHandlerToReset(InitialValues);  
    Minute=0; //set counter for minute to 0
    Sec = 0;  //set counter for sect to 0
}


const TimerFunction = () =>{ //show counter in 00:00 format 
    Sec = (Sec + 1) % 60;
    Minute += Math.floor((Sec + 1) / 60);
    const padZero = (value) => (value < 10 ? '0' : '') + value;
    SecShow = padZero(Sec);
    MinuteShow = padZero(Minute);
    MyTime = `${MinuteShow}:${SecShow}`;
}


StartTimer = setInterval(   //run a timer when page loads
    TimerFunction, 1000);

//create Table in Html and insert it to our Div
const createTable = (length) => {
    let myRow = '<table>'
    for (let i = 0; i < length; i++) {
        myRow += '<tr>'
        for (let j = 0; j < length; j++) {
            myRow += `<td id="cell${i}${j}">&nbsp;</td>`
        }
        myRow += '</tr>'
    }
    myRow += '<caption>&nbsp;</caption>'
    let myCheckButton = '<div class=group-btn> <button class=btn>Check</button>'
    let myResetButton = '<button id="reset" class=btn>Reset</button>'
    let myRestartButton = '<button id="restart" class=btn>Restart</button>'
    let myCheckBox = '<div class=OurCheckBox><input type="checkbox" id="Checkbox">'
    myCheckBox += '<label for="Checkbox">Show Incorrect Squars</label></div></div>'
    MyDiv.innerHTML = myRow + '</table>' + myCheckButton + myResetButton + myRestartButton + myCheckBox
}

//apply color to the table based on current states, and add click event to all cells
//setting of each click, first click > blue, second > white , third > grey and also handle changing current state by each click
const applyBasicState = (rows) => {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows.length; j++) {
            let clickCount = 0;
            let cell = document.querySelector("#cell" + i + j);
            if (rows[i][j].currentState == 1) {
                cell.style.backgroundColor = "blue";
            } else if (rows[i][j].currentState == 2) {
                cell.style.backgroundColor = "white";
            }
            else if (rows[i][j].canToggle) {
                cell.addEventListener('click', () => {
                    clickCount++
                    // Toggle background color based on click count
                    if (clickCount % 3 === 0) {
                        cell.style.backgroundColor = 'grey';
                        rows[i][j].currentState = 0;
                    }
                    else if (clickCount % 3 === 2) {
                        cell.style.backgroundColor = 'white';
                        rows[i][j].currentState = 2;
                    }
                    else if (clickCount % 3 === 1) {
                        cell.style.backgroundColor = 'blue';
                        rows[i][j].currentState = 1;
                    }
                    CurrentResponse.rows = rows
                })
            }
        }
    }
}

//adding click event to check button and run check function
const addEventHandlerToCheckBtn = (rows) => { 
    document.querySelector('.btn').addEventListener('click', () => {checkFunction(rows)}
    )
}

const checkFunction = (rows) => { //determine horizontaly and vertically 3-in-row(by checking 2 attached pair in a row or column)
    let isValid = true;     //if for selected cells (grey cells are not selected cells) current state match with correct states
    let has3inRowHorizontal = false; //if we have 3-in-row horizontally 
    let has3inRowVertical = false; //if we have 3-in-row vertically
    let hasCompleted = true;        //if all cells are matched with correct states
    let caption = document.querySelector('caption');
    for (let i = 0; i < rows.length; i++) { //we do a loop after that, based on above boolean values we are gonna to show some messages to the user
        let numOfDupPairInRowHorz = 0;
        let numOfDupPairInRowVert = 0;
        for (let j = 0; j < rows.length; j++) {
            if (rows[i][j].currentState != 0 && (rows[i][j].currentState != rows[i][j].correctState)) {
                isValid = isValid && false;
            }

            if (rows[i][j].currentState != rows[i][j].correctState) {
                hasCompleted = hasCompleted && false
            }

            if (j < rows.length - 1) {
                //for checking horizontally 
                if (rows[i][j].currentState == rows[i][j + 1].currentState && rows[i][j + 1].currentState != 0) {
                    numOfDupPairInRowHorz++
                    if (numOfDupPairInRowHorz == 2) {
                        has3inRowHorizontal = true;
                    }
                }
                else {
                    numOfDupPairInRowHorz = 0;
                }
                //for checking vertically
                if (rows[j][i].currentState == rows[j + 1][i].currentState && rows[j + 1][i].currentState != 0) {
                    numOfDupPairInRowVert++;
                    if (numOfDupPairInRowVert == 2) {
                        has3inRowVertical = true;
                    }
                }
                else {
                    numOfDupPairInRowVert = 0;
                }
            }
        }
    }
    if (has3inRowHorizontal) {
        alert("you have 3-in-Row(Horizontally)")
    }
    else if (has3inRowVertical) {
        alert("you have 3-in-Row(Vertically)")
    }
    if (isValid&&!hasCompleted) {
        caption.innerText = 'So far so good ' + MyTime;
        caption.style.color = 'Green';
        setTimeout( ()=> {
            caption.innerHTML='&nbsp;'
        },5*1000)
    } else if (!isValid&&!hasCompleted) {
        caption.innerText = 'Something is wrong ' + MyTime;
        caption.style.color = 'red';
        setTimeout( ()=> {
            caption.innerHTML='&nbsp;'
        },5*1000)
    } else if  (hasCompleted) {
        document.querySelector('.btn').style.display = 'none' ; 
        document.querySelector('.OurCheckBox').style.display = 'none' ;
        caption.innerText = 'You did it!! ' + MyTime;
        caption.style.color = 'black';
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                if (rows[i][j].currentState == 1) {
                    let cell = document.querySelector("#cell" + i + j);
                    cell.style.backgroundColor = 'green';
                }
            }
        }
    }
}

const addEventHandlerToRestartGame = () => { //adding click event to Restart button and run handleRestartButtonClick function
    document.getElementById('restart').addEventListener('click', handleRestartButtonClick);
}

// Event handler for the restart button
const handleRestartButtonClick = () => {
    if (confirm("Are you sure? Your current puzzle will be lost!") == true) {
        Minute=0;
        Sec = 0;
        restartGame();
    }
};

const restartGame = async () => {
    clearInterval(CheckBoxTimer);
    MyDiv.innerHTML = ''; // Clear the existing content
    await getGameFromAPI(); // Re-fetch data and recreate the game
};

//adding click event to check box and run handleCheckBox function
const addEventListenertoChckBox = (rows) => { 
    let myCheck = document.getElementById('Checkbox');
    myCheck.addEventListener('change', () => (handleCheckBox(myCheck, rows)))
}

const handleCheckBox = (myCheck, rows) => {
    if (myCheck.checked) {
        CheckBoxTimer = setInterval( () => {
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                if (rows[i][j].correctState != rows[i][j].currentState && rows[i][j].currentState != 0) {
                    let cell = document.querySelector("#cell" + i + j);
                    cell.innerText = '!'
                } else {
                    let cell = document.querySelector("#cell" + i + j);
                    cell.innerText = ''
                }
            }
        }
    },30) }
    else {
        clearInterval(CheckBoxTimer);
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                let cell = document.querySelector("#cell" + i + j);
                cell.innerText = ''
            }
        }
    }

}

const addEventHandlerToReset = (rows) => {//adding click event to reset button and run handleResetButtonClick
    document.querySelector('#reset').addEventListener('click', () => handleResetButtonClick(rows));
}

const handleResetButtonClick = (rows) => {
    if (confirm("Are you sure? you are going back to initial states!") == true) {
        resetGame(rows);
        clearInterval(CheckBoxTimer);
    }
}

const resetGame = (rows) => {
    const InitialValues = JSON.parse(JSON.stringify(rows))
    const lengthOfData = rows.length; //its 6 right now
    MyDiv.innerHTML = '';
    createTable(lengthOfData);
    applyBasicState(rows);
    addEventHandlerToCheckBtn(rows);
    addEventHandlerToRestartGame(rows);
    addEventListenertoChckBox(rows);
    addEventHandlerToReset(InitialValues);
    Minute = 0;
    Sec = 0;
}

getGameFromAPI()


