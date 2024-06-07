<template>
  <section class="homePage">
    <img src="../assets/pokeLocationLogo.png" class="homePage-banner" />
    <div class="homePage-content flex-column">
      <div class="homePage-content-table">
        <vue3-datatable :rows="rows" :columns="cols"> </vue3-datatable>
      </div>
      <div class="homePage-content-map flex-column">
        <img src="../assets/pokemonGif.gif" class="homePage-banner" />
        <div class="homePage-content-map-text">
          PokemonLocation presenta diversos puntos en donde podremos encontrar Pokemones.
        </div>
        
        <div id="mapPoke" ref="mapContainer" class="homePage-content-map-map"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import "@bhplugin/vue3-datatable/dist/style.css";
import { onMounted, ref } from "vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import L from "leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

/**
 * Data
 */
const pokemonData = ref(null);
const pokemonInfoTable = ref([]);
const rows = ref(null);
const cols =
  ref([
    { field: "id", title: "ID", isUnique: true, type: "number" },
    { field: "name", title: "Nombre" },
    { field: "location", title: "Localizacion" },
  ]) || [];
const mapContainer = ref(null);

/**
  CONSULTAS Y METODOS RELACIONADOS AL DATATABLE
*/

onMounted(() => {
  if (mapContainer.value) {
    // Crear el mapa y establecer la vista inicial
    const map = L.map(mapContainer.value).setView([34.6849, 138.9944], 2);

    // Agregar una capa de mapa base
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors- PokeLocation",
    }).addTo(map);

    // Agregar la imagen del mapa de Pokémon como una capa de superposición
    const imageUrl = "https://i.blogs.es/eca0b5/1200px-paldea/1366_2000.jpeg";
    const imageBounds = [
      [-90, -180],
      [90, 180],
    ]; // Ajusta los límites según el tamaño de la imagen

    L.imageOverlay(imageUrl, imageBounds).addTo(map);

    var places = [
      {
        name: "Eterna Forest - Sinnoh Route 204 South",
        coordinates: [38.2682, 140.8694],
        description: "Caterpie, Weedle, Kakuna",
      },
      {
        name: "Johto Route 34/35/36/37/38/39",
        coordinates: [70.6901, 135.1955],
        description:
          "Caterpie, Metapood, Butterfree, Weedle, Kakuna, Beedrill, Pidgey, Pidgeotto.",
      },
      {
        name: "All Bugs",
        coordinates: [-30.6901, 15.1955],
        description: "Inspirado en Kansai(Kobe)",
      },
      {
        name: "Lake of Rage",
        coordinates: [34.6901, 135.1955],
        description: "Caterpie",
      },
      {
        name: "Kanto Route 26",
        coordinates: [-25.6895, 85.1955],
        description: "Caterpie",
      },
      {
        name: "Viridian Forest",
        coordinates: [25.6895, -85.1955],
        description: "Caterpie",
      },
      {
        name: "Pattern Bush",
        coordinates: [-25.6895, -85.1955],
        description: "Caterpie",
      },
      {
        name: "Kalos Route 2",
        coordinates: [48.8566, 2.3522],
        description: "Caterpie",
      },
      {
        name: "Azalea Town",
        coordinates: [40.6901, -85.1955],
        description: "Caterpie",
      },
    ];
    places.forEach((place) => {
      L.marker(place.coordinates)
        .addTo(map)
        .bindPopup(
          `<b>${place.name}</b><br>Coordenadas: ${place.coordinates[0]}, ${place.coordinates[1]}<br> Pokemos: ${place.description} `
        )
        .openPopup();
    });
  }
  return {
    mapContainer,
  };
});

//Solución para poder visualizar icon en el mapa
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

async function fetchPokemonData() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const data = await response.json();
    pokemonData.value = data.results;
    structurRow(pokemonData.value);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

function structurRow(pokeArray) {
  pokeArray.map((pokemon, index) => {
    getInfoPoke(index, pokemon.name);
  });
}

async function getInfoPoke(id, pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}`);
    const data = await response.json();
    getEncountersPoke(data.location_area_encounters, { id, pokemonName });
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}
async function getEncountersPoke(urlEncounters, id) {
  try {
    const response = await fetch(urlEncounters);
    const data = await response.json();

    const locationNames = data.map((encounter) =>
      textFormatter(encounter.location_area.name)
    );

    const pokemonInfo = {
      id: id.id + 1,
      name: id.pokemonName.charAt(0).toUpperCase() + id.pokemonName.slice(1),
      location:
        locationNames.join(",") !== ""
          ? locationNames.join(", ")
          : "Sin ubicación actual.",
    };

    pokemonInfoTable.value.push(pokemonInfo);

    if (pokemonInfoTable.value.length === pokemonData.value.length) {
      rows.value = pokemonInfoTable.value;

      console.log("row.value", rows.value);
    }
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

function textFormatter(text) {
  let textSplit = text.replace(/-\w+$/, "");

  textSplit = textSplit.replace(/-/g, " ");

  textSplit = textSplit.charAt(0).toUpperCase() + textSplit.slice(1);

  return textSplit;
}

/**
  METODOS RELACIONADOS AL MAPA
*/

fetchPokemonData();
</script>
<style lang="scss">
.bh-datatable .bh-table-responsive {
  @apply min-h-[380px];
}
.homePage {
  &-banner{
    width: 25%;
    display: block;
    margin: 0 auto;
    margin-top: -4%;
  }
  &-content {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: start;
    &-table {
      margin: 10px;
      width: 50%;
    }
    &-map{
      display: column;
      img{
        width: 80%;
      }
      &-text{
        align-self: center;
        width: 80%;
        margin-top: -8%;
        margin-bottom: 3%;
        background: #4dad5b;
        border: 1px solid #4bb95c;
        color: white;
        padding: 20px;
        border-radius:15px;
      }
    }
    &-map-map {
      width: 100%;
      height: 70vh;
    }
  }
}

/* Media query para pantallas más pequeñas (tabletas y móviles) */
@media (max-width: 900px) {
  .homePage-content {
    margin: 2%;
    flex-direction: column-reverse;
    align-items: center;
    &-table {
      width: 90%;
    }
    &-map {
      width: 70%;
      height: 400px;

    }
  }
}

/* Media query para pantallas muy pequeñas (móviles) */
@media (max-width: 700px) {
  .homePage-content {
    &-table {
      width: 90%;
    }
    &-map {
      width: 90%;
      height: 400px;
    }
  }
}
/* Media query para pantallas muy pequeñas (móviles) */
@media (max-width: 500px) {
  .homePage-content {
    &-table {
      width: 90%;
    }
    &-map {
      width: 100%;
      height: 400px;
    }
  }
}
</style>
