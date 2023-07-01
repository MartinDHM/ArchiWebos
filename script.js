let categoriesData, modalPhotoCtn, modalPhoto, inputFileBtn, formSubmitButton, inputTitle, selectCategory, modalWrapper;
let worksData;
let token;

let isModalDisplay = false; //Booleen permettant de gérer l'affichage sur la page du modal (true = affiché, false = caché)
let galleryAdded = false; //

async function fetchAPIData(){
  /* Récupération des données de l'API */
  const responseWorks = await fetch('http://localhost:5678/api/works');
  const works = await responseWorks.json();
  worksData = works; 
  afficherGallery(worksData);
  createModal(worksData);
  const responseCategories = await fetch('http://localhost:5678/api/categories');
  const categories = await responseCategories.json();
  categoriesData = categories;
  filters(categoriesData);
  }

fetchAPIData()



const openModalLink = document.querySelector(".modif1");
openModalLink.addEventListener("click", afficherModal)

checkConnection();

/* Fonction qui permet d'afficher la galerie */
function afficherGallery(data) {
  const gallery = document.querySelector('.gallery');

  gallery.innerHTML = ''; // Effacer le contenu existant de la galerie

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
  filterBtn.innerHTML = ''; // Effacer le contenu existant des filtres

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

    // Utilisation des projets filtrés pour afficher la galerie mise à jour
    afficherGallery(filteredData);
    });
  });
}

// Fonction pour savoir si l'utilisateur est connecté ou non et effectuer les modifications sur la page
function checkConnection() {
  // Récupération du token depuis le sessionStorage
  token = sessionStorage.getItem("token");
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

    // Mode édition :
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

function createModal(workData) {
  modalWrapper = document.querySelector(".modal-wrapper");
  modalWrapper.innerHTML="";
  if (!galleryAdded) { // Vérifier si la galerie n'a pas déjà été ajoutée
    let cross = document.createElement("i");
    cross.className = "cross fas fa-times";

    cross.addEventListener("click", (event) => {
      const closeModalLink = document.getElementById('modalId');
      afficherModal();
      event.stopPropagation(); // Empêcher la propagation de l'événement de clic
    });

    const modalAddTitle = document.createElement("h3");
    modalAddTitle.textContent = "Galerie photo";
    modalPhotoCtn = document.createElement("div");
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
      modalPhoto = document.createElement("div");
      modalPhoto.classList.add("modal-photo");
      modalPhoto.id = `image-${worksData[i].id}`; // Ajouter un ID unique à chaque image

      const modalPhotoImage = document.createElement("img");
      modalPhotoImage.src = worksData[i].imageUrl;
      modalPhotoImage.classList.add("modal-image");

      const modalTrashIcon = document.createElement("i"); // Nouvel élément pour l'icône de corbeille
      modalTrashIcon.classList.add("modal-trash-icon"); // Ajoutez une classe pour styliser l'icône
      modalTrashIcon.classList.add("fa-solid", "fa-trash-can"); // Ajoutez des classes supplémentaires pour utiliser une icône de la bibliothèque Font Awesome (facultatif)

      const modalUpDownLeftRightIcon = document.createElement("i"); // Nouvel élément pour l'icône up-down-left-right
      modalUpDownLeftRightIcon.classList.add("modal-up-down-left-right-icon"); // Ajoutez une classe pour styliser l'icône
      modalUpDownLeftRightIcon.classList.add("fa-solid", "fa-up-down-left-right"); // Ajoutez des classes supplémentaires pour utiliser une icône de la bibliothèque Font Awesome

      const modalPhotoTitle = document.createElement("h4");
      modalPhotoTitle.textContent = worksData[i].title;
      modalPhotoTitle.classList.add("modal-title");

      modalPhoto.appendChild(modalPhotoImage);
      modalPhoto.appendChild(modalTrashIcon); // Ajoutez l'icône de corbeille après l'image
      modalPhoto.appendChild(modalUpDownLeftRightIcon); // Ajoutez l'icône up-down-left-right après l'icône de corbeille
      modalPhoto.appendChild(modalPhotoTitle);
      modalPhotoCtn.appendChild(modalPhoto);
      // Lorsque l'on appuie sur le bouton "modifier", on affiche le modal
      modalTrashIcon.addEventListener("click", function(){
        deleteModale(worksData[i].id);
        event.preventDefault();
      })
      const modalAddButton = document.querySelector(".addButton");
      modalAddButton.addEventListener("click", createAddModal) 
    }
    galleryAdded = true;
  }
}

function afficherModal(){
  if (isModalDisplay){
    const modalVisibility = document.getElementById('modalId');
    modalVisibility.classList.add("modalInvisibility");
    isModalDisplay = false
    galleryAdded = false
  } else {
    const modalVisibility = document.getElementById('modalId');
    modalVisibility.classList.remove("modalInvisibility");
    isModalDisplay = true
  }
  
}

