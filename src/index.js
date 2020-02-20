let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        submitData(event.target)
      })
    } else {
      toyForm.style.display = "none";
    }
  });


  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => json.forEach(function(toy) {
    createCard(toy.name, toy.image, toy.likes, toy.id);
  }))


  function createCard(name, imageLink, likes, id) {
    let card = document.createElement('div');
    card.className = "card";
    toyCollection.appendChild(card);
    toyName = document.createElement('h2');
    toyName.innerHTML = name;
    toyImage = document.createElement('img');
    toyImage.src = imageLink;
    toyImage.className = 'toy-avatar';
    let toyLikes = document.createElement('p');
    toyLikes.innerHTML = `${likes} Likes`
    likeButton = document.createElement('button')
    likeButton.className = 'like-btn'
    likeButton.innerHTML = 'Like <3'
    card.appendChild(toyName)
    card.appendChild(toyImage)
    card.appendChild(toyLikes)
    card.appendChild(likeButton)
    card.id = id
    likeButton.addEventListener('click', function(e) {
      e.preventDefault()
      // debugger
      toyLikes.innerHTML = `${parseInt(toyLikes.innerHTML[0]) + 1} Likes`
      fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": toyLikes.innerHTML[0]
      })
    })
    })
  }

  function submitData(toyData) {
    let formData = {
      "name": toyData.name.value,
      "image": toyData.image.value,
      "likes": 0
    };

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/toys", configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(toy) {
            createCard(toy.name, toy.image, toy.likes);
        })
        .catch(function(error) {
            alert("Bad things! Ragnarők!");
        });
  }

});
