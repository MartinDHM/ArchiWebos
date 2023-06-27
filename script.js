
let worksData, categoriesData;

/* recupération des données de l'Api */
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    worksData = data;
    afficherGallery(data);
    console.log(data[0]);
    return fetch('http://localhost:5678/api/categories');
  })
  .then(response => response.json())
  .then(category => {
    categoriesData = category;
    filters(category);
    console.log(category[0]);
  })
 

/* fonction qui permet affiche la gallery */
function afficherGallery(data){
  for(i =0 ; i < data.length ; i++)
  {
    const gallery = document.querySelector('.gallery');

    const figures  = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = data[i].imageUrl;

    const nomElement = document.createElement("p");
    nomElement.innerText = data[i].title;

    gallery.appendChild(figures);
    figures.appendChild(imageElement);
    figures.appendChild(nomElement);
  }
}
/* fonction qui affiche les filtres */
function filters (category){
  category.unshift({ name: "Tous" });

  for(i = 0; i < category.length; i++)
  {
    const filterbtn = document.querySelector(".filtersBtn");
    const filter = document.createElement("button");
    filter.innerText = category[i].name;

    filterbtn.appendChild(filter);
  }

  /* Ajout des evenements sur les filtres */
  const filterBtnEvent = document.querySelectorAll(".filtersBtn button");

  filterBtnEvent.forEach(button => {
    button.addEventListener("click", function() {
      // Efface le contenu de la galerie
      document.querySelector(".gallery").innerHTML = '';

      // Filtrage des projets en fonction de la catégorie sélectionnée
      let filteredData = worksData.filter((item) => {
        return item.category.name === button.textContent || button.textContent === "Tous";
      });

      console.log(filteredData);

      // Utilisation des projets filtrés pour afficher la galerie mise à jour
      afficherGallery(filteredData);
    });
  });

  // fonction pour savoir si l'utilisateur est connecter ou non
  function checkConnection() {
    // Récupération du token depuis le sessionStorage
    const token = sessionStorage.getItem("token");
    // Ajout du bouton deconnexion
    const logoutBtn = document.querySelector(".logoutBtn");
    const loginIn = document.querySelector(".loginIn");

    if (token) {
      // Connecté
      console.log("Connecté");
      
      // Appeler les fonctions ou effectuer les actions appropriées pour l'utilisateur connecté
      logoutBtn.style.display = "block";
      loginIn.style.display = "none";

      logoutBtn.addEventListener("click", function() {
        // Retirer le token du sessionStorage
        sessionStorage.removeItem("token");
        console.log("Déconnexion réussie");
  
      });
      

    } else {
      // Non connecté
      console.log("Non connecté");
      
  
      // Appeler les fonctions ou effectuer les actions appropriées pour l'utilisateur non connecté
    }
  }
  checkConnection();
}
  
  

