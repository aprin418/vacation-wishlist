// get user input from form

document
  .querySelector("#destination_details_form")
  .addEventListener("submit", handleFormSubmit);

async function getPic(imgData) {
  return await fetch(
    `https://api.unsplash.com/search/photos?query=${imgData}&per_page=1&client_id=f7fuAgn6T4Tm_2ab-N2xanQaCLEA2Cek3wKs2RFZTyE`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results[0].urls.thumb);
      return data.results[0].urls.thumb;
    });
  // .then(() => console.log(imgData));
}

// handle the submit action on the form
function handleFormSubmit(event) {
  event.preventDefault();

  let destinationName = event.target.elements["name"].value;
  let destinationLocation = event.target.elements["location"].value;
  let destinationPhoto = event.target.elements["photo"].value;
  let destinationDesc = event.target.elements["description"].value;

  resetFormValues(event.target);

  // create card based on the form
  let destinationCard = createDestinationCard(
    destinationName,
    destinationLocation,
    destinationPhoto,
    destinationDesc
  );

  let wishListContainer = document.querySelector("#destinations_container");

  if (wishListContainer.children.length === 0) {
    document.querySelector("#title").innerHTML = "My WishList";
  }

  // append card to right side div
  document
    .querySelector("#destinations_container")
    .appendChild(destinationCard);
}

function resetFormValues(form) {
  for (let i = 0; i < form.length; i++) {
    form.elements[i].value = "";
  }
}

// create card function
function createDestinationCard(name, location, photoUrl, description) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "20px;";

  let img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", name);

  // set default pic
  let constantPhotoUrl =
    "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";

  getPic(name).then((imgUrl) => {
    if (photoUrl.length === 0) {
      img.setAttribute("src", imgUrl);
    } else {
      img.setAttribute("src", photoUrl);
    }
  });

  // https://api.unsplash.com/search/photos?query=paris&per_page=1&client_id=f7fuAgn6T4Tm_2ab-N2xanQaCLEA2Cek3wKs2RFZTyE

  // get user input for photo search

  // get photo from unsplash api

  // return first photo in keyword search

  // append that photo instead of user uploaded photo

  // append img to card div
  card.appendChild(img);

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  let cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  let cardSubtitle = document.createElement("h6");
  cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardSubtitle.innerText = location;
  cardBody.appendChild(cardSubtitle);

  if (description.length !== 0) {
    let cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = description;
    cardBody.appendChild(cardText);
  }

  let buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "buttons_container");

  let cardEditBtn = document.createElement("button");
  cardEditBtn.setAttribute("class", "btn btn-warning");
  cardEditBtn.innerText = "Edit";
  cardEditBtn.addEventListener("click", editDestination);

  let cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.setAttribute("class", "btn btn-danger");
  cardDeleteBtn.innerText = "Remove";
  cardDeleteBtn.addEventListener("click", removeDestination);

  buttonsContainer.appendChild(cardEditBtn);
  buttonsContainer.appendChild(cardDeleteBtn);

  cardBody.appendChild(buttonsContainer);

  card.appendChild(cardBody);

  return card;
}

function editDestination(event) {
  let cardBody = event.target.parentElement.parentElement;
  let title = cardBody.children[0];
  let subTitle = cardBody.children[1];

  let card = cardBody.parentElement;
  let photoUrl = card.children[0];

  let newTitle = window.prompt("Enter new name");
  let newSubtitle = window.prompt("Enter new location");
  let newPhotoUrl = window.prompt("Enter new photo url");

  if (newTitle.length > 0) {
    title.innerText = newTitle;
  }

  if (newSubtitle.length > 0) {
    subTitle.innerText = newSubtitle;
  }

  if (newPhotoUrl.length > 0) {
    photoUrl.setAttribute("src", newPhotoUrl);
  }
}

function removeDestination(event) {
  let cardBody = event.target.parentElement.parentElement;
  let card = cardBody.parentElement;
  card.remove();
}

// const apiPhoto = fetch(
//   "https://api.unsplash.com/search/photos?query=paris&per_page=1&client_id=f7fuAgn6T4Tm_2ab-N2xanQaCLEA2Cek3wKs2RFZTyE"
// );

// fetch(
//   `https://api.unsplash.com/search/photos?query=${photoUrl}&per_page=1&client_id=f7fuAgn6T4Tm_2ab-N2xanQaCLEA2Cek3wKs2RFZTyE`
// )
//   .then((res) => res.json())
//   .then((data) => (imgData = data.results[0].urls.raw))
//   .then(() => console.log(imgData));
