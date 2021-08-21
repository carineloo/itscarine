// // Option 3 - Smooth Scroll - https://github.com/cferdinandi/smooth-scroll
//  const scroll = new SmoothScroll('.navbar a[href*="#"]', {
// 	speed: 500
// });

const heroContainer = document.querySelector(".hero-container");
const heroContent = document.querySelector(".hero-content");
const navLogo = document.querySelector(".nav-logo");
const sideNav = document.querySelector(".sidenav");

const tl = new TimelineMax();

tl
	.fromTo(
		heroContainer,
		1.2,
		{ y: "-100%" },
		{ y: "0%", ease: Power2.easeInOut },
		"-=1.2"
	)
	.fromTo(
		heroContent,
		0.5,
		{ opacity: 0, y: -60 },
		{ opacity: 1, y: 0 },
		"-=0.5"
	)
	.fromTo(navLogo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
	.fromTo(sideNav, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");

//contact form
window.addEventListener("DOMContentLoaded", function () {
	// get the form elements defined in your form HTML above

	var form = document.getElementById("my-form");
	// var button = document.getElementById("my-form-button");
	var status = document.getElementById("status");

	// Success and Error functions for after the form is submitted
	function success() {
		form.reset();
		status.classList.add("success");
		status.innerHTML = "Submission Sent!";
	}

	function error() {
		status.classList.add("error");
		status.innerHTML = "Oops! There was a problem.";
	}

	// handle the form submission event

	form.addEventListener("submit", function (ev) {
		ev.preventDefault();
		var data = new FormData(form);
		ajax(form.method, form.action, data, success, error);
	});
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== XMLHttpRequest.DONE) return;
		if (xhr.status === 200) {
			success(xhr.response, xhr.responseType);
		} else {
			error(xhr.status, xhr.response, xhr.responseType);
		}
	};
	xhr.send(data);
}
