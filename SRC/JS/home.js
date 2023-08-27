// Verificar se o usuário está logado (exemplo usando localStorage)
var isUserLoggedIn = localStorage.getItem("LoggedUser") !== null;

// Selecionar os elementos relevantes
var userControls = document.getElementById("userControls");
var userButton = document.getElementById("userButton");

// Atualizar o botão e o redirecionamento com base no status de login
if (isUserLoggedIn) {
	userButton.textContent = "Perfil";
	userButton.addEventListener("click", function () {
		window.location.href = "./profile.html";
	});
} else {
	userButton.textContent = "Login";
	userButton.addEventListener("click", function () {
		window.location.href = "./login.html";
	});
}

// Exibir os controles de usuário após atualização
userControls.style.display = "block";
