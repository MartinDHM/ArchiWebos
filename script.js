let worksData, categoriesData;

/* Récupération des données de l'API */
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
  });

/* Fonction qui permet d'afficher la galerie */
function afficherGallery(data) {
  const gallery = document.querySelector('.gallery');

  for (let i = 0; i < data.length; i++) {
    const figure = document.createElement("figure");
    figure.id = `image-${data[i].id}`;

    const imageElement = document.createElement("img");
    imageElement.src = data[i].imageUrl;

    const nomElement = document.createElement("p");
    nomElement.innerText = data[i].title;

    figure.appendChild(imageElement);
    figure.appendChild(nomElement);
    gallery.appendChild(figure);
  }
}

/* Fonction qui affiche les filtres */
function filters(category) {
  category.unshift({ name: "Tous" });

  const filterBtn = document.querySelector(".filtersBtn");

  for (let i = 0; i < category.length; i++) {
    const filter = document.createElement("button");
    filter.innerText = category[i].name;
    filterBtn.appendChild(filter);
  }

  /* Ajout des événements sur les filtres */
  const filterBtnEvent = document.querySelectorAll(".filtersBtn button");

  filterBtnEvent.forEach(button => {
    button.addEventListener("click", function () {
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
}

// Fonction pour savoir si l'utilisateur est connecté ou non et effectuer les modifications sur la page
function checkConnection() {
  // Récupération du token depuis le sessionStorage
  const token = sessionStorage.getItem("token");

  // Ajout des éléments à modifier lors de la connexion
  const logoutBtn = document.querySelector(".logoutBtn");
  const loginIn = document.querySelector(".loginIn");
  const modif = document.querySelectorAll(".modif");
  const modif1 = document.querySelector(".modif1");
  const iconModif = document.querySelectorAll(".iconModif");
  const modificationIcon = document.querySelectorAll(".iconModification");
  const edition = document.querySelector(".Edition");
  const editionMode = document.createElement("button");
  editionMode.className = "editionBtn";
  editionMode.innerText = "Mode Edition";
  const publier = document.createElement("button");
  publier.className = "publierBtn";
  publier.innerText = "Publier les changements";

  if (token) {
    // Connecté
    console.log("Connecté");

    // Appeler les fonctions ou effectuer les actions appropriées pour l'utilisateur connecté

    // Mode édition
    edition.style.display = "flex";
    edition.style.justifyContent = "center";
    edition.style.alignItems = "center";
    edition.appendChild(editionMode);
    edition.appendChild(publier);
    modificationIcon.forEach((element) => {
      element.className = "fas fa-pen-square";
    });

    logoutBtn.style.display = "block";
    loginIn.style.display = "none";
    modif.forEach((element) => {
      element.innerHTML = "modifier";
    });
    iconModif.forEach((element) => {
      element.className = "fa-regular fa-pen-to-square";
    });
    modif1.innerHTML = "modifier";

    logoutBtn.addEventListener("click", function () {
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

const modalWrapper = document.querySelector(".modal-wrapper");
const openModalLink = document.querySelector(".modif1");
let galleryAdded = false; // Variable pour suivre l'état de la galerie
let cross = null; // Variable pour stocker la référence à la croix

// Lorsque l'on appuie sur le bouton "modifier", on affiche le modal
openModalLink.addEventListener("click", () => {
  if (!galleryAdded) { // Vérifier si la galerie n'a pas déjà été ajoutée

    cross = document.createElement("i");
    cross.className = "cross fas fa-times";

    cross.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêcher la propagation de l'événement de clic

      const closeModalLink = document.getElementById('modalId');
      closeModalLink.classList.add("modalVisibility");
    });

    const modalAddTitle = document.createElement("h3");
    modalAddTitle.textContent = "Galerie photo";
    const modalPhotoCtn = document.createElement("div");
    modalPhotoCtn.classList.add("photo-ctn");
    const modalBorder = document.createElement("div");
    modalBorder.classList.add("border");
    const modalAddButton = document.createElement("button");
    modalAddButton.classList.add("addButton");
    modalAddButton.textContent = "Ajouter une photo";
    const modalRemoveButton = document.createElement("button");
    modalRemoveButton.classList.add("removeButton");
    modalRemoveButton.textContent = "Supprimer la galerie";

    modalWrapper.appendChild(cross);
    modalWrapper.appendChild(modalAddTitle);
    modalWrapper.appendChild(modalPhotoCtn);
    modalWrapper.appendChild(modalBorder);
    modalWrapper.appendChild(modalAddButton);
    modalWrapper.appendChild(modalRemoveButton);

    // Ajouter les "works" dans la galerie du modal
    for (let i = 0; i < worksData.length; i++) {
      const modalPhoto = document.createElement("div");
      modalPhoto.classList.add("modal-photo");

      const modalPhotoImage = document.createElement("img");
      modalPhotoImage.src = worksData[i].imageUrl;
      modalPhotoImage.classList.add("modal-image");

      const modalTrashIcon = document.createElement("i"); // Nouvel élément pour l'icône de corbeille
      modalTrashIcon.classList.add("modal-trash-icon"); // Ajoutez une classe pour styliser l'icône
      modalTrashIcon.classList.add("fa-solid", "fa-trash-can"); // Ajoutez des classes supplémentaires pour utiliser une icône de la bibliothèque Font Awesome (facultatif)

      const modalPhotoTitle = document.createElement("h4");
      modalPhotoTitle.textContent = worksData[i].title;
      modalPhotoTitle.classList.add("modal-title");

      modalPhoto.appendChild(modalPhotoImage);
      modalPhoto.appendChild(modalTrashIcon); // Ajoutez l'icône de corbeille après l'image
      modalPhoto.appendChild(modalPhotoTitle);
      modalPhotoCtn.appendChild(modalPhoto);

      modalTrashIcon.addEventListener("click", () => {
        const imageId = worksData[i].id; // Récupérer l'ID de l'image
        const galleryImages = document.querySelectorAll(".gallery figure"); // Sélectionner toutes les figures/images de la galerie

        // Parcourir toutes les images et supprimer celle avec l'ID correspondant
        galleryImages.forEach((image) => {
          if (image.id === `image-${imageId}`) {
            image.remove(); // Supprimer l'image de la galerie
          }
        });

        // Supprimer également l'image du modal
        modalPhoto.remove();
      });
    }

    galleryAdded = true; // Marquer la galerie comme ajoutée
  }

  const modalVisibility = document.getElementById('modalId');
  modalVisibility.classList.remove("modalVisibility");
});
