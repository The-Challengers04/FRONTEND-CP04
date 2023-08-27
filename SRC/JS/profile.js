const profileForm = document.getElementById("profileForm");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const editBtn = document.querySelector(".edit-btn");
const saveBtn = document.querySelector(".save-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const logoutBtn = document.querySelector(".logout-btn");

const userList = JSON.parse(localStorage.getItem("UserList"));
const user = JSON.parse(localStorage.getItem("LoggedUser"));

console.log(user);

if (!user) {
	window.location.href = "./login.html";
} else {
	nameInput.value = user.name;
	lastNameInput.value = user.lastName;
	emailInput.value = user.email;
	passwordInput.value = user.password;

	function toggleEditMode(isEditing) {
		nameInput.readOnly = !isEditing;
		lastNameInput.readOnly = !isEditing;
		emailInput.readOnly = !isEditing;
		passwordInput.readOnly = !isEditing;

		if (isEditing) {
			profileForm.classList.add("edit-mode");
			saveBtn.style.display = "inline-block";
			cancelBtn.style.display = "inline-block";
			editBtn.style.display = "none";
		} else {
			profileForm.classList.remove("edit-mode");
			saveBtn.style.display = "none";
			cancelBtn.style.display = "none";
			editBtn.style.display = "inline-block";
		}
	}

	editBtn.addEventListener("click", function () {
		toggleEditMode(true);
	});

	cancelBtn.addEventListener("click", function () {
		nameInput.value = user.name;
		lastNameInput.value = user.lastName;
		emailInput.value = user.email;
		passwordInput.value = user.password;

		toggleEditMode(false);
	});

	saveBtn.addEventListener("click", function () {
		user.name = nameInput.value;
		user.lastName = lastNameInput.value;
		user.email = emailInput.value;
		user.password = passwordInput.value;

		const userIndex = userList.findIndex((u) => u.id === user.id);
		userList[userIndex] = user;
		console.log(userList);
		localStorage.setItem("UserList", JSON.stringify(userList));

		localStorage.setItem("LoggedUser", JSON.stringify(user));
		toggleEditMode(false);
	});

	logoutBtn.addEventListener("click", function () {
		localStorage.removeItem("LoggedUser");
		window.location.href = "./login.html";
	});
}
