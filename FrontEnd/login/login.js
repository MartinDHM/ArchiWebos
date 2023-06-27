async function login() {
  try {
    // On récupère les données à envoyer
    const loginForm = document.querySelector(".login-in");
    const error = document.querySelector(".error");
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const logData = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=motdepasse]").value,
      };
      try {
        const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logData),
        });

        // On vérifie si la requête a réussi avec les conditions
        if (response.ok) {
          const token = await response.json();
          // On stocke le token récupéré dans le sessionStorage
          sessionStorage.setItem("token", JSON.stringify(token));
          // On redirige vers la page d'accueil
          window.location.href = "../index.html";
        } else {
          // Affiche un message d'erreur en cas d'échec
          error.textContent = "Nom d'utilisateur ou mot de passe incorrect";
        }
      } catch (error) {
        // En cas de problème connexion serveur
        alert("Problème de connexion au serveur");
      }
    });
  } catch (error) {
    console.error(error);
  }
}

login();
