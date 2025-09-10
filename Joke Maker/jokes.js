// Array of joke objects, each containing a setup and punchline
const jokes = [
    {
        setup: "Why don't scientists trust atoms?",
        punchline: "Because they make up everything!"
    },
    {
        setup: "What do you call a bear with no teeth?",
        punchline: "A gummy bear!"
    },
    {
        setup: "Why did the scarecrow win an award?",
        punchline: "Because he was outstanding in his field!"
    },
    {
        setup: "What do you call a fish wearing a bowtie?",
        punchline: "So-fish-ticated!"
    },
    {
        setup: "What do you call a can opener that doesn't work?",
        punchline: "A can't opener!"
    },
    {
        setup: "Why did the math book look so sad?",
        punchline: "Because it had too many problems!"
    },
    {
        setup: "What do you call a fake noodle?",
        punchline: "An impasta!"
    },
    {
        setup: "Why did the cookie go to the doctor?",
        punchline: "Because it was feeling crumbly!"
    }
];

// Keep track of the current joke being displayed
let currentJokeIndex = 0;

// Function to display a new random joke
function tellJoke() {
    // Get references to the HTML elements we need to update
    const setupText = document.getElementById('setupText');
    const punchlineText = document.getElementById('punchlineText');
    const punchlineButton = document.getElementById('showPunchline');
    
    // Choose a random joke from our array
    currentJokeIndex = Math.floor(Math.random() * jokes.length);
    // Display the setup text
    setupText.textContent = jokes[currentJokeIndex].setup;
    // Clear any existing punchline
    punchlineText.textContent = "";
    // Make sure the punchline button is visible
    punchlineButton.style.display = "block";
}

// Function to reveal the punchline of the current joke
function showPunchline() {
    // Get references to the HTML elements we need to update
    const punchlineText = document.getElementById('punchlineText');
    const punchlineButton = document.getElementById('showPunchline');
    
    // Display the punchline text
    punchlineText.textContent = jokes[currentJokeIndex].punchline;
    // Hide the punchline button since we don't need it anymore
    punchlineButton.style.display = "none";
}

// Show the first joke when the page loads
tellJoke(); 