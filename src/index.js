let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection"); 
  // new toy inputs 
  const toyInputName = document.getElementsByName("name")[0]; 
  const toyInputImage = document.getElementsByName("image")[0]; 
  const toySubmit = document.getElementsByName("submit")[0]; 


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });


  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  // .then(json => console.log(json))
  .then(json =>makeCard(json))
  
  // function to list toys 
  function makeCard(json){
    toyCollection.innerHTML = "";
    for (const listing in json){
      let newToy = document.createElement('div'); 
      newToy.className = "card"; 
      newToy.id = `toy${listing}`
      // toyForm.appendChild(newToy);   
      
      let newToyTitle = document.createElement('h2'); 
      newToyTitle.innerHTML = json[listing]["name"]; 

      let newToyImage = document.createElement('img');
      newToyImage.src = json[listing]["image"]; 
      newToyImage.className = "toy-avatar";

      let newToyPara = document.createElement('p'); 
      newToyPara.innerText = `${json[listing]["likes"]} Likes`; 

      let newToyLikeButton = document.createElement("button"); 
      newToyLikeButton.className = "like-btn"; 
      newToyLikeButton.innerText = "Like <3"; 
      newToyLikeButton.addEventListener('click',function(e){ 
        let toyLikes = json[listing].likes +=1; 
        // updateLikes(toyLikes,`http://localhost:3000/toys/${parseInt(listing)+1}`)
        updateData("likes",toyLikes,`http://localhost:3000/toys/${parseInt(listing)+1}`)
        let newToyLikes = document.querySelector(`#toy${listing} p`)
        newToyLikes.innerText = `${json[listing].likes} Likes`
      })

      newToy.appendChild(newToyTitle); 
      newToy.appendChild(newToyImage);
      newToy.appendChild(newToyPara); 
      newToy.appendChild(newToyLikeButton); 
      // debugger;
      console.log(newToy);
      toyCollection.appendChild(newToy); 
      // debugger;
    }
  }


  // function to make new toy listing 
  function addNewToy(name, img){
    // collect data to be sent 
    let objectData = {
      name: name, 
      image: img,
      likes: 0
    }
    let configObj = {
      method: "POST", 
      headers: {
        "Content-type": "application/json", 
        "Accept": "application/json"
      },
      body: JSON.stringify(objectData)  
    }; 
    return fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(function(object){
      console.log(object);
      // create new listing 
      // const 
    })
  }

  // call newToy function when submit button is clicked 
  toySubmit.addEventListener('click',function(e){
    addNewToy(toyInputName.value, toyInputImage.value);
  })
  

  // update a piece of data 
  function updateData(key,value,url){
    let objectData = {
      [key]:value
    }
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json", 
        "Accept": "application/json"
    }, 
    body: JSON.stringify(objectData) 
    };
    return fetch(url,configObj)
    .then(response => response.json())
    .then(function(e){
      // e.preventDefault();
      debugger;

    })
  }

  function updateLikes(value,url){
    let objectData = {
      likes: value
    }
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json", 
        "Accept": "application/json"
    }, 
    body: JSON.stringify(objectData) 
    };
    return fetch(url,configObj)
    .then(response => response.json())
    .then(function(e){
      // debugger;
    })
  }

  
});