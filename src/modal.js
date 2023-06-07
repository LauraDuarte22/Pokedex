//Eres libre de modificar el código de este archivo según tus necesidades.
import setTypeClass from "./shared";

const modalElement = document.querySelector("#modal");

export const openModal = async (pokemonName) => {
  modalElement.innerHTML = "";
  document.querySelector("#modal-content").classList.add("active");
  buildDetails();

  const closeModalButton = document.querySelector("#close-button");
  closeModalButton.addEventListener("click", closeModal);
};

const closeModal = () => {
  console.log("closeModal");
  document.querySelector("#modal-content").classList.remove("active");
};

const buildDetails = async () => {
  modalElement.innerHTML =
    modalElement.innerHTML +
    `<div id="modal-header" class=" modal-header">
        <button class="close-button" id="close-button">X</button>
        <img src="" alt="" class='image-detail'>
    </div>
    <div class="modal-body">
          <span class='pokemon-name'></span>
          <ul id='pokemon-types' class='pokemon-types'></ul>
          <div class="weight-height-container">
            <div class="weight-item">
              <h3 class='pokemon-stats'>Peso</h3>
              <span class='pokemon-stats'> Kg</span>
            </div>
            <div class="heigth-item">
              <h3 class='pokemon-stats'>Altura</h3>
              <span class='pokemon-stats'> M</span>
            </div>
          </div>
          <div class='chart-container'>
          <div class="legend-container">
          <ul id="legend"></ul>
                 </div>
          <canvas id="myChart"></canvas>
         <span class="tooltip"></span>
        </div>
    </div>
    `;
};
