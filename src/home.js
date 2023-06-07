import { setTypeClass } from "./shared.js";
import { openModal } from "./modal.js";
import { Chart } from "chart.js/auto";
import moment from "moment";

let offset = 0;
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
const dateContainer = document.querySelector("#date-container");

setInterval(() => {
  const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  dateContainer.innerHTML = date;
}, 1000);

nextButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (offset < 1127) {
    offset += 16;
    getPokemons();
  }
});

prevButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (offset > 0) {
    offset -= 16;
    getPokemons();
  }
});

function getPokemons() {
  nextButton.disabled = true;
  prevButton.disabled = true;

  const pokeListaPromesa = fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=16&offset=${offset}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    })
    .catch((error) => {
      console.log(error);
    });

  pokeListaPromesa.then((lista) => {
    Promise.all(
      lista.map(async (pokemon) => {
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .then((response) => response.json())
          .then((detallesPokemon) => {
            return detallesPokemon;
          });
      })
    )
      .then((listaCompleta) => {
        const htmlList = document.querySelector("#pokeList");
        htmlList.innerHTML = "";
        listaCompleta.forEach((pokemon) => {
          const { name, sprites, types } = pokemon;
          const pokemonType = types[0].type.name;
          const htmlPokemon = `
          <li class='${setTypeClass(pokemonType)} fadeIn 'id=${name}>
            <img src="${sprites.front_default}" alt="${name}">
            <h4>${name}</h4>
          </li>
          `;
          htmlList.innerHTML += htmlPokemon;
        });
        const pokemonsAvatars = document.querySelectorAll("li");
        pokemonsAvatars.forEach((avatar) => {
          avatar.addEventListener("click", (event) => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${avatar.id}`)
              .then((response) => response.json())
              .then((detallesPokemon) => {
                setDetailt(detallesPokemon);
              });

            openModal(event.currentTarget.id);
          });
        });
        nextButton.disabled = false;
        prevButton.disabled = false;
      })
      .catch((error) => {});
  });
}

getPokemons();

function setDetailt(detallesPokemon) {
  const { name, sprites, types, height, stats, weight } = detallesPokemon;
  const pokemonType = types[0].type.name;

  const image = document.querySelector(".image-detail");
  const modal = document.querySelector("#modal-header");
  image.src = sprites.front_default;
  image.alt = name;
  modal.classList.add(pokemonType + "-type");
  image.classList.add(pokemonType + "-type");

  const containerName = document.querySelector(".pokemon-name");
  containerName.innerHTML = name;

  types.forEach((types) => {
    const list = document.querySelector("#pokemon-types");
    const htmlPokemon = `
    <li class='${setTypeClass(types.type.name)} fadeIn 'id=${types.type.name}>
      ${types.type.name}
    </li>
    `;
    list.innerHTML += htmlPokemon;
  });

  const weightContainer = document.querySelector(".weight-item");
  const h3Weight = weightContainer.querySelector("span");
  h3Weight.innerHTML = weight + h3Weight.textContent;

  const heigthContainer = document.querySelector(".heigth-item");
  const h3heigth = heigthContainer.querySelector("span");
  h3heigth.innerHTML = height + h3heigth.textContent;
  createChart(stats);
}
function createChart(stats) {
  let labels = [];
  let values = [];


 stats.forEach(function (obj) {
    values.push(obj.base_stat);
    labels.push(obj.stat.name);
  });

  const data = {
    labels: labels,
    
    datasets: [{
      data: values,
      backgroundColor: [
        "#a890f0",
    "#a040a0",
    "#e0c068",
    "#705898",
    "#f08030",
    "#98d8d8",
      ],
    }],
   
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
       
        },
      },
    },
  };

  const ctx = document.querySelector('#myChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
  });
}

