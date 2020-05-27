/* Door references from the html document */
let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");

/* Start button */
const startButton = document.getElementById("start");

/* Images for the doors */
let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";

/* To keep track of clicked doors */
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

/* The function randomChoreDoorGenerator randomly assigns an image to each of them */
let openDoor1;
let openDoor2;
let openDoor3;

/* The game keeps going as long as it's true */
let currentlyPlaying = true;

/* To check if the image behind the door is the dreaded bot! */
let isBot = (door) => {
    if (door.src === botDoorPath) {
        return true;
    } else { return false; }
}

/* Has been the door already clicked? (Avoids cheats) */
let isClicked = (door) => {
    if (door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }
}

/* Checks if the game is over */
let playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver("win");
    } else if (isBot(door)) {
        gameOver("lose");
    }
}

/* Doors present in the game */
let numClosedDoors = 3;

/* Function to generate where the bot is hiding */
let randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor(Math.random() * numClosedDoors);
    console.log("bot on door " + choreDoor);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor2 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else {
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
    }
}

/* Event handler to open the 1st door */
doorImage1.onclick = () => {
    if (!isClicked(doorImage1) && (currentlyPlaying)) {           // security condition
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
}

/* Event handler to open the 2nd door */
doorImage2.onclick = () => {
    if (!isClicked(doorImage2) && (currentlyPlaying)) {           // security condition
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
}

/* Event handler to open the 3rd door */
doorImage3.onclick = () => {
    if (!isClicked(doorImage3) && (currentlyPlaying)) {           // security condition
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
}

/* Clicking the start button starts a new game */
startButton.onclick = () => {
    if (!currentlyPlaying) {
        startRound();
    }
}

/* Starts a new round, resetting images and variables */
let startRound = () => {
    numClosedDoors = 3;
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    startButton.innerHTML = "Good luck!";
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

/* Game over function */
let gameOver = (status) => {
    (status === "win") ?
        startButton.innerHTML = "You win! Play again?" : startButton.innerHTML = "Game over! Play again?";
    currentlyPlaying = false;
}

/* Starts the game */
startRound();