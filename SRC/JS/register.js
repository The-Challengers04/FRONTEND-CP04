var form = document.querySelector("form");

const name = document.querySelector("#name");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

name.feedBack = document.querySelector("#nameFeedback");
lastName.feedBack = document.querySelector("#lastNameFeedback");
email.feedBack = document.querySelector("#emailFeedback");
password.feedBack = document.querySelector("#passwordFeedback");
confirmPassword.feedBack = document.querySelector("#confirmPasswordFeedback");

password.eyeIcon = document.querySelector("#eyeIconPassword");
confirmPassword.eyeIcon = document.querySelector("#eyeIconConfirmPassword");

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

confirmPassword.eyeIcon.addEventListener("click", () => {
	if (confirmPassword.type === "password") {
		confirmPassword.type = "text";
		confirmPassword.eyeIcon.classList.remove("fa-eye");
		confirmPassword.eyeIcon.classList.add("fa-eye-slash");
	} else {
		confirmPassword.type = "password";
		confirmPassword.eyeIcon.classList.remove("fa-eye-slash");
		confirmPassword.eyeIcon.classList.add("fa-eye");
	}
});

function isValidEmail(email) {
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(email);
}

form.addEventListener("submit", (event) => {
	let formIsValid = true;
	event.preventDefault();

	if (name.value === "") {
		name.feedBack.textContent = "O nome não pode ser vazio.";
		name.classList.add("is-invalid");
		formIsValid = false;
	}
	if (lastName.value === "") {
		lastName.feedBack.textContent = "O sobrenome não pode ser vazio.";
		lastName.classList.add("is-invalid");
		formIsValid = false;
	}
	if (email.value === "") {
		email.feedBack.textContent = "O email não pode ser vazio.";
		email.classList.add("is-invalid");
		formIsValid = false;
	} else if (!isValidEmail(email.value)) {
		email.feedBack.textContent = "O email não é válido.";
		email.classList.add("is-invalid");
		formIsValid = false;
	} else if (
		!!JSON.parse(localStorage.getItem("UserList")) &&
		JSON.parse(localStorage.getItem("UserList")).some(
			(user) => user.email === email.value
		)
	) {
		email.feedBack.textContent = "O email já está sendo usado.";
		email.classList.add("is-invalid");
		formIsValid = false;
	}
	if (password.value === "") {
		password.feedBack.textContent = "A senha não pode ser vazia.";
		password.classList.add("is-invalid");
		formIsValid = false;
	} else if (password.value.length < 8) {
		password.feedBack.textContent = "A senha deve ter no mínimo 8 caracteres.";
		password.classList.add("is-invalid");
		formIsValid = false;
	}
	if (password.value !== confirmPassword.value) {
		confirmPassword.feedBack.textContent = "As senhas não coincidem.";
		confirmPassword.classList.add("is-invalid");
		formIsValid = false;
	}

	if (formIsValid) {
		console.log("Forms Valido");

		const user = {
			name: name.value,
			lastName: lastName.value,
			email: email.value,
			password: password.value,
		};
		let userList = JSON.parse(localStorage.getItem("UserList")) || [];
		if (userList.length > 0) {
			const lastId = userList[userList.length - 1].id;
			user.id = lastId + 1;
		} else {
			user.id = 1;
		}

		userList.push(user);
		localStorage.setItem("UserList", JSON.stringify(userList));
		window.location.href = "./login.html";
	}
});

// Retirar o is-invalid quando o usuario começar a digitar no input
function addEventToRemoveIsInvalidFromInput(event) {
	event.addEventListener("input", () => {
		event.classList.remove("is-invalid");
	});
}
addEventToRemoveIsInvalidFromInput(name);
addEventToRemoveIsInvalidFromInput(lastName);
addEventToRemoveIsInvalidFromInput(email);
addEventToRemoveIsInvalidFromInput(password);
addEventToRemoveIsInvalidFromInput(confirmPassword);
