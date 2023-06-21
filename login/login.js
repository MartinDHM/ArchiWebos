function login() {
    // On récupère les données à envoyer
    const loginForm = document.querySelector(".login-in");
    const error = document.querySelector(".error")
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const logData = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=motdepasse]").value
        }
        console.log(logData)
    })
}