<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import { deepEqual } from './services/utility';

import { countriesData } from './data/countries';
import type { CountryData } from './data/interfaces';
import CountryBlock from './components/CountryBlock.vue';

const allCountries = ref<CountryData[]>([]);
const selectedCountry = ref<CountryData>(allCountries.value[0]);

onBeforeMount(async () => {
    await countriesData.fetchCountries();
    allCountries.value = countriesData.getCountries();
    countriesData.setSelectCountry(allCountries.value[0]);
    selectedCountry.value = countriesData.getSelectedCountry();
});

const handleCardClick = (country: CountryData): void => {
    countriesData.setSelectCountry(country);
    selectedCountry.value = countriesData.getSelectedCountry();
};
</script>

<template>
    <div id="container">
        <div class="row">
            <country-block
                v-for="country in allCountries"
                :key="country.code"
                :country="country"
                :is-selected="deepEqual(country, selectedCountry)"
                @handle-card-click="handleCardClick"
            />
        </div>
    </div>
</template>

  <style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    overflow-x: auto;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .card {
    flex: 1 0 calc(20% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  @media (max-width: 1200px) {
    .card {
      flex: 1 0 calc(33.33% - 20px); /* 3 cards per row on medium screens */
    }
  }

  @media (max-width: 600px) {
    .card {
      flex: 1 0 calc(100% - 20px); /* 1 card per row on small screens */
    }
  }
  </style>
