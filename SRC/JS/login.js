"use strict";

function isValidEmail(email) {
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(email);
}

function addEventToRemoveIsInvalidFromInput(event) {
	event.addEventListener("input", () => {
		event.classList.remove("is-invalid");
	});
}

const email = document.querySelector("#email");
const password = document.querySelector("#password");

email.feedback = document.querySelector("#emailFeedback");
password.feedback = document.querySelector("#passwordFeedback");

password.eyeIcon = document.querySelector("#eyeIconPassword");

const form = document.querySelector("form");

password.eyeIcon.addEventListener("click", () => {
	if (password.type === "password") {
		password.type = "text";
		password.eyeIcon.classList.remove("fa-eye");
		password.eyeIcon.classList.add("fa-eye-slash");
	} else {
		password.type = "password";
		password.eyeIcon.classList.remove("fa-eye-slash");
		password.eyeIcon.classList.add("fa-eye");
	}
});

addEventToRemoveIsInvalidFromInput(email);
addEventToRemoveIsInvalidFromInput(password);

form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (!isValidEmail(email.value)) {
		email.feedback.textContent = "Invalid email";
		email.classList.add("is-invalid");
		return;
	}
	const userList = JSON.parse(localStorage.getItem("UserList")) || [];
	const user = userList.find((user) => user.email === email.value);
	if (user) {
		if (user.password === password.value) {
			localStorage.setItem("LoggedUser", JSON.stringify(user));
			location.href = "home.html";
		} else {
			password.feedback.textContent = "Wrong password";
			password.classList.add("is-invalid");
		}
	} else {
		email.feedback.textContent = "User not found";
		email.classList.add("is-invalid");
	}
});
