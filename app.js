// imports
const express = require("express");
const useragent = require("useragent");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 8000;

// Static Files
app.use(express.static("public"));
app.use("/dist", express.static(__dirname + "public/dist"));
app.use("/js", express.static(__dirname + "public/js"));
app.use('/img', express.static(__dirname + 'public/img'))

// Set Views | Templating Engine
app.use(expressLayouts);
app.set("layout", "./page/home");
app.set("view engine", "ejs");

// Navigation | Route
app.get("", (req, res) => {
	res.render("index", { title: "Home" });
});

// Listen on port 8000
const server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
const io = require("socket.io")(server);

// Initialize titles
const titles = {
  "0": { votes: 0, label: "Friends", color: randomRGB() },
  "1": { votes: 0, label: "The Good Doctor", color: randomRGB() },
  "2": { votes: 0, label: "Modern Family", color: randomRGB() },
  "3": { votes: 0, label: "You", color: randomRGB() },
  "4": { votes: 0, label: "Brooklyn Nine-Nine", color: randomRGB() },
  "5": { votes: 0, label: "How to Get Away with Murder", color: randomRGB() },
  "6": { votes: 0, label: "iZombie", color: randomRGB() },
  "7": { votes: 0, label: "The 100", color: randomRGB() },
  "8": { votes: 0, label: "The Big Bang Theory", color: randomRGB() },
  "9": { votes: 0, label: "Altered Carbon", color: randomRGB() },
  "10": { votes: 0, label: "New Girl", color: randomRGB() },
  "11": { votes: 0, label: "How I Met Your Mother", color: randomRGB() },
  "12": { votes: 0, label: "Prison Break", color: randomRGB() },
  "13": { votes: 0, label: "Money Heist", color: randomRGB() },
  "14": { votes: 0, label: "The Office", color: randomRGB() },
  "15": { votes: 0, label: "Jane The Virgin", color: randomRGB() },
  "16": { votes: 0, label: "Breaking Bad", color: randomRGB() },
  "17": { votes: 0, label: "Girl From Nowhere", color: randomRGB() },
  "18": { votes: 0, label: "(Others)", color: randomRGB() }
};

// All of the users
const users = {};

// Cool down in milliseconds
const coolDown = 5000;

// The magic number
const magicNumber = 2538388384783926389;

// On new client connection
io.on("connection", (socket) => {
    io.emit("update", titles);

    // Parse the user agent string
    const userAgent = useragent.parse(socket.handshake.headers["user-agent"]);

    // The users IP address
    const address = socket.handshake.address;

    // Make the handle
    const id = hash(userAgent.os.toString() + userAgent.device.toString() + magicNumber);
    const handled = hash(id + address + magicNumber);

    // On new vote
    socket.on("vote", (index) => {

        // Check if the user is allowed to vote
        if (typeof users[handled] === "undefined" || typeof users[handled] !== "undefined" && users[handled] + coolDown <= Date.now()) {
            // Increase the vote at index
            if (titles[index]) {
                titles[index].votes += 1;
            }

            // Show the titles in the console for testing
            console.log(titles);

            // Tell everybody else about the new vote
            io.emit("update", titles);

            // Set the timestamp
            users[handled] = Date.now();
        }

    });
});

// Generate a random RGB color
function randomRGB() {
  const r = () => Math.random() * 256 >> 0;
  return `rgb(${r()}, ${r()}, ${r()})`;
}

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hash(s) {
  return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}

// npm install ejs express express-ejs-layouts
// npm start
