
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


  // fonction pour savoir si l'utilisateur est connecté ou non et les modification sur la page
function checkConnection() {
  
  // Récupération du token depuis le sessionStorage
  const token = sessionStorage.getItem("token");
  
  // Ajout des élement a modifié lors de la connexion
  const logoutBtn = document.querySelector(".logoutBtn");
  const loginIn = document.querySelector(".loginIn");
  const modif = document.querySelectorAll(".modif");
  const iconModif = document.querySelectorAll(".iconModif");
  const modificationIcon = document.querySelectorAll(".iconModification");
  const edition = document.querySelector(".Edition")
  const editionMode = document.createElement("button")
  editionMode.className = "editionBtn"
  editionMode.innerText = "Mode Edition"
  const publier = document.createElement("button")
  publier.className = "publierBtn"
  publier.innerText = "publier les changements"

  if (token) {
    // Connecté
    console.log("Connecté");

    // Appeler les fonctions ou effectuer les actions appropriées pour l'utilisateur connecté
    
    // Mode edition
    edition.style.display = "flex";
    edition.style.justifyContent = "center";
    edition.style.alignItems = "center";
    edition.appendChild(editionMode)
    edition.appendChild(publier)
    modificationIcon.forEach((element) => {
      element.className = "fa-solid fa-pen-to-square";
    });
    
    logoutBtn.style.display = "block";
    loginIn.style.display = "none";
    modif.forEach((element) => {
      element.innerHTML = "modifier";
    });
    iconModif.forEach((element) => {
      element.className = "fa-regular fa-pen-to-square";
    });


    logoutBtn.addEventListener("click", function() {
      // Retirer le token du sessionStorage
      sessionStorage.removeItem("token");
      console.log("Déconnexion réussie");
    });
  } else {
    // Non connecté
    console.log("Non connecté");

    
  }
}

checkConnection();

} 

  

