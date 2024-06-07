<template>
  <section class="homePage">
    <div class="homePage-content flex-column">
      <div class="homePage-content-table">
        <vue3-datatable :rows="rows" :columns="cols">
        </vue3-datatable>
      </div>
    </div>
  </section>
</template>

<script setup>
import "@bhplugin/vue3-datatable/dist/style.css";
import { ref } from "vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";

const pokemonData = ref(null);
const loading = ref(true);
const pokemonInfoTable = ref([]);
const rows = ref(null);
const cols =
  ref([
    { field: "id", title: "ID", isUnique: true, type: "number" },
    { field: "name", title: "Nombre" },
    { field: "location", title: "Localizacion" },
  ]) || [];

// Función para obtener los datos de un Pokémon
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
      location: locationNames.join(",") !== "" ? locationNames.join(", ") : 'Sin ubicación actual.',
    };

    pokemonInfoTable.value.push(pokemonInfo);

    if (pokemonInfoTable.value.length === pokemonData.value.length) {
      rows.value = pokemonInfoTable.value;
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

fetchPokemonData();
</script>
<style lang="scss">
.bh-datatable .bh-table-responsive {
  @apply min-h-[380px];
}
.homePage {
  &-content {
    justify-content: center;
    align-items: start;
    &-table {
      margin: 10px;
      width: 50%;
    }
  }
}
</style>