async function deleteModale(id) {  
  token = JSON.parse(sessionStorage.getItem("token"));
  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "*/*",
        "Authorization": `Bearer ${token.token}`
      }
  })
  if (response.ok) {
    // Supprimer l'image du DOM
    modalPhotoCtn.removeChild(modalPhoto);
    // Mettre à jour les données côté serveur
    const deleteResponse = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token.token}`
      }
    })
    if (deleteResponse.ok) {
      console.log("Image supprimée avec succès");
    } else {
      console.log("Erreur lors de la suppression de l'image côté serveur");
    }
    // Mettre à jour les données affichées
    const works = await loadWorks();
    displayWorksInModal(works);
    displayWorks(works);    
  }
}
  
function createAddModal(){
  
  modalWrapper.innerHTML = ""; // Effacer le contenu du wrapper

  const closeButton = document.createElement("i");
  closeButton.classList.add("fa-solid", "fa-times", "close-button");

  const ajoutPhoto = document.createElement("h3");
  ajoutPhoto.classList.add("ajoutPhoto");
  ajoutPhoto.innerHTML = "Ajout photo";

  const iconeBack = document.createElement("i");
  iconeBack.classList.add("fa-solid", "fa-arrow-left");

  const addForm = document.createElement("form");
  addForm.classList.add("addForm");
  const addBox = document.createElement("div");
  addBox.classList.add("addBox");
  const iconeImg = document.createElement("i");
  iconeImg.classList.add("fa-regular", "fa-image");
  const addImgButton = document.createElement("button");
  addImgButton.innerText = "+ Ajouter photo";
  addImgButton.classList.add("addImgButton");
  inputFileBtn = document.createElement("input");
  inputFileBtn.type = "file";
  inputFileBtn.accept = ".jpg, .png";
  inputFileBtn.classList.add("inputFileBtn");
  const photoPreview = document.createElement("img");
  photoPreview.id = "photoPreview";
  const addImgText = document.createElement("p");
  addImgText.innerText = "jpg, png : 4mo max";
  const inputCtn = document.createElement("div");
  inputCtn.classList.add("inputCtn");
  const labelInputTitle = document.createElement("label");
  labelInputTitle.setAttribute("for", "Title");
  labelInputTitle.innerText = "Titre";
  inputTitle = document.createElement("input");
  inputTitle.id = "Title";
  inputTitle.type = "text";
  const labelSelectCategory = document.createElement("label");
  labelSelectCategory.setAttribute("for", "category");
  labelSelectCategory.innerText = "Catégorie";
  selectCategory = document.createElement("select");
  selectCategory.classList.add("optionCategorie");
  selectCategory.id = "category";

  const border = document.createElement("div");
  border.classList.add("border");
  formSubmitButton = document.createElement("input");
  formSubmitButton.classList.add("formSubmitButton");
  formSubmitButton.type = "submit";
  formSubmitButton.value = "Valider";
  formSubmitButton.disabled = true;

  addForm.appendChild(addBox);
  addBox.appendChild(iconeImg);
  addBox.appendChild(addImgButton);
  addBox.appendChild(inputFileBtn);
  addBox.appendChild(photoPreview);
  addBox.appendChild(addImgText);
  addForm.appendChild(inputCtn);
  inputCtn.appendChild(labelInputTitle);
  inputCtn.appendChild(inputTitle);
  inputCtn.appendChild(labelSelectCategory);
  inputCtn.appendChild(selectCategory);
  addForm.appendChild(border);
  addForm.appendChild(formSubmitButton);

  modalWrapper.appendChild(closeButton);
  modalWrapper.appendChild(ajoutPhoto);
  modalWrapper.appendChild(iconeBack);
  modalWrapper.appendChild(addForm);

  // on ajoute les catégories au sélecteur
  insertCategories(selectCategory);

  // on affiche l'image à ajouter
  inputFileBtn.addEventListener("change", () => {
    const [file] = inputFileBtn.files;
    if (file) {
      photoPreview.src = URL.createObjectURL(file);
      addImgButton.classList.add("modalHide");
    }
  });

  // On écoute les événements de modification des champs
  inputFileBtn.addEventListener("change", validateForm);
  inputTitle.addEventListener("input", validateForm);
  selectCategory.addEventListener("change", validateForm);

    
  closeButton.addEventListener("click", afficherModal)

  iconeBack.addEventListener("click",backModal)

}

function backModal() {
  isModalDisplay=true;
  afficherModal();
  isModalDisplay=false;
  createModal();
  afficherModal()
}

// Validation du formulaire
function validateForm() {
  // On vérifie si les champs sont remplis
  if ( inputFileBtn.value !== "" && inputTitle.value !== "" && selectCategory.value !== "0" ) {
    formSubmitButton.disabled = false; // On active le bouton "submit"
    formSubmitButton.classList.add("sendForm");
    // On écoute l'envoi du nouveau projet
    formSubmitButton.addEventListener("click", (e) => {
      postNewWork(inputFileBtn, inputTitle, selectCategory);
      e.preventDefault();
    });
  } else {
    formSubmitButton.classList.remove("sendForm");
    formSubmitButton.disabled = true; // On désactive le bouton "submit"
  }
}

// On importe le tableau des catégories
async function loadCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  return categories;
}

// On insère les catégories dans le sélecteur
async function insertCategories(selectCategory) {
  const categories = await loadCategories();
  categories.unshift({ id: 0, name: "Choisissez une catégorie :" });
  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");
    selectCategory.appendChild(option);
    option.innerHTML = categories[i].name;
    option.value = categories[i].id;
  }
}

// On envoie le nouveau projet
async function postNewWork(inputFileBtn, inputTitle, selectCategory) {
  const formData = new FormData();
  const newWorkImg = inputFileBtn.files[0];
  const newWorkTitle = inputTitle.value;
  const newWorkCategory = selectCategory.value;
  token = JSON.parse(sessionStorage.getItem("token"));

  formData.append("image", newWorkImg);
  formData.append("title", newWorkTitle);
  formData.append("category", newWorkCategory);
  
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${token.token}`,
    },
    body: formData
    })
    if (response.ok) {
        createModal();
        const works = await fetchAPIData();
    }
  } 
  



