// Create the canvas
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "bg.png";

// Bug image
let bugReady = false;
let bugImage = new Image();
bugImage.onload = function () {
    bugReady = true;
    // Call the main function after the bug image has loaded
    main();
};
bugImage.src = "bug.png";

// Game objects
let hero = {
    speed: 100, // Initial speed for the bug
    x: 0,
    y: 0
};
let bug = {
    x: 0,
    y: 0
};
let score = 0;
let interval = 2000; // Initial interval for bug hopping (milliseconds)
let bugHoppingInterval;

// Bug hopping function
function hopBug() {
    bug.x = 32 + Math.random() * (canvas.width - 64);
    bug.y = 32 + Math.random() * (canvas.height - 64);
}

// Handle mouse click to catch the bug
canvas.addEventListener("click", function(event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    if (bugReady && mouseX >= bug.x && mouseX <= bug.x + bugImage.width && mouseY >= bug.y && mouseY <= bug.y + bugImage.height) {
        score++;
        clearInterval(bugHoppingInterval);
        hero.speed += 5; // Increase bug speed by 5 units
        hopBug(); // Move the bug to a new position
        startBugHopping(); // Start bug hopping with the new interval
    }
});

// Reset speed button event listener
document.getElementById("resetSpeedBtn").addEventListener("click", function() {
    clearInterval(bugHoppingInterval);
    hero.speed = 100; // Reset bug speed to the original value
    interval = 5000; // Reset interval to the initial value
    startBugHopping();
});

// Reset score button event listener
document.getElementById("resetScoreBtn").addEventListener("click", function() {
    score = 0;
    clearInterval(bugHoppingInterval);
    hero.speed = 100; // Reset bug speed to the original value
    interval =52000; // Reset interval to the initial value
    startBugHopping();
});

// Update game objects
function update(modifier) {
    // No need to update anything in this simple game
}

// Draw everything
function render() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Bugs Smashed: " + score, 32, 32);

    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }
}

// The main game loop
function main() {
    hopBug(); // Place bug initially
    setInterval(function() {
        render();
    }, 25); // Approximate 60 FPS rendering
    startBugHopping(); // Start bug hopping with the initial interval
}

// Start bug hopping
function startBugHopping() {
    bugHoppingInterval = setInterval(hopBug, interval);
}

// Start the game
main(); // Start the game loop
