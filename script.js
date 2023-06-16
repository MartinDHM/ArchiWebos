/* recupération des données par l'api */
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    afficherGallery(data);
    console.log(data[0]);
  })

/* fonction qui permet affiche la gallery*/
function afficherGallery(data){
  for(i =0 ; i < data.length ; i++)
  {
    const gallery = document.querySelector('.gallery');

    const figure  = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = data[i].imageUrl;

    const nomElement = document.createElement("p");
    nomElement.innerText = data[i].title;

    gallery.appendChild(figure)
    figure.appendChild(imageElement)
    figure.appendChild(nomElement)
  }
}
/*recupération des catégorie des filtre de l'api */
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(category => {
      filters(category);
      console.log(category[i]);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite', error);
    });
function filters (category){

  category.unshift({ name: "Tous" });

  for(i = 0; i < category.length; i++)
  {
    const filterbtn = document.querySelector(".filtersBtn")
    const filter = document.createElement("button");
    filter.innerText = category[i].name;

    filterbtn.appendChild(filter);
  }

}

  
  
  
  

