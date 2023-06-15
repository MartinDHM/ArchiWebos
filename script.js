function afficherTableau(data){
  for(i =0 ; i < data.length ; i++)
  {
    const gallery = document.querySelector('.gallery');

    const figure  = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = data[i].imageUrl;

    const nomElement = document.createElement("h2");
    nomElement.innerText = data[i].title;

    gallery.appendChild(figure)
    figure.appendChild(imageElement)
    figure.appendChild(nomElement)
  }
}
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    afficherTableau(data);
    console.log(data[0]);
  })

function afficherFiltre(data){

  const Filtres = document.createElement("div")
  Filtres.className = "Filtres"

  const Tous = document.createElement("div")
  Tous.innerText = "Tous"
  Tous.className = "Filtreposition"

  Filtres.appendChild(Tous)

  for(i =0 ; i < data.length ; i++)
  {
    const projet = document.querySelector(".PortfolioTitle")


    const filtreAjout = document.createElement("div")
    filtreAjout.innerText = data[i].name
    filtreAjout.className = "Filtreposition"
    

    projet.appendChild(Filtres)

    Filtres.appendChild(filtreAjout)

    
  }

}

  fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    afficherFiltre(data);
    console.log(data);
  })
    
  
  
  
  

