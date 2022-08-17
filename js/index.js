import itens from "./model/dataset.js";
import foods from "./model/food.js";

/*
function loadFoods() {
  localStorage.getItem('foods-app:loaded') != 'ok'
  foods.load(itens);

  for (let food of foods.readAll()) {
    createFoodCard(food);
  };*/
  function loadFoods() {
    if (localStorage.getItem('foods-app:loaded') !== 'ok') {
      foods.load(itens);
      localStorage.setItem('foods-app:loaded', 'ok');
    }
  
    for (const food of foods.readAll()) {
      createFoodCard(food);
    }
  };
  function createFoodCard(food) {
    let foodCard = `<div class="col-4">
        <div class="card" style="width: 18rem;">
            <img src="${food.imagem}" class="card-img-top" alt="${food.nome}">
            <div class="card-body">
                <h5 class="card-title">${food.nome}</h5>
                <p class="card-text">
                    ${food.descricao}
                </p>
            </div>
        </div>
    </div>`;

    const cardDeck = document.querySelector("#card-deck");
    cardDeck.insertAdjacentHTML("beforeend", foodCard);
  };


function loadFormValues(title, foodNome, foodDescricao, foodPreco, foodImagem) {
  const formLabel = document.querySelector('#exampleModalLabel');
  const foodNomeInput = document.querySelector('#nome');
  const foodDescricaoInput = document.querySelector('#descricao');
  const foodPrecoInput = document.querySelector('#preco');
  const foodImagemInput = document.querySelector('#imagem');

  formLabel.innerHTML = title;
  foodNomeInput.value = foodNome;
  foodDescricaoInput.value = foodDescricao;
  foodPrecoInput.value = foodPreco;
  foodImagemInput.value = foodImagem;
}
function loadFormCreateFood() {
  const foodForm = document.querySelector('#foodForm');

  loadFormValues('Modal Title','', '', '', '');

  foodForm.onsubmit = (e) => {
    e.preventDefault();
    let food = Object.fromEntries(new FormData(foodForm));
    const newFood = foods.create(food);
    createFoodCard(newFood);
    $('#foodModal').modal('toggle');
    document.querySelector('#addFoodButton').blur();
  };
};
window.loadFormCreateFood = loadFormCreateFood;
loadFoods();
