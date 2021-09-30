const fetchDogData = async () => {
  let data = new Object();
  var settings = {
    url: "https://api.thedogapi.com/v1/images/search?limit=20",
    method: "GET",
    timeout: 0,
    headers: {
      // API KEY
      "x-api-key": "b63e22b5-1270-490d-97ae-b839cc29e535"
    }
  };

  //AJAX request
  data = await $.ajax(settings).done(function (response) {
  return response;
  });
  return data;
};

// Card Build 
const buildCards = (data) => {
  const cardsContainer = $(".cards-container");
 
  data.forEach((item) => {
    if (item.breeds.length) {
      console.log(item);
      const dog = item.breeds[0];

      let class_name = "";

      if(dog.breed_group === "Working")
        class_name = "red__color";
      else if (dog.breed_group === "Hound") 
        class_name = "blue__color";
        else if (dog.breed_group === "Toy") 
        class_name = "purple__color";
        else if (dog.breed_group === "Non-Sporting") 
        class_name = "yellow__color";
        else if (dog.breed_group === "Mixed") 
        class_name = "brown__color";
        else if (dog.breed_group === "Terrier") 
        class_name = "cyan__color";
        else if (dog.breed_group === "Sporting") 
        class_name = "orange__color";
        else if (dog.breed_group === "Herding") 
        class_name = "pink__color";

      const element = `
      <div class="card single__card" style="width: 45%;">
          <img class="card__image" src=${item.url} class="card-img-top" alt=${dog.name}>
          <div class="card-body card__body">
            <h3 class="card-title card__title mb-3">${dog.name}</h3>
            <p><strong>Weight</strong> : ${dog.weight.metric}</p>
            <p><strong>Height</strong> : ${dog.height.metric}</p>
            <p class=${class_name} ><strong>Breed Group</strong> : ${dog.breed_group}</p>
            <p><strong>Bred For</strong> : ${dog.bred_for}</p>
            <p><strong>Life Span</strong> : ${dog.life_span}</p>
            <p><strong>Temperament</strong> : ${dog.temperament}</p>
          </div>
      </div>
              `;
      // Card append
      cardsContainer.append(element);
    }
  });
};

$(document).ready(() => {
  fetchDogData().then((res) => buildCards(res));
});