// // Option 3 - Smooth Scroll - https://github.com/cferdinandi/smooth-scroll
//  const scroll = new SmoothScroll('.navbar a[href*="#"]', {
// 	speed: 500
// });

// Initialize the canvas
const ctx = document.getElementById("voteChart").getContext("2d");

// Initialize the chart
const chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Titles"],
        active: true
    },
    options: {
      title: {
        display: true,
        text: 'No. of Votes'
      },
      scales : {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: false
      },
      animations: {
        tension: {
          duration: 4000,
          easing: 'linear'
        }
      }
    }
});

// Connect to the server it's (Here you want to change the port if you changed it in the server)
const socket = io("localhost:8000");

// On new vote update the chart
socket.on("update", (titles) => {

  // Convert the titles object into an array
  titles = Object.entries(titles);

  // For each title
  for (const [key, title] of titles) {

    // Update the vote if the title already exists if not create a new title and then update the vote
    if(typeof chart.data.datasets[key] == "undefined" && chart.data.datasets.length < titles.length ) {
      chart.data.datasets.push({
            backgroundColor: title.color,
            borderColor: title.color,
            data: [title.votes],
            label: title.label
        });
    } else if(typeof chart.data.datasets[key] != "undefined") {
      chart.data.datasets[key].data = [title.votes];
    }
  }
  // Update the chart
  chart.update();
});
  // Make a new vote (Remember this is not a safe way to do this)
  function vote(index) {
    socket.emit("vote", index);
  }