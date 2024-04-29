<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import { deepEqual } from './services/utility';

import { Countries } from './data/countries';
import type { CountryData } from './data/interfaces';

import CountryBlock from './components/CountryBlock.vue';
import QuizHeader from './components/QuizHeader.vue';

const countriesData = new Countries();
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

const handleCountryChange = (direction: 'left' | 'right') => {
    countriesData.handleCountryChange(direction);
    selectedCountry.value = countriesData.getSelectedCountry();
};

const handleCorrectGuess = (country: CountryData) => {
    const correctCountry = allCountries
        .value
        .find(foundCountry => foundCountry.code === country.code);

    if (correctCountry) {
        correctCountry.showText = true;
        countriesData.modifyUnguessedCountries(correctCountry);
    }

    handleCountryChange('right');
};
</script>

<template>
    <quiz-header
        :selected-country="selectedCountry"
        :total-number-of-countries="countriesData.getCountries().length"
        @handle-arrow-click="handleCountryChange"
        @handle-correct-guess="handleCorrectGuess"
    />

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
        flex: 1 0 calc(33.33% - 20px);
    }
}

@media (max-width: 600px) {
    .card {
        flex: 1 0 calc(100% - 20px);
    }
}
</style>
